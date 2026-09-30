import { defineComponent, h, ref } from "vue3";

export interface __Name__ViewProps {
  message: string;
  value: number;
  clicksLabel: string;
}

/*
 * The Vue 3 component of the widget, written with render functions: the .vue files of the project
 * are compiled for Vue 2.
 */
export default defineComponent( {
  name: "__Name__View",
  props: {
    message: { type: String, default: "" },
    value: { type: Number, default: 0 },
    clicksLabel: { type: String, default: "" }
  },
  setup( props ) {
    // State of the view, kept by Vue 3: no requestUpdate() is needed
    const clicks = ref( 0 );

    return () => {
      const percent = Math.min( Math.max( props.value, 0 ), 100 );
      return h( "div", { class: "__cssClass__" }, [
        h( "h2", `${props.message}: ${props.value}` ),
        h( "div", { class: "bar" }, [ h( "div", { class: "bar-fill", style: { width: `${percent}%` } } ) ] ),
        h( "button", { onClick: () => clicks.value++ }, `${props.clicksLabel}: ${clicks.value}` )
      ] );
    };
  }
} );
