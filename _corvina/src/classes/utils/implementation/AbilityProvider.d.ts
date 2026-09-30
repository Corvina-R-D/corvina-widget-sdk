import IAbilityProvider from './../IAbilityProvider';
import IAbilityHelper from './../IAbilityHelper';
declare class AbilityProvider implements IAbilityProvider {
    private rootCompanyAbilityHelper;
    getRootCompanyAbilityHelper(): IAbilityHelper;
}
declare const _default: AbilityProvider;
export default _default;
