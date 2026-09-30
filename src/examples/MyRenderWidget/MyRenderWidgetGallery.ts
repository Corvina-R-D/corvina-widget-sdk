import { BaseGallery } from 'corvina';
import MyRenderWidgetPropsHandler from './MyRenderWidgetPropsHandler';
import { widgetType } from "./defs";

class MyRenderWidgetGallery extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new MyRenderWidgetPropsHandler();
  }

  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "MyRenderWgt",
      "class": "MyRenderWgt",
      "message": "Hello World",
      "linkableProp": 50,
      "width": 220,
      "height": 180,
      "x": 0,
      "y": 0,
      "cx": 110,
      "cy": 90,
    }
  }

}

export const myRenderWidgetGallery = new MyRenderWidgetGallery();
