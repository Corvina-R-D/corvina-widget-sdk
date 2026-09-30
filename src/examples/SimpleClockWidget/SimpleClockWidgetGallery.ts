import { BaseGallery } from 'corvina';
import MyWgtPropsHandler from './SimpleClockWidgetPropsHandler';
import {widgetType} from "./defs";

class MyWgtGallery2 extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new MyWgtPropsHandler();
  }

  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "SimpleClockWidget",
      "class": "SimpleClockWidget",
      "width": 140,
			"height": 40,
			"x": 0,
			"y": 0,
			"cx": 70,
			"cy": 20,
    }
  }

}

export const simpleClockWidgetGallery = new MyWgtGallery2();
