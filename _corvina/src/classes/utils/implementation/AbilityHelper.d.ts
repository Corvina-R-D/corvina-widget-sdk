import { PureAbility } from '@casl/ability';
import IAbilityHelper from './../IAbilityHelper';
export default class AbilityHelper implements IAbilityHelper {
    private ability;
    getAbility(): PureAbility;
    updateAbilities(rules: any): void;
    hasPermission(checkPermission: string, entity: string): boolean;
    hasOneOfPermissions(checkPermissions: string[], entity: string): boolean;
    hasPermissionOnOneOfEntities(checkPermission: string, entities: string[]): boolean;
    hasPermissionOnAllEntities(checkPermission: string, entities: string[]): boolean;
}
