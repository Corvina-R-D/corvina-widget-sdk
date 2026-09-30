export interface ILayoutConfig {
    rOcc: any;
    cOcc: any;
    rSpan: any;
    cSpan: any;
    maxWidth?: any;
    maxHeight?: any;
    hItemUF?: any;
    vItemUF?: any;
    tMargin?: any;
    bMargin?: any;
    lMargin?: any;
    rMargin?: any;
    aR?: any;
    preserveAR?: any;
}
export default class LayoutConfig implements ILayoutConfig {
    rOcc: any;
    cOcc: any;
    rSpan: any;
    cSpan: any;
    maxWidth?: any;
    maxHeight?: any;
    hItemUF?: any;
    vItemUF?: any;
    tMargin?: any;
    bMargin?: any;
    lMargin?: any;
    rMargin?: any;
    aR?: any;
    preserveAR?: any;
    constructor(props?: ILayoutConfig);
    serialize(): {};
}
