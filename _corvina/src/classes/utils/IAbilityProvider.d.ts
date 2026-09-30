import IAbilityHelper from './IAbilityHelper';
export default interface IAbilityProvider {
    getRootCompanyAbilityHelper(): IAbilityHelper;
}
