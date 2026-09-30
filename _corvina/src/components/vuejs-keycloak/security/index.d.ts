declare const _default: {
    init: (next?: any, roles?: any) => Promise<void>;
    roles: (role: any) => any;
    logout: () => void;
    header: () => {
        Authorization: string;
    };
};
export default _default;
