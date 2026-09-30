import { BaseGallery } from 'corvina';
// Same properties of MyRenderWidget: only the way of rendering changes
import MyRenderWidgetPropsHandler from '../MyRenderWidget/MyRenderWidgetPropsHandler';
import { widgetType } from "./defs";

class MyLitWidgetGallery extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new MyRenderWidgetPropsHandler();
  }

  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "MyLitWgt",
      "class": "MyLitWgt",
      "message": "Hello lit-html",
      "linkableProp": 50,
      "width": 220,
      "height": 140,
      "x": 0,
      "y": 0,
      "cx": 110,
      "cy": 70,
    }
  }

}

export const myLitWidgetGallery = new MyLitWidgetGallery();
