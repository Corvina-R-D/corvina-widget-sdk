import { BaseGraphicWgt, Value, projectStore } from "corvina";
import { widgetType, ASSETS_PROPERTY, ImageItem, normalizeImages } from "./defs";
import { IMAGE_TYPES, MAX_IMAGE_SIZE, createAssetName, loadImageAsset, readAsDataURL, uploadImageAsset, withSaveGuard } from "./imageAssets";

// Files not uploaded: of a type or size not accepted, or failed
export interface UploadResult {
  rejected: string[];
  failed: string[];
}

/*
 * Gallery of images stored in the asset storage of the dashboard, rendered by ImageGallery.vue.
 * The images are uploaded in the editor (ImageGalleryImagesPropControl.vue); `selected` chooses the
 * image shown and accepts datalinks, so a tag or a formula can change the image at runtime.
 *
 * The widget saves only the names of the assets (`images`), never their content. The platform part:
 * - mapAssets (BaseWgt, saved with the widget) lists the assets used by the widget;
 * - the dashboard manifest counts the references to every asset: the widget increments them when
 *   it is pasted or restored (updateAssetsReferenceCounter), BaseWgt.freeAssets decrements them
 *   when it is removed;
 * - loadAssetsFromStorage downloads the images when the widget is created.
 */
export default class ImageGallery extends BaseGraphicWgt {
  images: ImageItem[];
  selected: Value<number | string | boolean>;
  showNavigation: boolean;
  fit: string;
  // Images ready to be shown (data URLs) by asset name: runtime state, never saved
  imageSources: { [asset: string]: string };

  constructor( args ) {
    super( args );
    this.type = widgetType;
    const state = args.initState;
    this.images = normalizeImages( state.images );
    this.selected = new Value( state.selected ?? 0 );
    this.showNavigation = state.showNavigation ?? true;
    this.fit = state.fit ?? "contain";
    this.imageSources = {};
  }

  isInteractive() {
    return !projectStore.getInEditor && !this.getPropertyValue( "disabled" );
  }

  // Navigation of the operator: writes the index into `selected` (and into its tag, when read/write)
  show( index: number ) {
    // In the editor a click selects the widget: never act there, nor when the widget is disabled
    if ( !this.isInteractive() || !this.images.length ) return;
    const count = this.images.length;
    this.setPropertyValue( { prop: "selected", value: ( ( index % count ) + count ) % count } );
  }

  setImageSource( asset: string, source: string ) {
    // A new object: Vue 2 does not see the keys added to an observed one
    this.imageSources = { ...this.imageSources, [ asset ]: source };
  }

  /*
   * Editor: uploads the image files to the asset storage of the dashboard, one at a time, then adds
   * them to `images` with a single change (one undo step, one save of the dashboard).
   */
  async uploadImages( files: File[], onProgress: ( done: number, total: number ) => void ): Promise<UploadResult> {
    const accepted = files.filter( file => IMAGE_TYPES.indexOf( file.type ) >= 0 && file.size <= MAX_IMAGE_SIZE );
    const result: UploadResult = { rejected: files.filter( file => accepted.indexOf( file ) < 0 ).map( file => file.name ), failed: [] };
    const added: ImageItem[] = [];
    await withSaveGuard( async () => {
      for ( const file of accepted ) {
        onProgress( added.length + result.failed.length, accepted.length );
        const asset = createAssetName( this.id, file );
        try {
          const [ stored, source ] = await Promise.all( [ uploadImageAsset( asset, file ), readAsDataURL( file ) ] );
          if ( !stored ) throw new Error( "no upload URL" );
          // Shown at once from the local file, without downloading it again
          this.setImageSource( asset, source );
          added.push( { asset, title: file.name.replace( /\.[^.]*$/, "" ), type: file.type } );
        } catch ( e ) {
          console.error( `ImageGallery ${this.id}: upload of ${file.name} failed`, e );
          result.failed.push( file.name );
        }
      }
      if ( added.length ) {
        // A new array: undo keeps the previous one. setPropertyValue below takes the asset references
        projectStore.setWidgetValue( { wgtId: this.id, prop: "images", value: [ ...this.images, ...added ], record: true } );
      }
    } );
    return result;
  }

  setPropertyValue( { prop, value, ts }: { prop: string, value: any, ts?: number } ) {
    if ( prop == "images" ) {
      // From the properties panel, undo and redo: the assets follow the list
      const images = normalizeImages( value instanceof Value ? value.unwrap() : value );
      super.setPropertyValue( { prop, value: images, ts } );
      this.syncAssets( images );
      return;
    }
    super.setPropertyValue( { prop, value, ts } );
  }

  /*
   * Called by initAssets when the widget is created, if mapAssets is not empty (BaseWgt).
   * Dashboard.getAssetData downloads every asset once per dashboard.
   */
  loadAssetsFromStorage(): Promise<void> {
    const dashboard = this.getProject().getDashboard();
    const owners: { [asset: string]: string } = {};
    for ( const asset of this.mapAssets.get( ASSETS_PROPERTY ) ?? [] ) owners[ asset.name ] = asset.dashboardId;
    const loads = this.images
      .filter( image => !this.imageSources[ image.asset ] )
      .map( image => loadImageAsset( dashboard, image.asset, owners[ image.asset ], image.type )
        .then( source => this.setImageSource( image.asset, source ) )
        .catch( e => console.error( `ImageGallery ${this.id}: cannot load ${image.asset}`, e ) ) );
    return Promise.all( loads ).then( () => undefined );
  }

  // Widget pasted, added or restored by undo: its assets get one more reference in the manifest
  protected updateAssetsReferenceCounter(): void {
    const dashboard = this.getProject().getDashboard();
    for ( const asset of this.mapAssets.get( ASSETS_PROPERTY ) ?? [] ) dashboard.addAsset( asset.name );
  }

  /*
   * Aligns mapAssets and the references of the manifest to the list of images: a removed image
   * releases its reference, an added one (a new upload, or an image back with undo) takes one.
   * The stored files are never deleted: undo can bring them back.
   */
  private syncAssets( images: ImageItem[] ) {
    const dashboard = this.preview ? null : this.getProject()?.getDashboard();
    if ( !dashboard ) return;
    const current = this.mapAssets.get( ASSETS_PROPERTY ) ?? [];
    const wanted = images.map( image => image.asset );
    for ( const asset of current ) {
      if ( wanted.indexOf( asset.name ) < 0 ) dashboard.removeAsset( asset.name );
    }
    // In a composed widget the assets belong to its dashboard: the instances fetch them from there
    const owner = dashboard.type == "WIDGET" ? dashboard.id : null;
    const next = wanted.map( name => {
      const known = current.filter( asset => asset.name == name )[ 0 ];
      if ( known ) return known;
      dashboard.addAsset( name );
      return { name, dashboardId: owner };
    } );
    if ( next.length ) this.mapAssets.set( ASSETS_PROPERTY, next );
    else this.mapAssets.delete( ASSETS_PROPERTY );
    // Images back with undo, not downloaded yet
    if ( images.some( image => !this.imageSources[ image.asset ] ) ) this.loadAssetsFromStorage();
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.images = this.images.map( image => ( { ...image } ) );
    serializedWgt.selected = this.selected.v;
    serializedWgt.showNavigation = this.showNavigation;
    serializedWgt.fit = this.fit;
    return serializedWgt;
  }
}
