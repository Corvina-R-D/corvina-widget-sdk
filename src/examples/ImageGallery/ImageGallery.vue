<template>
  <div :style="widgetStyle">
    <div class="org-image-gallery" :class="{ interactive: interactive }">
      <img v-if="source" class="image" :src="source" :alt="title" :style="{ objectFit: fit }">
      <span v-else class="placeholder">{{ placeholder }}</span>
      <template v-if="showNavigation && images.length > 1">
        <button class="nav prev" type="button" :aria-label="i18n.t( 'previous' )" :disabled="!interactive" @click="show( index - 1 )">&#8249;</button>
        <button class="nav next" type="button" :aria-label="i18n.t( 'next' )" :disabled="!interactive" @click="show( index + 1 )">&#8250;</button>
        <div class="dots">
          <button v-for="( image, i ) in images" :key="image.asset" type="button" class="dot" :class="{ current: i == index }"
            :aria-label="image.title || String( i + 1 )" :disabled="!interactive" @click="show( i )"></button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { useCorvinaI18n } from "corvina";
import { resolveIndex } from "./defs";

const i18n = useCorvinaI18n({
  "en-US": { "noImages": "No images: add them in the properties panel", "notFound": "No image for \"{value}\"", "loading": "Loading...", "previous": "Previous image", "next": "Next image" },
  "it-IT": { "noImages": "Nessuna immagine: aggiungile nel pannello delle proprietà", "notFound": "Nessuna immagine per \"{value}\"", "loading": "Caricamento...", "previous": "Immagine precedente", "next": "Immagine successiva" }
});

export default {
  name: "ImageGallery",
  props: ["wgt"],
  data: function() {
    return {
      i18n: i18n
    }
  },
  computed: {
    // Position, size, borders and background of the widget box
    widgetStyle() {
      return this.wgt.getStyles();
    },
    images() {
      return this.wgt.getPropertyValue( "images" ) || [];
    },
    selected() {
      return this.wgt.getPropertyValue( "selected" );
    },
    index() {
      return resolveIndex( this.selected, this.images );
    },
    current() {
      return this.index >= 0 ? this.images[ this.index ] : null;
    },
    source() {
      return this.current ? this.wgt.imageSources[ this.current.asset ] : "";
    },
    title() {
      return this.current ? this.current.title : "";
    },
    placeholder() {
      if ( !this.images.length ) return i18n.t( "noImages" );
      if ( !this.current ) return i18n.t( "notFound", { value: String( this.selected ) } );
      return i18n.t( "loading" );
    },
    showNavigation() {
      return !!this.wgt.getPropertyValue( "showNavigation" );
    },
    fit() {
      return this.wgt.getPropertyValue( "fit" ) || "contain";
    },
    interactive() {
      return this.wgt.isInteractive();
    }
  },
  methods: {
    show( index ) {
      this.wgt.show( index );
    }
  }
};
</script>

<style scoped>
.org-image-gallery { position: relative; width: 100%; height: 100%; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.image { width: 100%; height: 100%; display: block; }
.placeholder { padding: 8px; text-align: center; font-size: 13px; opacity: .6; }
.nav { position: absolute; top: 50%; transform: translateY(-50%); width: 32px; height: 32px; border: none; border-radius: 50%; background: rgba(0, 0, 0, .35); color: #fff; font-size: 22px; line-height: 30px; padding: 0; opacity: 0; transition: opacity .2s; }
.nav.prev { left: 8px; }
.nav.next { right: 8px; }
.dots { position: absolute; bottom: 8px; left: 0; right: 0; display: flex; justify-content: center; gap: 6px; }
.dot { width: 8px; height: 8px; border: none; border-radius: 50%; padding: 0; background: rgba(255, 255, 255, .6); box-shadow: 0 0 2px rgba(0, 0, 0, .6); }
.dot.current { background: #fff; transform: scale(1.3); }
.interactive .nav, .interactive .dot { cursor: pointer; }
.interactive:hover .nav, .nav:focus-visible { opacity: 1; }
</style>
