import { IPropertyHandler, BasePropsHandler } from "corvina";

export default class MyRenderWidgetPropsHandler extends BasePropsHandler {
  message: IPropertyHandler;
  linkableProp: IPropertyHandler;

  createCustomPropsHandler() {

    this.message = {
      layer: "attributes",
      type: "string",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      supportI18n: true, // translatable property
      display: "Message",
      description: "a nice message"
    };

    this.linkableProp = {
      layer: "attributes",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true, // This property accepts datalinks.
      display: "Linkable Prop",
      description: "a value from 0 to 100, shown by the bar"
    };

  }

}
