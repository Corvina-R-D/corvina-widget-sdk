import { BaseGraphicWgt, Value } from "corvina";
import { widgetType } from "./defs";

export default class SimpleClockWidget extends BaseGraphicWgt {
  time: Value<Date>;

  constructor( args ) {
    super( args )
    this.type = widgetType;
    this.time = args.initState.time ? new Value( new Date( args.initState.time ) ) : new Value( new Date() );
  }

  serialize() {
    let serialization = super.serialize();
    serialization.time = this.time.unwrap();
    return  serialization;
  }
}
