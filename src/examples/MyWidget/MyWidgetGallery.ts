import { BaseGallery } from 'corvina';
import MyWgtPropsHandler from './MyWidgetPropsHandler';
import { widgetType } from "./defs";

class MyWidgetGallery extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new MyWgtPropsHandler();
  }

  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "MyWgt",
      "class": "MyWgt",
      "message": "Hello World",
      "linkableProp": 0,
      "width": 140,
			"height": 40,
			"x": 0,
			"y": 0,
			"cx": 70,
			"cy": 20,
    }
  }

}

export const myWidgetGallery = new MyWidgetGallery();
