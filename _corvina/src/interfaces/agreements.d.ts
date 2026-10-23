export declare enum AgreementType {
    TERM = "TERM",
    TERM_IT = "TERM_IT",
    PRIVACY = "PRIVACY",
    MAINTENANCE = "MAINTENANCE"
}
export interface AgreementDTOList {
    ids: number[];
}
export interface CheckAgreementOutDTO {
    types: AgreementType[];
}
export interface AgreementOutDTO {
    acceptanceField: string;
    acceptanceFieldHtml: string | null;
    noticeHtml: string | null;
    createdAt: number;
    defaultName: string;
    id: number;
    link: string;
    mandatory: boolean;
    type: AgreementType;
    version: number;
    validityStart: Date;
    validityEnd: Date;
    disabled: boolean;
}
export declare enum AgreementService {
    AGREEMENTS_SERVICE_NAME = "corvina-cloud-agreements",
    GLOBAL_NOTIFICATIONS_SERVICE_NAME = "corvina-cloud-global-notification"
}
