import MeshWgtTransform from './MeshWgtTransform';
export default class MeshWgt extends MeshWgtTransform {
    constructor(args: any);
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    initializeReferences(): void;
    updateReferences(): void;
    removeEventsForWidget(): void;
    setupEventsForWidget(): void;
    serialize(): import("./BaseGraphicWgt").IBaseGraphicWidgetSerialization;
}
