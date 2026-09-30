import { RawRule, PureAbility } from "@casl/ability";
export default interface IAbilityHelper {
    getAbility(): PureAbility;
    updateAbilities(rules: RawRule[]): void;
    hasPermission(checkPermission: string, entity: string): boolean;
    hasOneOfPermissions(checkPermissions: string[], entity: string): boolean;
    hasPermissionOnOneOfEntities(checkPermission: string, entities: string[]): boolean;
}
