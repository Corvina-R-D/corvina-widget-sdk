import { BREAKPOINTS_MODE, BaseGraphicWgt, BaseWgt, ConfigurationLayout, Dashboard, GroupWgt, IAddDataLinkArgs, IWidgetSerialization } from "@/corvina-model";
import { VuexModule } from "vuex-module-decorators";
import { DragOverOperation } from "../interfaces/dashboardeditor";
export declare const DEFAULT_SIDEPANEL_WIDTH = 340;
import { WidgetModule } from "../classes/WidgetFactory";
import { ResponseDashboardVersions } from "../communication/axios/implementation/DashboardAxiosInstance";
import { DashboardItemInDTO, DashboardManifest, DashboardOutDTO, DashboardType, DashboardsInDTO, DashboardsMap, FetchDashboardParams, IDashboardSerialization } from "../interfaces/dashboard";
import { FormulaCompileOptions } from "@/utils/formula/FormulaInterfaces";
import DataLink from "../classes/DataLink";
import Layout from "../classes/Layout";
import { XFORMULA_MODE } from "../classes/xFormula";
import MeshTransformWgt from "@/classes/MeshWgtTransform";
import DashboardsFlow from "@/classes/DashboardsFlow";
import { FlowDTO } from "@/interfaces/flows";
import { ClockConfiguration } from "@/classes/Dashboard";
import { ProgressData } from "@/communication/axios/IDashboardAxiosInstance";
import { IXFormSerialization } from "@/classes/xForm";
import { DragTreePropertyEvent } from "@/interfaces/dashboardeditor";
export interface ExportedDashboard extends Dashboard {
    metadata: {
        modelDeps: Array<any>;
        assetsData?: Array<{
            name: string;
            data: any;
        }>;
        manifest: any;
    };
    encryptedContent?: string;
}
export interface DragIndicatorData {
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    imageSrc?: string;
    iconName?: string;
}
export interface IUpdateFormulaParams {
    datalink: DataLink;
    formula: string;
    options?: FormulaCompileOptions;
    mode?: XFORMULA_MODE;
    weakDependencies?: boolean;
}
export interface IMarginHighlighter {
    visible?: boolean;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    direction?: "inner" | "outer";
    children?: boolean;
}
export default class ProjectStore extends VuexModule {
    _loading: boolean;
    flows: {
        [id: string]: FlowDTO;
    };
    projects: DashboardsMap;
    widgets: DashboardsMap;
    widgetsGallery: DashboardsMap;
    widgetsGalleryNameToId: {
        [name: string]: string;
    };
    curProject: Dashboard;
    currentFlow: DashboardsFlow;
    favourites: {};
    movingWidget: BaseGraphicWgt;
    isResizingSidebar: boolean;
    sidebars: {
        projectSidebar: {
            size: {
                width: number;
            };
        };
    };
    sidePanel: {
        dashboardProperties: {
            isOpen: boolean;
            mode: string;
        };
        dashboardInitState: DashboardItemInDTO;
    };
    defaultSidepanelWidth: number;
    showDevices: boolean;
    showHierarchy: boolean;
    isSaving: boolean;
    saveOp: any;
    dropArea: {};
    dragCancelled: boolean;
    dragoverWidget: any;
    dragIndicator: DragIndicatorData;
    dragoverAction: DragOverOperation;
    dropped: boolean;
    dropTgtParentId: string;
    selectionMode: import("../components/wgts/SelectionModes/WidgetSelectionMode").WidgetSelectionMode;
    movingWidgetX: number;
    movingWidgetY: number;
    isMovingWidget: boolean;
    lastAddedWidget: BaseWgt;
    newFormulaId: string;
    justSelectedAWidget: boolean;
    hasPasted: boolean;
    copiedWidget: IWidgetSerialization;
    pasteTarget: BaseGraphicWgt;
    flowsPagination: {
        number: number;
        totalElements: number;
        totalPages: number;
        last: boolean;
    };
    dashboardsPagination: {
        number: number;
        totalElements: number;
        totalPages: number;
        last: boolean;
    };
    widgetsPagination: {
        number: number;
        totalElements: number;
        totalPages: number;
        last: boolean;
    };
    dashboardPasswordDialog: {
        resolve: any;
        reject: any;
        active: boolean;
        projectData: any;
        manifest: any;
    };
    dashboardTopbarVisibility: boolean;
    versions: {};
    canSave: boolean;
    confirmSaveDialogOpen: boolean;
    breakpoints: {
        sizes: {
            large: number;
            medium: number;
            small: number;
        };
        currentSize: string;
        mode: BREAKPOINTS_MODE;
    };
    keyboardEvent: {
        lastKeyboardEvent: any;
    };
    controls: {
        viewportSimulator: boolean;
    };
    _customWidgetEnabled: boolean;
    _panelAddCustomWidgetVisible: boolean;
    _panelAddCustomWidgetFile: any;
    _panelAddCustomWidgetUrl: any;
    _panelAddCustomWidgetPostCallback: any;
    _panelQueryBuilder: any;
    _panelQueryBuilderProperties: any;
    _panelTagSimulation: any;
    _panelTagSimulationProperties: any;
    _panelAddVariablesVisible: any;
    _panelAddVariablesId: any;
    lastOrganizationAssetsFetch: any;
    _contextMenuType: any;
    _contextMenuX: any;
    _contextMenuY: any;
    _contextMenuData: any;
    _contextMenuEvents: any;
    fileUpload: {
        current: {
            name: string;
            percentageComplete: number;
            total: number;
            loaded: number;
        };
    };
    gridlayoutTools: boolean;
    directAccess: boolean;
    draggingDeviceSlotType: string;
    _allowDraggingDeviceSlot: boolean;
    _dashboardVisibility: boolean;
    showProperties: boolean;
    sidebarResizeStyle: {};
    saveError: any;
    inEditor: boolean;
    _editorPendingOperations: Array<{
        id: string;
        operation: string;
    }>;
    widgetGallery: import("@/classes/WidgetGallery").WidgetGalleryClass;
    marginHighlighter: {
        visible: boolean;
        marginLeft: number;
        marginRight: number;
        marginTop: number;
        marginBottom: number;
        direction: string;
        children: boolean;
    };
    colors: {
        defaultNullColor: string;
    };
    helpSidePanel: {
        status: "open" | "closed";
        data: any;
    };
    get getHelpSidePanel(): {
        status: "open" | "closed";
        data: any;
    };
    get getDefaultNullColor(): string;
    get loading(): boolean;
    get getAllProjects(): DashboardsMap;
    get getAllFlows(): {
        [id: string]: FlowDTO;
    };
    get getAllCustomWidgets(): DashboardsMap;
    get getDropTgtParentId(): string;
    get getInEditor(): boolean;
    get getGridLayoutTools(): boolean;
    get getProject(): (id: any) => import("../interfaces/dashboard").IDashboardItem;
    get getHasPasted(): boolean;
    get getPasteTarget(): BaseGraphicWgt;
    get getCopiedWidget(): IWidgetSerialization;
    get getJustSelectedAWidget(): boolean;
    get getSelectionMode(): import("../components/wgts/SelectionModes/WidgetSelectionMode").WidgetSelectionMode;
    get getCurProject(): Dashboard;
    get getDashboard(): Dashboard;
    get getDashbboard(): () => Dashboard;
    get getDashboardInitState(): DashboardItemInDTO;
    get getCurrentFlow(): DashboardsFlow;
    get getProjectWidgets(): BaseWgt[];
    get getWidget(): (name: any) => BaseWgt;
    get getWidgetByName(): (name: any) => BaseWgt;
    get getWidgetsByType(): (type: string) => BaseWgt[];
    get getMovingWidget(): BaseGraphicWgt;
    get getIsMovingWidget(): boolean;
    get getMovingWidgetX(): number;
    get getMovingWidgetY(): number;
    get getLastAddedWidget(): BaseWgt;
    get getWidgetById(): (id: any) => BaseWgt;
    get getWidgetValue(): (id: any, prop: any) => any;
    get getAllWidgets(): {};
    get getSelectedWidget(): BaseWgt;
    get getActiveGroup(): GroupWgt;
    get getCurPage(): import("@/corvina-model").PageWgt;
    get getIsResizingSidebar(): boolean;
    get getDropArea(): {};
    get getDragoverIndicator(): DragIndicatorData;
    get getDragoverWidget(): any;
    get getDragoverAction(): DragOverOperation;
    get getShowDevices(): boolean;
    get getDraggingDeviceSlotType(): string;
    get getAllowDragDeviceSlot(): boolean;
    get getShowProperties(): boolean;
    get getShowHierarchy(): boolean;
    get getIsSaving(): boolean;
    get getDragCancelled(): boolean;
    get getDropped(): boolean;
    get getNewFormulaId(): string;
    get getDashboardPasswordDialog(): {
        resolve: any;
        reject: any;
        active: boolean;
        projectData: any;
        manifest: any;
    };
    get getWidgetGallery(): import("@/classes/WidgetGallery").WidgetGalleryClass;
    get getFlowsPagination(): {
        number: number;
        totalElements: number;
        totalPages: number;
        last: boolean;
    };
    get getDashboardsPagination(): {
        number: number;
        totalElements: number;
        totalPages: number;
        last: boolean;
    };
    get getWidgetsPagination(): {
        number: number;
        totalElements: number;
        totalPages: number;
        last: boolean;
    };
    get getDashboardTopBarVisibility(): boolean;
    get getCanSave(): boolean;
    get getConfirmSaveDialogOpen(): boolean;
    get getBreakpoint(): string;
    get getBreakpointSizes(): {
        large: number;
        medium: number;
        small: number;
    };
    get getLastKeyoardEvent(): any;
    get getViewportSimualtorStatus(): boolean;
    get getDefaultSidepanelWidth(): number;
    get getSidebars(): {
        projectSidebar: {
            size: {
                width: number;
            };
        };
    };
    get getBreakpointsMode(): BREAKPOINTS_MODE;
    get isBreakpointsEnabled(): boolean;
    get panelAddCustomWidgetVisible(): boolean;
    get panelAddCustomWidgetFile(): any;
    get customWidgetEnabled(): boolean;
    get panelAddCustomWidgetUrl(): any;
    get panelAddCustomWidgetPostCallback(): any;
    get panelTagSimulation(): any;
    get panelTagSimulationProperties(): any;
    get panelQueryBuilder(): any;
    get panelQueryBuilderProperties(): any;
    get panelAddVariablesVisible(): boolean;
    get panelAddVariablesId(): boolean;
    get contextMenuType(): any;
    get contextMenuOpened(): boolean;
    get contextMenuX(): any;
    get contextMenuY(): any;
    get contextMenuData(): any;
    get contextMenuEvents(): any;
    get fileUploadGetCurrentProgress(): {
        name: string;
        percentageComplete: number;
        total: number;
        loaded: number;
    };
    get dashboardVisibility(): boolean;
    get getDirectAccess(): boolean;
    get getSidePanelDashboardPropertiesIsOpen(): boolean;
    get getSidePanelDashboardPropertiesMode(): string;
    get getPendingOperations(): {
        id: string;
        operation: string;
    }[];
    ADD_PENDING_OPERATION({ id, operation }: {
        id: any;
        operation: any;
    }): void;
    REMOVE_PENDING_OPERATION({ id, operation }: {
        id: any;
        operation: any;
    }): void;
    CLEAR_PENDING_OPERATION(): void;
    INIT_STATE(): void;
    START_LOADING(): void;
    STOP_LOADING(): void;
    CREATE_PROJECT({ strategy, dashboardName, isComposedWgt }: {
        strategy: (dashboard: Dashboard) => void;
        dashboardName: string;
        isComposedWgt?: boolean;
    }): void;
    IN_EDITOR(inEditor: boolean): void;
    LOAD_PROJECT_INIT_STATE(dashboardInitState: DashboardItemInDTO): void;
    RESET_PROJECT_INIT_STATE(): void;
    CONFIRM_SAVE_DIALOG_OPEN(isOpen: any): void;
    SET_CAN_SAVE(canSave: any): void;
    LOAD_PROJECTS(projects: any): void;
    SHARE_DASHBOARD_WITH_USERS({ dashboardId, listUsers }: {
        dashboardId: string;
        listUsers: Array<{
            name: string;
            permission: string;
        }>;
    }): void;
    UNSHARE_DASHBOARD_WITH_USERS({ dashboardId, listUsers }: {
        dashboardId: string;
        listUsers: Array<{
            name: string;
            permission: string;
        }>;
    }): void;
    SHARE_COMPOSED_WIDGET_WITH_USERS({ composedWidgetId, listUsers }: {
        composedWidgetId: string;
        listUsers: Array<{
            name: string;
            permission: string;
        }>;
    }): void;
    UNSHARE_COMPOSED_WIDGET_WITH_USERS({ composedWidgetId, listUsers }: {
        composedWidgetId: string;
        listUsers: Array<{
            name: string;
            permission: string;
        }>;
    }): void;
    ADD_PROJECT(project: any): void;
    ADD_FLOW(flow: any): void;
    ADD_COMPOSED_WIDGET(widget: any): void;
    ADD_WIDGET_GALLERY(widget: any): void;
    REMOVE_WIDGET_GALLERY(id: string): void;
    CLEAR_WIDGETS_GALLERY(): void;
    SET_HELP_SIDEPANEL({ status, data }: {
        status: "open" | "closed";
        data: any;
    }): void;
    toggleHelpSidePanel({ data }: {
        data: any;
    }): void;
    switchWidgetImpl({ wgtToRemove, wgtToAdd, record, }: {
        wgtToRemove: BaseGraphicWgt;
        wgtToAdd: {
            type: string;
            version: string;
            parentId: string;
            layout: Layout;
            initState: IWidgetSerialization;
            confLayout?: ConfigurationLayout;
        };
        record: boolean;
    }): void;
    SHARE_FLOW_WITH_USERS({ flowId, listUsers }: {
        flowId: string;
        listUsers: Array<{
            name: string;
            permission: string;
        }>;
    }): void;
    UNSHARE_FLOW_WITH_USERS({ flowId, listUsers }: {
        flowId: string;
        listUsers: Array<{
            name: string;
            permission: string;
        }>;
    }): void;
    RESET_PROJECTS(): void;
    RESET_FLOWS(): void;
    RESET_WIDGETS(): void;
    REMOVE_PROJECT(projectId: any): void;
    REMOVE_FLOW(flowId: any): void;
    REMOVE_COMPOSED_WIDGET(containerWidgetId: any): void;
    SET_CURRENT_PROJECT(project: any): void;
    SET_CURRENT_FLOW(flow: any): void;
    SET_CURRENT_PAGE(page: any): void;
    MOVE_WIDGET({ wgtId, x, y, record }: {
        wgtId: any;
        x: any;
        y: any;
        record: any;
    }): void;
    ADD_WIDGETS(widgetsArgs: any): void;
    REORDER_SIBLING_WIDGETS({ parentId, newPartialOrder }: {
        parentId: any;
        newPartialOrder: any;
    }): void;
    ADD_WIDGET({ type, version, parentId, layout, position, initState, record, subscribeTags, confLayout, forceId, forceName, }: {
        type: string;
        version?: string;
        parentId: string;
        layout?: any;
        position?: any;
        initState?: any;
        record?: boolean;
        subscribeTags?: boolean;
        confLayout?: ConfigurationLayout;
        forceId?: string;
        forceName?: string;
    }): void;
    ADD_PLACEHOLDER({ parentId, confLayout }: {
        parentId: any;
        confLayout: any;
    }): void;
    SET_MOVING_WIDGET(widget: any): void;
    MOVE_WIDGET_THROUGH_LAYOUT({ x, y }: {
        x: number;
        y: number;
    }): void;
    ADD_XFORM({ widgetId, datalinkId, initState, record }: {
        widgetId: any;
        datalinkId: any;
        initState: any;
        record: any;
    }): void;
    DISCONNECT_TAG_MANAGER(): void;
    UNDO(): void;
    REDO(): void;
    REMOVE_WIDGET({ widgetId, record }: {
        widgetId: string;
        record?: boolean;
    }): void;
    SET_WIDGET_VALUE({ wgtId, prop, value, record }: {
        wgtId: any;
        prop: any;
        value: any;
        record: any;
    }): void;
    SET_WIDGET_VALUES({ wgtId, keyvalues }: {
        wgtId: any;
        keyvalues: any;
    }): void;
    SET_PROJECT_VALUE({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    SET_GRID_LAYOUT_TOOLS(value: any): void;
    ADD_DATALINK({ args, record }: {
        args: {
            inputArgs: any;
            result: DataLink;
        };
        record?: boolean;
    }): void;
    SET_ROWS_GLOBAL({ grRows, groupWgt, record, breakpoint }: {
        grRows: any;
        groupWgt: any;
        record: any;
        breakpoint: any;
    }): void;
    SET_COLUMNS_GLOBAL({ grCols, groupWgt, record, breakpoint }: {
        grCols: any;
        groupWgt: any;
        record: any;
        breakpoint: any;
    }): void;
    ADD_TAG(tagName: string): void;
    REMOVE_TAG(tagName: string): void;
    UPDATE_DEFAULT_LANGUAGE(lang: string): void;
    SET_TEXT_LANGUAGE_AFTER_UNDO_REDO_ACTION(keyValueInput: any): void;
    SET_TEXT_LANGUAGE({ wgtId, prop, value }: {
        wgtId: any;
        prop: any;
        value: any;
    }): void;
    UPDATE_ORDER_ARRAY_TEXT_LANGUAGE({ wgtId, prop, value }: {
        wgtId: any;
        prop: any;
        value: any;
    }): void;
    UPDATE_VAR_LIST_OPTIONS_TEXT_LANGUAGE({ wgtId, prop, newValue, oldValue }: {
        wgtId: any;
        prop: any;
        newValue: any;
        oldValue: any;
    }): void;
    REMOVE_ALL_KEY_WIDGET_TEXT_LANGUAGE(wgtId: any): void;
    UPDATE_VARIABLE({ wgtId, prop, value }: {
        wgtId: any;
        prop: any;
        value: any;
    }): void;
    REMOVE_DATALINK({ datalink, widgetId, record }: {
        datalink: any;
        widgetId: any;
        record: any;
    }): void;
    SELECT_WIDGET(wgtId: any): void;
    SET_JUST_SELECTED_A_WIDGET(wasSelected: any): void;
    SET_LAYOUT_PROP({ wgtId, prop, value, size, record }: {
        wgtId: any;
        prop: any;
        value: any;
        size: any;
        record: any;
    }): void;
    CLEAR_SELECTED_WGT(): void;
    SET_ACTIVE_GROUP(groupWgt: any): void;
    COPY(): void;
    SET_HAS_PASTED(hasPasted: any): void;
    SET_PASTE_TARGET(pasteTarget: any): void;
    PASTE(): void;
    SET_ACTIVE_GROUP_BY_ID(groupId: any): void;
    SET_MAIN_GROUP_AS_ACTIVE(): void;
    SET_RESIZING_SIDEBAR(isResizing: any): void;
    SET_SIDEBAR_RESIZE_STYLE(style: any): void;
    SET_GROUP_VISIBLE({ groupId, isVisible }: {
        groupId: any;
        isVisible: any;
    }): void;
    SET_IS_SAVING(isSaving: any): void;
    SET_SAVE_ERROR(error: any): void;
    SET_SAVE_OP(saveOp: any): void;
    FLUSH_SAVE_OP(): void;
    CANCEL_SAVE_OP(): void;
    TOGGLE_SHOW_DEVICES(): void;
    SET_SHOW_DEVICES(show: any): void;
    RESET_SIDE_PANEL_DH(): void;
    SET_DRAGGING_DEVICE_SLOT_TYPE(model: string): void;
    ALLOW_DRAGGING_DEVICE_SLOT(value: any): void;
    SET_SHOW_HIERARCHY(show: any): void;
    TOGGLE_SHOW_SIDEPANEL_DH(tab: string): void;
    SHOW_SIDEPANEL_DH({ tab, show }: {
        tab: string;
        show: boolean;
    }): void;
    SET_DRAGOVER_INDICATOR(dragIndicatorData: DragIndicatorData): void;
    SET_DRAGOVER_WIDGET(wgt: any): void;
    SET_DRAGOVER_ACTION(operation: DragOverOperation): void;
    SET_DROP_AREA(wgt: any): void;
    SET_DROP_TGT_PARENT_ID(id: any): void;
    SET_DRAG_CANCELLED(cancelled: any): void;
    SET_SELECTION_MODE(mode: any): void;
    SELECTION_MODE_CLEAR_HIGHLIGHT(): void;
    SET_DROPPED(dropped: any): void;
    SET_VALUE({ value, newValue }: {
        value: any;
        newValue: any;
    }): void;
    SET_NEW_FORMULA_ID(formulaId: any): void;
    SET_DASHBOARDS_PAGINATION(dashboardsPagination: any): void;
    SET_WIDGETS_PAGINATION(widgetsPagination: any): void;
    SET_FLOWS_PAGINATION(flowsPagination: any): void;
    RESET_FLOWS_PAGINATION(): void;
    RESET_DASHBOARDS_PAGINATION(): void;
    RESET_WIDGETS_PAGINATION(): void;
    SHOW_DASHBOARD_PASSWORD_DIALOG({ resolve, reject, manifest }: {
        resolve: any;
        reject: any;
        manifest: any;
    }): void;
    HIDE_DASHBOARD_PASSWORD_DIALOG(): void;
    DO_MOUSE_DOWN({ id, event }: {
        id: any;
        event: any;
    }): void;
    DO_MOUSE_UP({ id, event }: {
        id: any;
        event: any;
    }): void;
    DO_MOUSE_CLICK({ id, event }: {
        id: any;
        event: any;
    }): void;
    ADD_EVENT({ eventName, wgtId, record }: {
        eventName: any;
        wgtId: any;
        record: any;
    }): void;
    ADD_ACTION({ eventName, parentId, record }: {
        eventName: any;
        parentId: any;
        record: any;
    }): void;
    REMOVE_ACTION({ eventName, actionWgtId, parentId, record }: {
        eventName: any;
        actionWgtId: any;
        parentId: any;
        record: any;
    }): void;
    DASHBOARD_TOPBAR_VISIBILITY(newVisibility: any): void;
    UPDATE_CURRENT_BREAKPOINT(viewportSize: number): void;
    SET_BREAKPOINT_SIZE({ breakpoint, size }: {
        breakpoint: any;
        size: any;
    }): void;
    TOGGLE_WIDGET_LAYOUT_VISIBILITY({ widgetId, record }: {
        widgetId: any;
        record: any;
    }): void;
    HIDE_WIDGET_IN_LAYOUT({ widgetId, record }: {
        widgetId: any;
        record: any;
    }): void;
    SHOW_WIDGET_IN_LAYOUT({ widgetId, record }: {
        widgetId: any;
        record: any;
    }): void;
    EVENT_KEYBOARD(event: any): void;
    SET_VIEWPORT_SIM_STATUS(status: any): void;
    SET_GRID_PROPERTY({ groupId, element, prop, value, breakpoint }: {
        groupId: any;
        element: any;
        prop: any;
        value: any;
        breakpoint: any;
    }): void;
    SET_BREAKPOINTS_MODE({ mode }: {
        mode: any;
    }): void;
    SET_CUSTOM_WIDGET_STATUS(status: any): void;
    SHOW_CUSTOM_WIDGET_MODAL({ visible, file, url, post }: {
        visible: any;
        file: any;
        url: any;
        post: any;
    }): void;
    SHOW_ADD_VARIABLES_MODAL({ visible, id }: {
        visible: any;
        id: any;
    }): void;
    SHOW_QUERY_BUILDER_MODAL({ visible, query }: {
        visible: any;
        query: any;
    }): void;
    SHOW_TAG_SIM_MODAL({ visible, tagInfo }: {
        visible: any;
        tagInfo: any;
    }): void;
    SAVE_TAG_SIMULATION(info: any): void;
    SHOW_CONTEXT_MENU(value: any): void;
    CONTEXT_MENU_X(value: any): void;
    CONTEXT_MENU_Y(value: any): void;
    CONTEXT_MENU_DATA(value: any): void;
    CONTEXT_MENU_EVENTS(value: any): void;
    FILEUPLOAD_SET_CURRENT_PROGRESS(value: any): void;
    SET_SIDEBAR_SIZE(sidebar: {
        id: string;
        options: {
            size: {
                width: number;
            };
        };
    }): void;
    SET_DIRECT_ACCESS(value: any): void;
    SET_SIDE_PANEL_DASHBOARD_PROPERTIES_STATUS({ value, mode }: {
        value: any;
        mode: any;
    }): void;
    UPDATE_PROJECT_IN_LIST(project: Dashboard | DashboardItemInDTO): void;
    SET_LAST_ORGANIZATION_ASSETS_FETCH(lastOrganizationAssetsFetch: any): void;
    ADD_FLOW_DEVICESLOT_ARRAY(deviceSlots: any): void;
    CLEAR_FLOW_DEVICESLOT_ARRAY({ flowId }: {
        flowId: any;
    }): void;
    SET_DEFAULT_SIDEPANEL_WIDTH(width: any): void;
    SET_DASHBOARD_VISIBILITY({ visible }: {
        visible: any;
    }): void;
    setDropped(dropped: any): void;
    setDropTgtParentId(id: any): void;
    setDragCancelled(cancelled: any): void;
    setSelectionMode(mode: any): void;
    clearHighlightSelector(): void;
    resetFlowPagination(): void;
    resetWidgetPagination(): void;
    resetDashboardPagination(): void;
    initState(): Promise<void>;
    setInEditor(inEditor: any): void;
    setMovingWidget(widget: any): void;
    moveWidgetThroughLayout({ x, y }: {
        x: number;
        y: number;
    }): void;
    setGroupVisible({ groupId, isVisible }: {
        groupId: any;
        isVisible: any;
    }): void;
    setIsSaving(): void;
    loadDashboard(name: string): Promise<void>;
    fetchProjectJson({ id, version }: {
        id: string;
        version?: string;
    }): Promise<any>;
    fetchAssetsJson({ dashboard }: {
        dashboard: DashboardOutDTO;
    }): Promise<any>;
    fetchProject(dashboardId: any): Promise<any>;
    getCustomWidgetDetail(dashboardId: any): Promise<any>;
    fetchProjectVersion({ id, version }: {
        id: string;
        version: string;
    }): Promise<any>;
    fetchProjectsByName(dashboardName: any): Promise<DashboardsInDTO>;
    clearGalleryAssets(): Promise<void>;
    loadGalleryAssets(): Promise<void>;
    loadProject({ dashboardId, deviceSlots, version, variables, clock, }: {
        dashboardId: string;
        deviceSlots: {
            [name: string]: string;
        };
        version?: string;
        variables?: {
            [name: string]: any;
        };
        clock?: ClockConfiguration;
    }): Promise<boolean>;
    isLanguageManagerPresent(initState: any): Promise<boolean>;
    confirmPendingOperations(): Promise<boolean>;
    loadFlow({ flowId }: {
        flowId: any;
    }): Promise<any>;
    reloadProject({ deviceSlots }: {
        deviceSlots: any;
    }): Promise<void>;
    addFlowDeviceSlots({ deviceSlots }: {
        deviceSlots: any;
    }): Promise<void>;
    clearFlowDeviceSlots({ flowId }: {
        flowId: any;
    }): Promise<void>;
    refreshPage(): void;
    makeVersionCurrent({ dashboardId, version }: {
        dashboardId: any;
        version: any;
    }): Promise<void>;
    createProject({ strategy, isComposedWgt }: {
        strategy: any;
        isComposedWgt: any;
    }): Promise<void>;
    importProject(args: {
        data: string;
        type: DashboardType;
    }): Promise<void>;
    confirmSave(confirm: any): void;
    saveProject(project?: Dashboard | DashboardItemInDTO): void;
    exportDashboardDatasourceData({ id, version }: {
        id: string;
        version?: string;
    }): Promise<string>;
    exportProject({ id, version, name }: {
        id: string;
        version?: string;
        name: string;
    }): Promise<ExportedDashboard>;
    fetchAllDashboards(options: any): Promise<DashboardsInDTO>;
    loadProjects(options?: any): Promise<void>;
    resetFlow(): void;
    resetWidget(): void;
    resetProject(): void;
    createFlow(flowToCreate: any): Promise<void>;
    updateFlow(flowToUpdate: any): Promise<void>;
    fetchWidgets(optionsIn: any): Promise<DashboardItemInDTO[]>;
    fetchFlows(optionsIn: any): Promise<DashboardItemInDTO[]>;
    fetchDashboards(optionsIn: FetchDashboardParams): Promise<DashboardItemInDTO[]>;
    fetchWidgetsGallery({ fetch, gallery }: {
        fetch: any;
        gallery: any;
    }): Promise<DashboardsMap>;
    fetchDashboardsFlowMenu(optionsIn: FetchDashboardParams): Promise<DashboardsInDTO>;
    removeProject({ projectId }: {
        projectId: any;
    }): Promise<void>;
    removeComposedWidget({ containerWidgetId }: {
        containerWidgetId: any;
    }): Promise<void>;
    addStubDatasetWidget({ type, parentId, layout, position, record, confLayout, save, initState }: {
        type: any;
        parentId: any;
        layout: any;
        position: any;
        record: any;
        confLayout: any;
        save: any;
        initState: any;
    }): void;
    removeFlow({ flowId }: {
        flowId: any;
    }): Promise<void>;
    shareDashboardWithUsers({ dashboardId, listUsers }: {
        dashboardId: string;
        listUsers: Array<{
            name: string;
            permission: string;
        }>;
    }): Promise<void>;
    unshareDashboardWithUsers({ dashboardId, listUsers }: {
        dashboardId: string;
        listUsers: Array<{
            name: string;
            permission: string;
        }>;
    }): Promise<void>;
    shareComposedWidgetWithUsers({ composedWidgetId, listUsers }: {
        composedWidgetId: string;
        listUsers: Array<{
            name: string;
            permission: string;
        }>;
    }): Promise<void>;
    unshareComposedWidgetWithUsers({ composedWidgetId, listUsers }: {
        composedWidgetId: string;
        listUsers: Array<{
            name: string;
            permission: string;
        }>;
    }): Promise<void>;
    shareFlowWithUsers({ flowId, listUsers }: {
        flowId: string;
        listUsers: Array<{
            name: string;
            permission: string;
        }>;
    }): Promise<void>;
    unshareFlowWithUsers({ flowId, listUsers }: {
        flowId: string;
        listUsers: Array<{
            name: string;
            permission: string;
        }>;
    }): Promise<void>;
    fetchDashboardCurrentVersions(): Promise<ResponseDashboardVersions>;
    fetchDashboardVersions(id: string): Promise<ResponseDashboardVersions>;
    getDashboardVersion({ version, dashboardId }: {
        version: any;
        dashboardId: any;
    }): Promise<unknown>;
    deleteDashboardVersion({ dashboardId, version }: {
        dashboardId: any;
        version: any;
    }): Promise<void>;
    createDerivedDashboardVersion({ dashboardId, oldVersion, newVersion }: {
        dashboardId: any;
        oldVersion: any;
        newVersion: any;
    }): Promise<void>;
    createDashboardVersion({ dashboardId, name }: {
        dashboardId?: string;
        name: string;
    }): Promise<void>;
    setCurrentProject(project: any): void;
    setCurrentFlow(flow: any): void;
    loadDashboardViewer({ dashboardId, deviceSlots, version, variables, clock, }: {
        dashboardId: string;
        deviceSlots?: {
            [name: string]: string;
        };
        version?: string;
        variables?: {
            [name: string]: any;
        };
        clock?: ClockConfiguration;
    }): Promise<void>;
    loadDashboardEditor({ dashboardId, version }: {
        dashboardId: any;
        version: any;
    }): Promise<boolean>;
    loadDashboardSidePanel({ dashboardId, version }: {
        dashboardId: any;
        version: any;
    }): Promise<void>;
    setDraggingDeviceSlotType(model: string): void;
    allowDraggingDeviceSlot(value: boolean): void;
    resetSidepanelDh(): void;
    disconnectTagManager(): void;
    moveWidget({ wgtId, x, y, record }: {
        wgtId: string;
        x: number;
        y: number;
        record?: boolean;
    }): void;
    moveWidgetInGrid({ source, target, record }: {
        source: any;
        target: any;
        record: any;
    }): void;
    endMovingWidget(): void;
    undo(): void;
    redo(): void;
    addWidgets(widgetsArgs: any): void;
    reorderSiblingWidgets({ parentId, newPartialOrder }: {
        parentId: string;
        newPartialOrder: string[];
    }): void;
    addMeshWidget({ parentWgt, mesh, initState }: {
        parentWgt: BaseWgt;
        mesh: THREE.Object3D;
        initState: any;
    }): MeshTransformWgt;
    addWidget({ type, version, parentId, layout, position, record, confLayout, save, composedWidget, name, initState }: {
        type: string;
        version?: string;
        parentId: string;
        layout?: any;
        position?: any;
        record?: boolean;
        confLayout?: any;
        save?: boolean;
        composedWidget?: any;
        name?: string;
        initState?: any;
    }): void;
    removeWidget({ widgetId, record }: {
        widgetId: string;
        record?: boolean;
    }): void;
    toggleWidgetLayoutVisibility({ widgetId, record }: {
        widgetId: any;
        record: any;
    }): void;
    showWidgetInLayout({ widgetId, record }: {
        widgetId: any;
        record: any;
    }): void;
    hideWidgetInLayout({ widgetId, record }: {
        widgetId: any;
        record: any;
    }): void;
    switchWidgets({ tgt, type, version, allLayouts, state, record, save }: {
        tgt: BaseGraphicWgt;
        type: string;
        version?: string;
        allLayouts: boolean;
        state?: any;
        record?: boolean;
        save?: boolean;
    }): void;
    addXForm({ widgetId, datalinkId, initState, record, doNotSave }: {
        widgetId: string;
        datalinkId: string;
        initState: any;
        record: boolean;
        doNotSave?: boolean;
    }): void;
    setCurrentPage(page: any): void;
    addPlaceholderWgt({ parentId, confLayout }: {
        parentId: any;
        confLayout: any;
    }): void;
    errorMessageNameDuplicates(wgtName: string): void;
    setWidgetValue({ wgtId, prop, value, record, save }: {
        wgtId: string;
        prop: string;
        value: any;
        record?: boolean;
        save?: boolean;
    }): void;
    setWidgetValues({ wgtId, keyvalues }: {
        wgtId: any;
        keyvalues: any;
    }): void;
    setProjectValue({ prop, value, record }: {
        prop: string;
        value: any;
        record: boolean;
    }): void;
    addDatalink({ dl, record, save }: {
        dl: IAddDataLinkArgs;
        record: boolean;
        save?: boolean;
    }): DataLink;
    addTag(tagName: string): void;
    removeTag(tagName: string): void;
    removeDatalink({ datalink, widgetId, record }: {
        datalink: any;
        widgetId: any;
        record: any;
    }): void;
    setRowsGlobal({ grRows, groupWgt, record, breakpoint }: {
        grRows: any;
        groupWgt: any;
        record: any;
        breakpoint: any;
    }): void;
    setColumnsGlobal({ grCols, groupWgt, record, breakpoint }: {
        grCols: any;
        groupWgt: any;
        record: any;
        breakpoint: any;
    }): void;
    selectWidget(wgtId: any): void;
    setJustSelectedAWidget(wasSelected: any): void;
    setLayoutProp({ wgtId, prop, value, size, record }: {
        wgtId: any;
        prop: any;
        value: any;
        size: any;
        record: any;
    }): void;
    setGridProperty({ groupId, element, prop, value, breakpoint }: {
        groupId: any;
        element: any;
        prop: any;
        value: any;
        breakpoint: any;
    }): void;
    copy(): void;
    setHasPasted(hasPasted: any): void;
    setPasteTarget(pasteTarget: any): void;
    updateGlobalLanguage(pasteTarget: any): void;
    updateTextLanguageAfterUndoRedoAction(keyValueInput: any): void;
    addTextLanguage({ wgtId, prop, value }: {
        wgtId: any;
        prop: any;
        value: any;
    }): void;
    updateOrderArrayTextLanguage({ wgtId, prop, value }: {
        wgtId: any;
        prop: any;
        value: any;
    }): void;
    updateVarListOptionsTextLanguage({ wgtId, prop, newValue, oldValue }: {
        wgtId: any;
        prop: any;
        newValue: any;
        oldValue: any;
    }): void;
    removeAllKeysWidgetTextLanguage(wgtId: any): void;
    updateVariable({ wgtId, prop, value }: {
        wgtId: any;
        prop: any;
        value: any;
    }): void;
    paste(): void;
    removePlaceholders(parentId: any): void;
    clearSelectedWgt(): void;
    setActiveGroup(group: any): void;
    setActiveGroupById(groupId: any): void;
    setMainGroupAsActive(): void;
    setResizingSidebar(isResizing: any): void;
    toggleShowDevices(): void;
    toggleShowSidePanelDH(tab: any): void;
    showSidePanelDH({ tab, show }: {
        tab: string;
        show: boolean;
    }): void;
    setShowDevices(show: any): void;
    setDropArea(wgt: any): void;
    setDragoverIndicator(data: DragIndicatorData): void;
    setDragoverWidget(wgt: any): void;
    setDragoverAction(action: any): void;
    setValue({ value, newValue }: {
        value: any;
        newValue: any;
    }): void;
    setNewFormulaId(formulaId: any): void;
    updateFormula(args: IUpdateFormulaParams): Promise<{
        errors?: Error[];
    }> | {
        errors?: Error[];
    };
    setMyDashboardPagination(dashboardsPagination: any): void;
    checkPassword(manifest: DashboardManifest): Promise<boolean>;
    doMouseDown({ id, event }: {
        id: any;
        event: any;
    }): void;
    doMouseUp({ id, event }: {
        id: any;
        event: any;
    }): void;
    doMouseClick({ id, event }: {
        id: any;
        event: any;
    }): void;
    addEvent({ eventName, wgtId, record }: {
        eventName: any;
        wgtId: any;
        record: any;
    }): void;
    addAction({ eventName, actionType, parentId, record }: {
        eventName: any;
        actionType: any;
        parentId: any;
        record: any;
    }): void;
    removeAction({ eventName, actionWgtId, parentId, record }: {
        eventName: any;
        actionWgtId: any;
        parentId: any;
        record: any;
    }): void;
    setDashboardTopBarVisibility(newVisibility: any): void;
    updateBreakpoint(width: any): void;
    setBreakpointSize({ breakpoint, size }: {
        breakpoint: any;
        size: any;
    }): void;
    setBreakpointsMode({ mode }: {
        mode: any;
    }): void;
    sendKeyboard(event: any): void;
    viewportSimulatorStatus(status: any): void;
    enableCustomWidget(status: any): void;
    /**
     * Add an asset to a widget (specific function for widget assets)
     */
    addWidgetAsset({ assetName, data, widgetId, property, save }: {
        assetName: string;
        data: any;
        widgetId: string;
        property: string;
        save?: boolean;
    }): Promise<boolean>;
    /**
     * Add an asset to a widget (specific function for background image asset)
     */
    addImageBackgroundAsset({ assetName, data, dashboardId }: {
        assetName: string;
        data: any;
        dashboardId: string;
    }): Promise<boolean>;
    /**
     * Add an asset to a widget (specific function for background image asset)
     */
    getImageBackgroundAsset({ assetName, dashboardId }: {
        assetName: string;
        dashboardId: string;
    }): Promise<{
        url: string;
        data: any;
        decoded: string;
    }>;
    downloadFile({ name, data }: {
        name: string;
        data: any;
    }): void;
    /**
     * Add an asset to a dashboard (general function for all type of assets)
     */
    addAsset({ assetName, data }: {
        assetName: string;
        data: any;
    }): Promise<boolean>;
    /**
     * Immediately store the promise to avoid multiple fetches of the same asset
     */
    fetchAsset({ assetName, dashboardId }: {
        assetName: string;
        dashboardId: string;
    }): Promise<void>;
    /**
     * Retrive asset data and assign it to a dashboard. (general function for all assets)
     */
    fetchAssetImpl({ assetName, dashboardId }: {
        assetName: string;
        dashboardId: string;
    }): Promise<any>;
    /**
     * Retrive asset URL and assign it to a dashboard.
     */
    fetchAssetUrl({ assetName, dashboardId }: {
        assetName: string;
        dashboardId: string;
    }): Promise<string>;
    configureAddVariablesModal({ visible, id }: {
        visible: boolean;
        id?: string;
    }): void;
    configureCustomWidgetModal({ visible, file, url, post }: {
        visible: any;
        file: any;
        url: any;
        post: any;
    }): void;
    resetCustomWidgetModal(): void;
    configureTagSimulationModal({ visible, tagInfo }: {
        visible: any;
        tagInfo: any;
    }): void;
    resetTagSimulationModal(): void;
    saveTagSimulation(info: any): void;
    showMenuAddWidget(description: {
        position: {
            x: number;
            y: number;
        };
        data: {
            target: any;
            parent?: any;
            modules: WidgetModule[];
            tag?: DragTreePropertyEvent;
            itemPosition?: number;
        };
        events?: any;
    }): void;
    showMenuSelectComposedWidgetVersion(description: {
        position: {
            x: number;
            y: number;
        };
        data: {
            target?: any;
            event: Event;
        };
        events: any;
    }): void;
    showMenuGalleryWidget(description: {
        position: {
            x: number;
            y: number;
        };
        data: {
            widget: string;
        };
        events?: any;
    }): void;
    showMenuPurchaseGalleryWidget(description: {
        position: {
            x: number;
            y: number;
        };
        data: {
            widget: string;
        };
        events?: any;
    }): void;
    hideContextMenu(): void;
    enableGridLayoutTools(value: boolean): void;
    addDataLinkToTagMgr(params: {
        widgetID: string;
        property: string;
        tagName: string;
        linkToModel?: boolean;
        save?: boolean;
        tagIndex?: number;
        xForm?: IXFormSerialization;
    }): void;
    addDataLinkToWidget(params: {
        widgetID: string;
        property: string;
        sourceID: string;
        sourceProperty: string;
        linkToModel?: boolean;
        tagIndex?: number;
        xForm?: IXFormSerialization;
    }): void;
    createDefaultDataLinks(params: {
        widget: any;
        source: any;
    }): Promise<void>;
    fetchUserPreferences({ username }: {
        username: any;
    }): Promise<import("../communication/axios/implementation/DashboardAxiosInstance").UserPreferenceDashboardsDTO>;
    addDashboardToUserPreferences({ username, dashboardId }: {
        username: any;
        dashboardId: any;
    }): Promise<any>;
    deleteDashboardFromUserPreferences({ dashbordUserpreferenceId }: {
        dashbordUserpreferenceId: any;
    }): Promise<any>;
    fileUploadSetProgress(progressData: ProgressData): void;
    fileUploadResetProgress(): void;
    setSideBarSize(sidebar: {
        id: string;
        options: {
            size: {
                width: number;
            };
        };
    }): void;
    createEmptyFormula(state: {
        wgt: BaseWgt;
        propName: string;
        mode?: XFORMULA_MODE;
    }): Promise<void>;
    setActiveTab(id: number): void;
    setDirectAccess(state: any): void;
    setSidePanelDashboardProperties({ value, mode }: {
        value: any;
        mode: any;
    }): void;
    switchWidgetsOnGridLayout({ tgt, type, version, allLayouts, state, record, save }: {
        tgt: BaseGraphicWgt;
        type: string;
        version?: string;
        allLayouts: boolean;
        state?: any;
        record?: boolean;
        save?: boolean;
    }): void;
    switchWidgetsOnFreeGridLayout({ tgt, type, version, allLayouts, state, composedWidgetContent, record, save }: {
        tgt: BaseGraphicWgt;
        type: string;
        version?: string;
        allLayouts: boolean;
        state?: any;
        composedWidgetContent?: IWidgetSerialization;
        record?: boolean;
        save?: boolean;
    }): void;
    connectPropertiesToWidget({ properties, targetWidget, sourceID, propName, tagIndex }: {
        properties: string[];
        targetWidget: BaseGraphicWgt;
        sourceID: string;
        propName: string;
        tagIndex?: number;
    }): void;
    connectPropertiesToTagMgr({ properties, widget, tagName, tagIndex, linkToModel }: {
        properties: string[];
        widget: BaseWgt;
        tagName: string;
        tagIndex?: number;
        linkToModel?: boolean;
    }): void;
    setMarginHighlighter(props: IMarginHighlighter): void;
    SET_MARGIN_HIGHLIGHTER({ prop, value }: {
        prop: string;
        value: number | string | boolean;
    }): void;
    disableMarginHighlighter(): void;
    get marginHighlighterVisible(): boolean;
    get marginHighlighterMarginTop(): number;
    get marginHighlighterMarginRight(): number;
    get marginHighlighterMarginBottom(): number;
    get marginHighlighterMarginLeft(): number;
    get marginHighlighterDirection(): string;
    get marginHighlighterChildren(): boolean;
}
export declare function getComposedWidgetRoot(initState: IDashboardSerialization | Dashboard): IWidgetSerialization;
