import { CorvinaAxiosTokens } from './implementation/BasicAxiosInstance';
import { OrganizationInDTO } from '@/interfaces/organization';
export default interface IBasicAxiosInstance {
    $corvina: CorvinaAxiosTokens;
    /*! Returns a generic access token to use the app services */
    genericAccessToken(): Promise<string>;
    RPTPlatformToken(permission: string, options?: {
        force: boolean;
    }): Promise<string>;
    getAxiosInstanceToken(organization: OrganizationInDTO): Promise<string>;
}
