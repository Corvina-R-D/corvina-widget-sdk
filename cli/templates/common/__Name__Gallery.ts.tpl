import { BaseGallery } from "corvina";
import __Name__PropsHandler from "./__Name__PropsHandler";
import { widgetType } from "./defs";

class __Name__Gallery extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new __Name__PropsHandler();
  }

  // State of a widget added to the dashboard from the gallery
  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "__Name__",
      "class": "__Name__",
      "message": "__title__",
      "value": 50,
      "width": 220,
      "height": 140,
      "x": 0,
      "y": 0,
      "cx": 110,
      "cy": 70,
    }
  }

}

export const __camelName__Gallery = new __Name__Gallery();
