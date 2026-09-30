export declare abstract class StatefulOperator {
    state: any;
    abstract execute(args: any): any;
}
export declare class FactoryOperators {
    list: string[];
    operators: Map<string, any>;
    registry(name: string, classOperator: any): void;
    instantiate(name: string, args: any): StatefulOperator | null;
}
declare const StatefulOperators: FactoryOperators;
export default StatefulOperators;
