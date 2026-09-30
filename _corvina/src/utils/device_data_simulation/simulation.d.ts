import { SimulationDesc } from "./interfaces";
import { BaseSimulator } from "./BaseSimulator";
export declare class DataSimulator extends BaseSimulator {
    private callback;
    private type;
    private defAmplitude;
    private defPhase;
    private defPeriod;
    private desc;
    constructor(tag: string, type: string, callback: (tagName: string, value: number, ts: number) => Promise<boolean>, desc: SimulationDesc);
    applyNoise(v: number, min?: number, max?: number): number;
    nullify(v: any, callback?: (nullifyingPrev: boolean, nullifyingCurrent: boolean) => void): any;
    simulateRandom(type: string, ts: number, defPeriod: number, defAmplitude: number, defPhase: number): string | number | boolean | string[] | number[] | boolean[];
    castValue(type: string, value: any): string | number | boolean | any[];
    loop(): Promise<void>;
    setDescription(desc: any): void;
    static clear(): void;
    static isRunning(): boolean;
    static reload(): void;
}
