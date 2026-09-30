import * as THREE from 'three';
import { Value, BaseGraphicWgt, IWgtConstructorParams } from '@/corvina-model';
import { IBaseGraphicWidgetSerialization } from './BaseGraphicWgt';
export interface IMeshTransformWgtSerialization extends IBaseGraphicWidgetSerialization {
    materialEmissiveColor: string;
    materialEmissiveColorEnabled: boolean;
    materialEmissiveDrivenByParent: boolean;
}
export default class MeshTransformWgt extends BaseGraphicWgt {
    mesh: THREE.Mesh;
    meshPath: string;
    materialEmissiveColor: Value<string>;
    materialEmissiveColorEnabled: Value<Boolean>;
    materialEmissiveDrivenByParent: Value<Boolean>;
    protected originalMaterialName: string;
    private materialAssignMaxRetries;
    constructor(args: IWgtConstructorParams<IMeshTransformWgtSerialization>);
    getHighlightedParent(currentNode: MeshTransformWgt): any;
    updateChildren(currentNode: MeshTransformWgt, origin: MeshTransformWgt): void;
    setChildrenDrivenByMe(currentNode: MeshTransformWgt, value: boolean): void;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    initializeReferences(): void;
    updateReferences(): void;
    serialize(): IBaseGraphicWidgetSerialization;
    setupUserCustomHighlight(value: string): void;
    disableHighlightColor(): void;
}
