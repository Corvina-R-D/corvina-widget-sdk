import { IPropertyHandler, BaseGraphicPropsHandler } from "corvina";

/*
 * Properties shown in the properties panel of the editor. BaseGraphicPropsHandler adds the standard
 * ones of the widget box: position and size, visibility, background, borders, permissions.
 */
export default class __Name__PropsHandler extends BaseGraphicPropsHandler {
  message: IPropertyHandler;
  value: IPropertyHandler;

  createCustomPropsHandler() {
    super.createCustomPropsHandler();

    this.message = {
      layer: "attributes",
      type: "string",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      supportI18n: true, // translatable property
      display: "Message",
      description: "the label of the value"
    };

    this.value = {
      layer: "attributes",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true, // This property accepts datalinks.
      display: "Value",
      description: "a value from 0 to 100, shown by the bar"
    };

  }

}
