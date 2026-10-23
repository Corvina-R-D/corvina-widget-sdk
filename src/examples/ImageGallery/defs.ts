/*
 * Use defs file to share among widget file common definitions.
 * An example is the widget type.
 */
export const widgetType = "org.ImageGallery";

// Key of the widget assets (BaseWgt.mapAssets) that holds the images of the gallery
export const ASSETS_PROPERTY = "images";

// One image of the gallery: `asset` is the name of the object in the asset storage of the dashboard
export interface ImageItem {
  asset: string;
  title: string;
  type: string;
}

// Saved state or value from undo: keep only well formed items, as new objects
export function normalizeImages( value: any ): ImageItem[] {
  if ( !Array.isArray( value ) ) return [];
  return value
    .filter( item => item && typeof item.asset === "string" && item.asset )
    .map( item => ( { asset: item.asset, title: String( item.title ?? "" ), type: String( item.type ?? "" ) } ) );
}

/*
 * Image shown for the value of `selected`, -1 when none matches. Datalinks do not convert types:
 * a number (or numeric text) is the 0-based index, a boolean chooses the first or the second image,
 * any other text is compared with the image titles.
 */
export function resolveIndex( selected: any, images: ImageItem[] ): number {
  if ( !images.length ) return -1;
  if ( selected === null || selected === undefined || selected === "" ) return 0;
  if ( typeof selected === "boolean" ) return selected ? Math.min( 1, images.length - 1 ) : 0;
  const text = String( selected ).trim();
  if ( text !== "" && !isNaN( Number( text ) ) ) {
    const index = Math.trunc( Number( text ) );
    return index >= 0 && index < images.length ? index : -1;
  }
  const title = text.toLowerCase();
  for ( let i = 0; i < images.length; i++ ) {
    if ( images[ i ].title.trim().toLowerCase() === title ) return i;
  }
  return -1;
}
