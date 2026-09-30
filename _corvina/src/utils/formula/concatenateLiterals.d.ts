/**
 * Covert to expression string containing
 * Example:
 *  - 'Dataset $("slot/tag1")' => '"Dataset" + $("slot/tag1")'
 *  - 'Dataset $("slot/tag1"), $("slot/family/"+$("param:w1")) name" =>
 *    '"Dataset" + $("slot/tag1")+","+ $("slot/family/"+$("param:w1"))+" name""
 * @param code string with injected tags
 * @returns JavaScript expression
 */
export declare function concatenateLiterals(code: string): string;
