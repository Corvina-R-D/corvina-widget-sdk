import BaseGraphicPropsHandler from './BaseGraphicPropsHandler';
import IPropertyHandler from './IPropertyHandler';
export default class GroupPropsHandler extends BaseGraphicPropsHandler {
    elevateOnHover: IPropertyHandler;
    createCustomPropsHandler(): void;
}
