import { IPropertyHandler, BasePropsHandler } from "corvina";

export default class MyWgtPropsHandler2 extends BasePropsHandler {

  time: IPropertyHandler;

  createCustomPropsHandler() {

    this.time = {
      layer: "attributes",
      type: "date",
      propControl: "TimePropControl",
			readOnly: false,
			attachTag: false,
			display: "Time",
      description: "current time"
    };
  }
}
