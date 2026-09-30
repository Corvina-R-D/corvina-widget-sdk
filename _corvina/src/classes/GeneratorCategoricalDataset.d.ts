import CategoricalDatasetWgt from "./CategoricalDataset";
export declare enum CategoricalDatasetType {
    STANDARD = 0,
    GENERATOR = 1,
    GENERATED = 2
}
export default class GeneratorCategoricalDatasetWgt {
    private dataset;
    private generatedDatasetsSet;
    constructor(dataset: CategoricalDatasetWgt);
    getID(datasetId: string, label: string): string;
    static isDatasetGeneratedBy(datasetId: string, generatorName: string): boolean;
    getDatasetGenerator(): import("./BaseWgt").default;
    getCategoricalDatasetType(): CategoricalDatasetType;
    isDatasetGenerated(): boolean;
    getLabel(label: string): string;
    removeDatasets(): void;
    generateDatasets(): boolean;
}
