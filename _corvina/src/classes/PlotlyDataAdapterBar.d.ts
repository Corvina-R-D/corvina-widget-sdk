import DataAdapter from "./DataAdapter";
import { IChartData } from "@/interfaces/plotly";
import { BaseObject } from "src/interfaces/Widgets";
export default class PlotlyDataAdapterBar<DataSerie extends BaseObject> extends DataAdapter<DataSerie, IChartData> {
    protected fillChartData(source: DataSerie, targetData: IChartData, style?: any): void;
    protected getDataTemplate(): IChartData;
    private extractStyle;
}
