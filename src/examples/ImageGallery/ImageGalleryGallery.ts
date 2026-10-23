import { BaseGallery } from "corvina";
import ImageGalleryPropsHandler from "./ImageGalleryPropsHandler";
import { widgetType } from "./defs";

class ImageGalleryGallery extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new ImageGalleryPropsHandler();
  }

  // State of a widget added to the dashboard from the gallery
  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "ImageGallery",
      "class": "ImageGallery",
      "images": [],
      "selected": 0,
      "showNavigation": true,
      "fit": "contain",
      "width": 320,
      "height": 240,
      "x": 0,
      "y": 0,
      "cx": 160,
      "cy": 120,
    }
  }

}

export const imageGalleryGallery = new ImageGalleryGallery();
