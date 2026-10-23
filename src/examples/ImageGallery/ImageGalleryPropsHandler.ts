import { IPropertyHandler, BaseGraphicPropsHandler } from "corvina";

/*
 * Properties shown in the properties panel of the editor. BaseGraphicPropsHandler adds the standard
 * ones of the widget box: position and size, visibility, background, borders, permissions.
 */
export default class ImageGalleryPropsHandler extends BaseGraphicPropsHandler {
  images: IPropertyHandler;
  selected: IPropertyHandler;
  showNavigation: IPropertyHandler;
  fit: IPropertyHandler;

  createCustomPropsHandler() {
    super.createCustomPropsHandler();

    this.images = {
      layer: "attributes",
      type: "object",
      propControl: "ImageGalleryImagesPropControl", // custom control, registered in main.ts
      attachTag: false,
      display: "Images",
      description: "the images of the gallery, stored in the asset storage of the dashboard"
    };

    this.selected = {
      layer: "attributes",
      type: "string",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true, // This property accepts datalinks: a tag or a formula chooses the image.
      attachTagPermission: "readwrite", // the navigation of the operator writes the linked tag
      display: "Selected image",
      description: "image shown: its index (from 0), its title, or a boolean (false the first image, true the second)"
    };

    this.showNavigation = {
      layer: "attributes",
      type: "boolean",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      display: "Navigation",
      description: "arrows and dots to change the image at runtime"
    };

    this.fit = {
      layer: "Style",
      type: "select",
      propControl: "InputPropControl",
      attachTag: false,
      options: [
        { value: "contain", display: "Contain" },
        { value: "cover", display: "Cover" },
        { value: "fill", display: "Fill" }
      ],
      display: "Image fit",
      description: "how the image fills the widget: whole image (contain), cropped (cover) or stretched (fill)"
    };

  }

}
