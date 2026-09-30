/**
 * Transform the polar coordiates into cartesian.
 * @param {number} cx - x center of polar coordinate system
 * @param {number} cy - y center of polar coordinate system
 * @param {number} radius - the radius of the circumference
 * @param {number} angle - angle in degree
 * @returns {object} Return the object {x: <xCartesian>, y: <yCartesian>}
 */
export declare var polarToCartesian: (cx: any, cy: any, rx: any, ry: any, angle: any) => {
    x: number;
    y: number;
};
/**
 *
 * @param {number} n
 * @param {number} threshold
 * @returns {number}
 */
export declare function trunc(n: any, threshold: any): number;
/**
 * Calculate the inverse of a affine transformation
 * @return {Array} affine matrix
 */
export declare function inverse(a: any, b: any, c: any, d: any, e: any, f: any): number[][];
/**
 * Calculate the inverse of a affine transformation
 * @return {Array} affine matrix
 */
export declare function inverseMtx(mtx: any): number[][];
export declare function isIdentity3(mtx: any): boolean;
/**
 * Matrix multiplication
 * @param {Array} m1
 * @param {Array} m2
 * @return {Array}
 */
export declare function multiply(m1: any, m2: any): number[][];
export declare function isIdentityMatrix(mtx: any): boolean;
export declare function mulV3M3(v3: number[], m3: number[][]): number[];
export declare function identity3(): number[][];
export declare function sanitizeMatrix3(mtx: number[][]): number[][];
