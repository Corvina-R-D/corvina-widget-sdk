export interface AccountCredentialsDTO {
    id: string;
    type: string;
    userLabel: string;
    createdDate: number;
}
export interface UserSessionDTO {
    id: string;
    ipAddress: string;
    username: string;
    lastAccess: number;
    start: number;
}
export interface AccountDTO {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    credentials: AccountCredentialsDTO[];
    sessions: UserSessionDTO[];
}
export interface AccountPatchDTO {
    firstName: string;
    lastName: string;
}
