import type { OrganizationData } from "@/interfaces/organization";
export declare function removeOrganizationResourceIdPrefix(orgResId: any, rootOrg: any, fullRemoval?: boolean): string;
export declare function getLoggedUserCannotAccessMfaOrg(organization: any): boolean;
export declare function disambiguateOrganizations(orgs: OrganizationData[]): OrganizationData[];
