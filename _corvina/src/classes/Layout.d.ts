import { LayoutConfig } from "@/corvina-model";
export default class Layout {
    [size: string]: LayoutConfig;
    constructor(layout?: Layout, generateMissingConf?: boolean);
    static serialize(layout: Layout): any;
}
