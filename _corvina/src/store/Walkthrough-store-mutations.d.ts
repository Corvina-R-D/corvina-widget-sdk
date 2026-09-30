declare const _default: {
    SET_PRESET(state: any, preset: any): void;
    SET_MODEL(state: any, model: any): void;
    SET_DEVICE_DATA(state: any, { key, value }: {
        key: any;
        value: any;
    }): void;
    SAVE_DEVICE(state: any, device: any): void;
    SET_ARE_TAGS_AVAILABLE(state: any, value: any): void;
    SET_DEVICE_POSITION(state: any, position: any): void;
    RESET_STATE(state: any): void;
    SET_DEVICE_COORDINATE(state: any, { index, value }: {
        index: any;
        value: any;
    }): void;
    SET_ONBOARDING_STEP(state: any, step: any): void;
};
export default _default;
