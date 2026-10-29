/*
 * The new dashboard editor (corvina-dashboard), opened by Dashboards in an iframe when the instance has the
 * dashboardNew flag, has a widget registry of its own: lib.js registers the widgets in this page's only.
 */

/** Where the package is, read by the iframe (corvina-dashboard/src/sdkDev.ts) */
interface SdkDevPackage {
  lib: string;
  manifest: Record<string, unknown>;
}

declare global {
  interface Window {
    __corvinaSdkDev?: SdkDevPackage;
  }
}

const resourceUrl = ( name: string ) => ( { name, url: `${location.origin}/dist/org/${name}` } );
const resourceUrls = ( names?: string | string[] ) =>
  ( names === undefined ? [] : [].concat( names ) ).map( resourceUrl );

/**
 * Makes the package being developed available to the new editor, which loads it as an uploaded one, help
 * included: lib.iframe.js, the build of lib.js without the dev server's client (webpack.config.js), and the
 * manifest with the url of each resource, as the organization's gallery returns them.
 *
 * Hot updates do not reach the iframe: after every rebuild it is reloaded, and keeps the open dashboard (its
 * router is in hash mode). The emitter is the one of the dev server's client.
 */
export function useNewEditor(): void {
  const manifest = require( "./src/manifest.json" );
  window.__corvinaSdkDev = {
    lib: `${location.origin}/dist/org/lib.iframe.js`,
    manifest: {
      ...manifest,
      resources: {
        images: resourceUrls( manifest.resources?.images ),
        icon: resourceUrls( manifest.resources?.icon ),
        fonts: resourceUrls( manifest.resources?.fonts ),
      },
    },
  };

  if ( ( module as any ).hot ) {
    require( "webpack/hot/emitter.js" ).on( "webpackHotUpdate", () => {
      document.querySelectorAll<HTMLIFrameElement>( 'iframe[src*="/corvina-dashboard/"]' )
        .forEach( iframe => iframe.contentWindow?.location.reload() );
    } );
  }
}
