import { BaseGallery, IPropertyHandler, BasePropsHandler } from "corvina";

export class WgtHistorySamplePropsHandler extends BasePropsHandler
{
  tagReference: IPropertyHandler;
  from: IPropertyHandler;
  to: IPropertyHandler;

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
    
    this.tagReference = {
      layer: "attributes",
      type: "datasource",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      display: "Historical Data",
      description: "Historical Data"
    };
  }
}

import { widgetType } from "./defs";
class WgtHistorySampleGallery extends BaseGallery
{
  constructor() {
    super();
    this.propsHandler = new WgtHistorySamplePropsHandler();
  }

  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "WgtHistorySample",
      "class": "WgtHistorySample",
      "width": 100, 
      "height": 100,
      "x": 0,
      "y": 0,
      "cx": 70,
      "cy": 20
    }
  }
}

export const wgtHistorySampleGallery = new WgtHistorySampleGallery();
