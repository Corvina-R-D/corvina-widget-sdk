import { BaseGraphicWgt, Value } from "corvina";
import { widgetType } from "./defs";

export default class MyWidget extends BaseGraphicWgt {
  message: string;
  linkableProp: Value<string>;

  constructor( args ) {
    super( args );
    this.type = widgetType;
    this.message = args.initState.message;
    this.linkableProp = new Value( args.initState.linkableProp );
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.message = this.message;
    serializedWgt.linkableProp = this.linkableProp.v;
    return serializedWgt;
  }
}
