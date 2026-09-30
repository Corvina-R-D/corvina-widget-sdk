export interface modelPathPermissions {
    modelPath: number;
    history?: boolean;
    read?: boolean;
    write?: boolean;
}
export interface ModelRoleInDTO {
    createdAt: string;
    deleted: boolean;
    description: string;
    id: number;
    label: string;
    name: string;
    updatedAt: string;
    organizationId: number;
}
export interface ModelRoleUpdateDTO {
    label: string;
    description: string;
    modelPathPermissions: modelPathPermissions[];
}
export interface ModelRoleOutDTO extends ModelRoleUpdateDTO {
    name: string;
}
