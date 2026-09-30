import BasePropsHandler from './propertiesHandlers/BasePropsHandler';
import { WidgetDataModel } from "../../WidgetFactory";
export default class BaseGallery {
    propsHandler: BasePropsHandler;
    getPropsHandler(): BasePropsHandler;
    getDataModel(): WidgetDataModel;
    getDefaultConfiguration(galleryMode: boolean): object;
}
