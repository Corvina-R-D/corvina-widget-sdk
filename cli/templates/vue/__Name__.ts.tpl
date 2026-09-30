import { BaseGraphicWgt, Value } from "corvina";
import { widgetType } from "./defs";

/*
 * A widget rendered by a Vue 2 component (__Name__.vue), registered with the `component` field.
 * The class holds the properties of the widget, the component draws them.
 */
export default class __Name__ extends BaseGraphicWgt {
  message: Value<string>;
  value: Value<number>;

  constructor( args ) {
    super( args );
    this.type = widgetType;
    this.message = new Value( args.initState.message ?? "__title__" );
    this.value = new Value( args.initState.value ?? 50 );
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.message = this.message.v;
    serializedWgt.value = this.value.v;
    return serializedWgt;
  }
}
