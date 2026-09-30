import { IPropertyHandler, BasePropsHandler } from "corvina";

export default class MyDatasetPropsHandler extends BasePropsHandler {
  label: IPropertyHandler;
  source: IPropertyHandler;

  createCustomPropsHandler() {
    
    this.label = {
      layer: "attributes",
      type: "string",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      display: "Label",
      description: "Label",
    };

    this.source = {
      layer: "attributes",
      type: "model",
      propControl: "InputPropControl",
			readOnly: false,
			attachTag: true,
			display: "Source",
      description: "Source"
    };
  }
}
