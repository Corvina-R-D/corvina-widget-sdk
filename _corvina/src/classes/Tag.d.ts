import { Value } from '@/corvina-model';
export default class Tag {
    value: Value<any>;
    addr: string;
    refCount: number;
    constructor(value: Value<any>, addr: string, referenceCount: number);
}
