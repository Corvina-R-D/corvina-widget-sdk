import IPropertyHandler from './IPropertyHandler';
import BaseGraphicPropsHandler from './BaseGraphicPropsHandler';
export default class CategoricalChartPropsHandler extends BaseGraphicPropsHandler {
    wgts: IPropertyHandler;
    mode: IPropertyHandler;
    startDate: IPropertyHandler;
    endDate: IPropertyHandler;
    algInterval: IPropertyHandler;
    algUnit: IPropertyHandler;
    algAggregation: IPropertyHandler;
    algMissingValues: IPropertyHandler;
    algPadding: IPropertyHandler;
    aggrOperator: IPropertyHandler;
    aggrSumTimeValue: IPropertyHandler;
    aggrSumTimeUnit: IPropertyHandler;
    limit: IPropertyHandler;
    showlegend: IPropertyHandler;
    enableAlignment: IPropertyHandler;
    algSourceType: IPropertyHandler;
    algSource: IPropertyHandler;
    colorScheme: IPropertyHandler;
    createCustomPropsHandler(): void;
}
