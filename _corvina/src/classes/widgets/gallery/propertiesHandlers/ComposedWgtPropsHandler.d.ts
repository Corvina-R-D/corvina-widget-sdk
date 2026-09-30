import IPropertyHandler from './IPropertyHandler';
import GroupPropsHandler from './GroupPropsHandler';
export default class ComposedWgtPropsHandler extends GroupPropsHandler {
    dashboardId: IPropertyHandler;
    ["content.deviceSlots"]: IPropertyHandler;
    createCustomPropsHandler(): void;
}
