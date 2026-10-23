import { PageFormat, PageOrientation } from "@/interfaces/dashboard";
export interface PageDimensions {
    width: number;
    height: number;
}
export interface PageMargins {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export declare const DEFAULT_MARGINS: PageMargins;
export declare const PAGE_SIZES: Record<PageFormat, PageDimensions>;
export declare function getPageDimensions(format: PageFormat, orientation: PageOrientation): PageDimensions;
/**
 * Margins must be integer values: truncates any decimal part (e.g. 10.5 -> 10).
 * Missing or invalid values fall back to the default margins.
 */
export declare function truncateMargins(margins: Partial<PageMargins>): PageMargins;
