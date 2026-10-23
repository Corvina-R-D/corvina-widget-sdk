declare const _default: {
    loadRealm(): Promise<string>;
    postLogin(): Promise<void>;
    AMR_ATTR_OTP: "otp";
    AMR_ATTR_SSO: "sso";
    init: () => Promise<void>;
    initAdmin: () => Promise<void>;
    roles: (role: any) => any;
    logout: () => void;
    header: () => {
        Authorization: string;
    };
};
export default _default;
