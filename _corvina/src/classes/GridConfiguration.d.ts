import { Row, Column, Grid } from "@/corvina-model";
export default class GridConfiguration {
    gr: Grid;
    rowsProps: Row[];
    colsProps: Column[];
    grGStkWidth: number;
    grGStkColor: string;
    constructor(size: any, conf?: any);
}
