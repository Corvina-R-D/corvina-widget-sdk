import type { HelpTab, XViewWidgetHelp } from "corvina";

/**
 * The help of a widget, from its pages in Markdown: `docs/<locale>/<page>.md` next to the widget, compiled to
 * html when the package is built (scripts/markdown-loader.js) and shipped inside lib.js.
 *
 *   help: widgetHelp( require.context( "./docs", true, /\.md$/ ) )                    // one page
 *   help: widgetHelp( require.context( "./docs", true, /\.md$/ ), { home: "overview" } ) // a guide
 *
 * The locale folders are the languages of Corvina: `en-US`, `it-IT`, …, or just the language (`en`, `it`).
 * The editor looks for a page in the language of the user, then without the region, then in `en-US` and `en`:
 * a page written in english only is shown to everybody. A page links another one of the same widget as
 * `other.md` (or `other.md#heading-id`). The images go next to the pages and in `resources.images` of
 * src/manifest.json (see the loader).
 *
 * The editor of Corvina shows the help of the widget from the help button of its properties, cleaned (no
 * scripts, event handlers, iframes, <style> or forms), unless Corvina has its own help for that widget type.
 */
export interface WidgetHelpOptions {
  /** The page the help opens on: required when there is more than one */
  home?: string;
  /** Tabs above the pages: `doc` is a page name, `label` a translation key or the text */
  tabs?: HelpTab[];
  /** The pages that need the room of the expanded help panel */
  wide?: string[];
}

/** What `require.context` returns: the modules of the pages by path (`./it-IT/overview.md`) */
interface PagesContext {
  keys(): string[];
  ( id: string ): string;
}

declare global {
  // webpack's, typed for the pages of the help
  interface NodeRequire {
    context( directory: string, subdirectories: boolean, filter: RegExp ): PagesContext;
  }
}

export function widgetHelp( pages: PagesContext, options: WidgetHelpOptions = {} ): XViewWidgetHelp {
  // page name -> locale -> path of the module
  const byName = new Map<string, Map<string, string>>();
  for ( const key of pages.keys() ) {
    const match = /^\.\/([^/]+)\/([\w-]+)\.md$/.exec( key );
    if ( !match ) throw new Error( `widgetHelp: ${key} is not docs/<locale>/<page>.md` );
    const [ , locale, name ] = match;
    if ( !byName.has( name ) ) byName.set( name, new Map() );
    byName.get( name ).set( locale, key );
  }

  const page = ( name: string ) => ( locale: string ): Promise<string | undefined> => {
    const key = byName.get( name ).get( locale );
    return Promise.resolve( key ? pages( key ) : undefined );
  };

  const names = [ ...byName.keys() ];
  if ( names.length === 0 ) throw new Error( "widgetHelp: no docs/<locale>/<page>.md" );
  if ( names.length === 1 && !options.home && !options.tabs ) return page( names[ 0 ] );
  if ( !options.home || !byName.has( options.home ) )
    throw new Error( `widgetHelp: home must be one of the pages: ${names.join( ", " )}` );
  const guidePages: Record<string, ( locale: string ) => Promise<string | undefined>> = {};
  for ( const name of names ) guidePages[ name ] = page( name );
  return { home: options.home, pages: guidePages, tabs: options.tabs, wide: options.wide };
}
