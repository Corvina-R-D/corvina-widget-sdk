/** A tab of a help guide: the page it opens, and the i18n key of its label. */
export interface HelpTab {
    doc: string;
    label: string;
}
/**
 * A help made of several pages, linked to each other: its home page, the names it is opened with (a widget type), its
 * other pages and, optionally, tabs above them, and the pages that need the room of the expanded help panel.
 */
export interface HelpGuide {
    home: string;
    aliases?: string[];
    pages: string[];
    tabs?: HelpTab[];
    wide?: string[];
}
/**
 * The help an SDK widget brings for its own type (`help` of `registerWidget`): one page, or a guide of several pages
 * by name, each a function of the locale answering its html (or nothing when it is not written in that language).
 * Declared here for the typings of the SDK (`yarn build-sdk-definition`): the dashboard editor of
 * corvina-dashboard (`@xview/editor`) shows it, cleaned, when the host has no help for the type; this app's
 * own editor does not.
 */
export type WidgetHelpPage = (locale: string) => Promise<string | undefined>;
export interface WidgetHelpGuide {
    home: string;
    pages: Record<string, WidgetHelpPage>;
    tabs?: HelpTab[];
    wide?: string[];
}
export type XViewWidgetHelp = WidgetHelpPage | WidgetHelpGuide;
export default class Help {
    map: Map<string, any>;
    guides: HelpGuide[];
    constructor();
    getHelp(type: string, locale: string): Promise<string>;
    hasHelp(widgetType: string): boolean;
    register(type: string, documentation: any): void;
    registerGuide(guide: HelpGuide): void;
    /** The guide a page (or a name the guide is opened with) belongs to. */
    guideOf(doc: string): HelpGuide | undefined;
    /** The page a help name opens: the home page of a guide for its aliases, the name itself otherwise. */
    pageOf(doc: string): string;
}
