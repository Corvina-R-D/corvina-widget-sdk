import DataAdapter from "./DataAdapter";
import { IChartData } from "@/interfaces/plotly";
import { BaseObject } from "src/interfaces/Widgets";
export default class PlotlyDataAdapter<DataSerie extends BaseObject> extends DataAdapter<DataSerie, IChartData> {
    protected fillChartData(series: DataSerie, data: IChartData, style?: any): void;
    protected getDataTemplate(): IChartData;
    private isGLCompatible;
    private extractStyle;
}
