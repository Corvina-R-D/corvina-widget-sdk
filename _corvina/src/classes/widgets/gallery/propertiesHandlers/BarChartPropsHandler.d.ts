import IPropertyHandler from './IPropertyHandler';
import CategoricalChartPropsHandler from "./CategoricalChartPropsHandler";
export default class BarChartPropsHandler extends CategoricalChartPropsHandler {
    wgts: IPropertyHandler;
    axisColor: IPropertyHandler;
    gridColor: IPropertyHandler;
    showlegend: IPropertyHandler;
    marginsType: IPropertyHandler;
    marginBottom: IPropertyHandler;
    marginTop: IPropertyHandler;
    marginLeft: IPropertyHandler;
    marginRight: IPropertyHandler;
    y1AxisColor: IPropertyHandler;
    y2AxisColor: IPropertyHandler;
    y1AxisLabel: IPropertyHandler;
    y2AxisLabel: IPropertyHandler;
    y1AxisRangeMode: IPropertyHandler;
    ["y1AxisRange.start"]: IPropertyHandler;
    ["y1AxisRange.end"]: IPropertyHandler;
    y2AxisRangeMode: IPropertyHandler;
    ["y2AxisRange.start"]: IPropertyHandler;
    ["y2AxisRange.end"]: IPropertyHandler;
    showAggregation: IPropertyHandler;
    createCustomPropsHandler(): void;
}
