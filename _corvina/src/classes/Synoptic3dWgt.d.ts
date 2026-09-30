import { LayoutType } from "@/constant/Layouts";
import { BaseGraphicWgt, BaseWgt, Value } from '@/corvina-model';
import { OutlinePass } from '@/utils/3d/OutlinePass';
import TransformControls from '@/utils/3d/TransformControls.js';
import { ScaleGizmo } from '@/utils/3d/scaleGizmo';
import * as THREE from 'three';
import { Object3D, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import MeshTransformWgt from './MeshWgtTransform';
import { ProgressData } from "@/communication/axios/IDashboardAxiosInstance";
export declare enum WidgetSetupOpMode {
    DROP = 0,
    LOAD = 1
}
export declare enum SaveWidgetTransformOp {
    POSITION = 1,// 0001
    ROTATION = 1,// 0010
    SCALE = 2,// 0100
    BILLBOARD = 4,// 1000
    ALL = 15
}
export declare enum GizmoMode {
    MOVE = 0,
    ROTATE = 1,
    SCALE = 2
}
export declare enum CAMERA_ANIMATION {
    RELATIVE_DIRECTION = 0,
    ABOSLUTE_POSITION = 1
}
export declare const synoptic3dAcceptedNativeWidgets: string[];
export declare const synoptic3dAcceptedPlanarWidgets: string[];
export default class Synoptic3dWgt extends BaseGraphicWgt {
    corvinaVersion: number | null;
    canvas: HTMLCanvasElement;
    threeRenderer: THREE.WebGLRenderer;
    threeScene: THREE.Scene;
    threeCamera: THREE.PerspectiveCamera;
    threeAxisHelper: THREE.AxesHelper;
    orbitControls: OrbitControls;
    trackballControls: TrackballControls;
    transformControls: TransformControls;
    threeRaycaster: THREE.Raycaster;
    threeRenderTarget: THREE.WebGLRenderTarget;
    meshWidgetsParent: Object3D;
    composer: EffectComposer;
    pointer: THREE.Vector2;
    outlinePass: OutlinePass;
    fxaaPass: any;
    resizeListener: EventListenerOrEventListenerObject;
    debugSphere: THREE.Mesh;
    externalModelUrl: Value<string>;
    modelObjectStoreUrl: string;
    modelName: string;
    _loading: boolean;
    _loadingPercentage: number;
    oneModelLoaded: boolean;
    onLoadingChanged: Function;
    scaleGizmo: ScaleGizmo;
    showOrigin3D: boolean;
    unsubFunction: any;
    rootMesh: MeshTransformWgt;
    selectedWidget: BaseGraphicWgt;
    cameraPos: THREE.Vector3;
    lastCameraPos: THREE.Vector3;
    loaded: boolean;
    resizeHandler: any;
    panningPrecision: number;
    pinchPrecision: number;
    rotationPrecision: number;
    inEditor: boolean;
    defaultPopupBackgroundColor: string;
    enableCameraWidget: Value<boolean>;
    enableStandardViews: Value<boolean>;
    userDefinedViews: Array<any>;
    defaultCamera: any;
    defaultCamera_options: Array<any>;
    private popupWidgets;
    private placeholderColorHighlight;
    private placeholderColorStandard;
    private placeholderColorBorder;
    private childWidgetMaxDepth;
    private childWidgetMinDepth;
    private modelLoadingInitPhase;
    private defaultMaterial;
    private preloadedImages;
    private onDraggingChanged;
    originalWidth: number;
    originalHeight: number;
    widgetDecorationHeight: number;
    dropHighlightMesh: THREE.Mesh;
    targetTransform: THREE.Object3D;
    animationFrameId: number;
    progressData: ProgressData;
    defaultCameras: {
        display: string;
        value: {
            cameraLookAt: {
                cameraDirection: THREE.Vector3;
                needFit: boolean;
                needAnimation: boolean;
                mode: CAMERA_ANIMATION;
            };
        };
    }[];
    constructor(args: any);
    updateLoadingStatus(progressData: ProgressData): void;
    removeUserDefinedView(idx: any): void;
    setEditMode(idx: any, value: any): void;
    getCameraLookAt(): {
        cameraPosition: THREE.Vector3;
        orbitTarget: THREE.Vector3;
        needFit: boolean;
        needAnimation: boolean;
        mode: CAMERA_ANIMATION;
    };
    getStyles(): {
        [property: string]: string | number;
    };
    getFixedStyleForChildren(): {
        "box-shadow": string;
    };
    serialize(): import("./BaseGraphicWgt").IBaseGraphicWidgetSerialization;
    initialize(): Promise<void>;
    didLoadMesh(): void;
    loadDefaultModel(): Promise<void>;
    detachGizmo(): void;
    attachGizmo(meshWgt: any): void;
    destroy(): void;
    disposeScene(): void;
    private propUpdated;
    storeUnsubscribe(): void;
    resize(): void;
    private reflowWidgets;
    loadAssetsFromStorage(): Promise<void>;
    protected updateAssetsReferenceCounter(): void;
    get modelFileUpload(): string;
    set modelFileUpload(value: string);
    protected createDefaultMaterial(): void;
    updateLoadingPercentageThrottled: ((newLoadingPercentage: number) => Promise<void>) & import("lodash").Cancelable;
    dragHighlightThrottled: ((position: {
        x: any;
        y: any;
    }, icon: string) => Promise<void>) & import("lodash").Cancelable;
    completeInitialization(): void;
    loadMesh(): Promise<THREE.Object3D[] | null>;
    recurseAddMesh(parentWgt: BaseWgt, mesh: THREE.Object3D, idx: number): Promise<MeshTransformWgt>;
    syncMeshes(newMeshes: THREE.Object3D[]): Promise<void>;
    zoomFitAll(): void;
    setCameraRelativePosition(cameraLookAt: {
        cameraDirection: Vector3;
        needAnimation: boolean;
    }, animationDuration?: number): void;
    setCameraAbsolutePosition(cameraLookAt: {
        cameraPosition: Vector3;
        orbitTarget: Vector3;
        needAnimation: boolean;
    }, animationDuration: any): void;
    updateCameraLookAt(cameraLookAt: {
        cameraPosition: Vector3;
        orbitTarget: Vector3;
        cameraDirection: Vector3;
        needFit: boolean;
        needAnimation: boolean;
        mode: CAMERA_ANIMATION;
    }, animationDuration?: number): void;
    update(): void;
    private updateAllWidgetLinks;
    private removeWidgetLinks;
    modelUrlChanged(): Promise<THREE.Object3D<THREE.Event>[]>;
    doShowOrigin3D(bShow: boolean): void;
    setBackgroundColor(value: string): void;
    parseColor(input: any): number[];
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): Promise<void>;
    getPropertyValue(prop: any): any;
    getLayoutType(): LayoutType;
    pickPlaceholder(): BaseGraphicWgt | null;
    buildDragGhost(): void;
    hideDragGhost(): void;
    dragHighlight(screenPosition: any, image: any): void;
    selectWidget(wgt: any): Promise<void>;
    updateLinkToMesh(wgt: any): void;
    private getClientRectFromMesh;
    private cssTransformToMatrix;
    connectElements(svg: any, path: any, startElem: HTMLElement, endElem: HTMLElement): void;
    saveWidgetTransform(widget: BaseGraphicWgt, operation?: SaveWidgetTransformOp, originalMesh?: THREE.Object3D): Promise<void>;
    updatePointer(ev: MouseEvent): void;
    onMouseMove(ev: MouseEvent): void;
    threeRaycast(exclude?: string[], pos?: {
        x: any;
        y: any;
    }): THREE.Intersection<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>[];
    getPickResult(): {
        position: any;
        rotation: any;
    };
    getWidgetUnderCursor(screenPosition: {
        x: any;
        y: any;
    }): BaseGraphicWgt;
    private buildPlaceholderTexture;
    addPopupWidget(widget: BaseGraphicWgt, screenPosition: {
        x: number;
        y: number;
    }, opMode?: WidgetSetupOpMode): void;
    forceWidgetPosition(widget: BaseGraphicWgt): void;
    hideScene(): void;
    showScene(): void;
    setup3dWidget(widget: BaseGraphicWgt, screenPosition: {
        x: number;
        y: number;
    }, opMode?: WidgetSetupOpMode): void;
    removeWidget(widgetId: any, widgetRefreshInterval?: number): void;
    updateWidgetTexture(widget: any, dynamicTexture: any, mesh: any, widgetRefreshInterval: number): void;
    private setBillboardMode;
    private expandWidget;
    setPinned(widget: BaseGraphicWgt): void;
    hideWidget(widget: BaseGraphicWgt): void;
    private hideLink;
    private showLink;
    showWidget(widget: BaseGraphicWgt): void;
    setMaxDepth(frontWidget: BaseGraphicWgt): void;
    selectNextGizmo(): void;
    toggleGizmoMode(newMode: GizmoMode): void;
    setSnapEnabled(snapEnabled: boolean): void;
    resetRotation(): void;
    setWidgetFullscreen(widget: BaseGraphicWgt): void;
    unload(): void;
}
