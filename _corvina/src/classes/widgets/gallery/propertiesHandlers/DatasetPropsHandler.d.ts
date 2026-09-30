import IPropertyHandler from './IPropertyHandler';
import BasePropsHandler from './BasePropsHandler';
export default class DatasetPropsHandler extends BasePropsHandler {
    label: IPropertyHandler;
    value: IPropertyHandler;
    color: IPropertyHandler;
    yAxis: IPropertyHandler;
    createCustomPropsHandler(): void;
}
