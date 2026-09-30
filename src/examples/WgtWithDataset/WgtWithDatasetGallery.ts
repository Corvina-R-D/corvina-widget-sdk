import { BaseGallery, IPropertyHandler, BasePropsHandler } from "corvina";

export class WgtWithDatasetPropsHandler extends BasePropsHandler
{
  from: IPropertyHandler;
  to: IPropertyHandler;
  wgts: IPropertyHandler;

  createCustomPropsHandler() {
    this.from = {
      layer: "attributes",
      type: "datetime",
      propControl: "CombinedDateTimePropControl",
      readOnly: false,
      attachTag: false,
      display: "Start interval",
      description: "Start of time window"
    };

    this.to = {
      layer: "attributes",
      type: "datetime",
      propControl: "CombinedDateTimePropControl",
      readOnly: false,
      attachTag: false,
      display: "End interval",
      description: "End of time window"
    };

    this.wgts = {
      layer: "Datasets",
      type: "object",
      propControl: "MyDatasetListPropControl",
      readOnly: false,
      attachTag: false,
      display: "My datasets",
      description: "My datasets"
    };
  }
}

import { widgetType } from "./defs";
class WgtWithDatasetGallery extends BaseGallery
{
  constructor() {
    super();
    this.propsHandler = new WgtWithDatasetPropsHandler();
  }

  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "WgtWithDataset",
      "class": "WgtWithDataset",
      "width": 100, 
      "height": 100,
      "x": 0,
      "y": 0,
      "cx": 70,
      "cy": 20
    }
  }
}

export const wgtWithDatasetGallery = new WgtWithDatasetGallery();
