declare const _default: {
    state: {
        auth: {
            authenticated: boolean;
        };
    };
    actions: {
        authLogin({ commit }: {
            commit: any;
        }, keycloakAuth: any): void;
        authLogout({ commit }: {
            commit: any;
        }): void;
    };
    getters: {
        SECURITY_AUTH: (state: any) => any;
    };
    mutations: {
        SECURITY_AUTH(state: any, keycloakAuth: any): void;
    };
};
export default _default;
