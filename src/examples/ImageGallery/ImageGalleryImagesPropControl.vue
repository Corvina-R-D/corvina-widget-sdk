<template>
  <div class="org-image-gallery-images">
    <label class="title">{{ display }}</label>
    <div v-if="storageEnabled === false" class="message error">{{ i18n.t( "storageDisabled" ) }}</div>
    <ul v-if="images.length" class="list">
      <li v-for="( image, i ) in images" :key="image.asset" class="item">
        <span class="index">{{ i }}</span>
        <img v-if="sources[ image.asset ]" class="thumbnail" :src="sources[ image.asset ]" :alt="image.title">
        <span v-else class="thumbnail"></span>
        <input class="name" type="text" :value="image.title" :placeholder="i18n.t( 'titlePlaceholder' )" :disabled="busy"
          @change="rename( i, $event.target.value )">
        <button type="button" :title="i18n.t( 'moveUp' )" :disabled="busy || i == 0" @click="move( i, -1 )">&#8593;</button>
        <button type="button" :title="i18n.t( 'remove' )" :disabled="busy" @click="remove( i )">&#10005;</button>
      </li>
    </ul>
    <input ref="files" class="files" type="file" multiple :accept="accept" @change="onFilesSelected">
    <button type="button" class="add" :disabled="busy || storageEnabled === false" @click="$refs.files.click()">
      {{ busy ? i18n.t( "uploading", { done: uploaded, total: toUpload } ) : i18n.t( "add" ) }}
    </button>
    <div v-if="message" class="message error">{{ message }}</div>
  </div>
</template>

<script>
import { projectStore, useCorvinaI18n } from "corvina";
import { normalizeImages } from "./defs";
import { IMAGE_TYPES, MAX_IMAGE_SIZE, isAssetStorageEnabled } from "./imageAssets";

const i18n = useCorvinaI18n({
  "en-US": {
    "add": "Add images", "uploading": "Uploading {done}/{total}...", "remove": "Remove", "moveUp": "Move up",
    "titlePlaceholder": "Title", "storageDisabled": "The asset storage is not enabled for this organization: images cannot be uploaded.",
    "rejected": "Not added (PNG, JPEG, GIF, WebP or SVG up to {size} MB): {names}", "failed": "Upload failed: {names}"
  },
  "it-IT": {
    "add": "Aggiungi immagini", "uploading": "Caricamento {done}/{total}...", "remove": "Rimuovi", "moveUp": "Sposta su",
    "titlePlaceholder": "Titolo", "storageDisabled": "Lo storage degli asset non è abilitato per questa organizzazione: non è possibile caricare immagini.",
    "rejected": "Non aggiunte (PNG, JPEG, GIF, WebP o SVG fino a {size} MB): {names}", "failed": "Caricamento non riuscito: {names}"
  }
});

/*
 * Editor of the `images` property of ImageGallery: the upload is done by the widget (uploadImages),
 * the other changes write a new list with setWidgetValue (recorded for undo, saves the dashboard).
 * The widget keeps the asset references in sync with the list (ImageGallery.setPropertyValue).
 * Plain promises and no object spread here: Babel would need @babel/runtime for them in .vue files.
 */
export default {
  name: "ImageGalleryImagesPropControl",
  props: [ "wgt", "propName", "prop", "display" ],
  data: function() {
    return {
      i18n: i18n,
      accept: IMAGE_TYPES.join( "," ),
      storageEnabled: null,
      busy: false,
      uploaded: 0,
      toUpload: 0,
      message: ""
    };
  },
  computed: {
    images() {
      return normalizeImages( this.prop );
    },
    sources() {
      return this.wgt.imageSources || {};
    }
  },
  mounted() {
    isAssetStorageEnabled().then( enabled => { this.storageEnabled = enabled; } );
  },
  methods: {
    write( images ) {
      // A new array every time: undo keeps the previous one
      projectStore.setWidgetValue( { wgtId: this.wgt.id, prop: this.propName, value: images, record: true } );
    },
    rename( index, title ) {
      this.write( this.images.map( ( image, i ) => ( i == index ? Object.assign( {}, image, { title: title.trim() } ) : image ) ) );
    },
    move( index, offset ) {
      const images = this.images.slice();
      const image = images.splice( index, 1 )[ 0 ];
      images.splice( index + offset, 0, image );
      this.write( images );
    },
    // The image leaves the gallery: its file stays in the storage (undo can bring it back)
    remove( index ) {
      this.write( this.images.filter( ( image, i ) => i != index ) );
    },
    onFilesSelected( event ) {
      const files = Array.from( event.target.files || [] );
      event.target.value = "";  // the same files can be chosen again
      if ( files.length ) this.addFiles( files );
    },
    addFiles( files ) {
      this.message = "";
      this.busy = true;
      this.uploaded = 0;
      this.toUpload = files.length;
      return isAssetStorageEnabled()
        .then( enabled => {
          this.storageEnabled = enabled;
          if ( !enabled ) return;
          return this.wgt.uploadImages( files, ( done, total ) => { this.uploaded = done; this.toUpload = total; } )
            .then( result => {
              const messages = [];
              if ( result.rejected.length ) messages.push( i18n.t( "rejected", { size: MAX_IMAGE_SIZE / ( 1024 * 1024 ), names: result.rejected.join( ", " ) } ) );
              if ( result.failed.length ) messages.push( i18n.t( "failed", { names: result.failed.join( ", " ) } ) );
              this.message = messages.join( " " );
            } );
        } )
        .finally( () => { this.busy = false; } );
    }
  }
};
</script>

<style scoped>
.org-image-gallery-images { display: flex; flex-direction: column; gap: 6px; padding: 4px 0; font-size: 13px; }
.title { font-weight: 500; }
.list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.item { display: flex; align-items: center; gap: 4px; }
.index { width: 16px; text-align: right; opacity: .6; }
.thumbnail { width: 40px; height: 30px; object-fit: cover; border-radius: 3px; background: rgba(127, 127, 127, .2); flex: none; }
.name { flex: 1; min-width: 0; padding: 2px 4px; border: 1px solid rgba(127, 127, 127, .4); border-radius: 3px; background: transparent; color: inherit; }
.item button { width: 24px; height: 24px; padding: 0; border: none; background: transparent; color: inherit; cursor: pointer; }
.item button:disabled { opacity: .3; cursor: default; }
.files { display: none; }
.add { align-self: flex-start; padding: 4px 12px; border: 1px solid currentColor; border-radius: 4px; background: transparent; color: inherit; cursor: pointer; }
.add:disabled { opacity: .5; cursor: default; }
.message.error { color: #d32f2f; }
</style>
