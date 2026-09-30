export interface AbstractSimulator {
    loop(): any;
}
export declare class BaseSimulator implements AbstractSimulator {
    protected tag: any;
    static intervalID: any;
    /*! dependees: exiting dependency edges in dep graph */
    depsOut: Map<string, BaseSimulator>;
    value: any;
    lastSentValue: any;
    static simulators: BaseSimulator[];
    static simulatorsByTagName: Map<string, BaseSimulator>;
    static inited: boolean;
    static sorted: boolean;
    static filterDuplications: boolean;
    static simulationMs: number;
    static defaultSimulationMs: number;
    constructor(tag: string);
    /*! Getter function to access cached value from other simulators by tag name */
    static $: (source: BaseSimulator, tagName: string) => any;
    loop(): void;
    stopTagSimulation(tagName: any): void;
}
