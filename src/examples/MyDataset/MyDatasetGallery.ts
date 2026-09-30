import { BaseGallery } from 'corvina';
import MyDatasetPropsHandler from './MyDatasetPropsHandler';
import { widgetType } from "./defs";

class MyDatasetGallery extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new MyDatasetPropsHandler();
  }

  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "MyDataset",
      "class": "MyDataset",
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

export const myDatasetGallery = new MyDatasetGallery();
