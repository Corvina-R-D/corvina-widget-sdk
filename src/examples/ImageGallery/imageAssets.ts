import { DashboardAxiosInstance, projectStore } from "corvina";

/*
 * Helpers around the asset storage of the dashboards (object storage of Corvina).
 *
 * The assets of a dashboard are files stored by name, in a namespace of the dashboard:
 * - upload:   DashboardAxiosInstance.addAsset( dashboardId, name, data ) asks the dashboard service for
 *             a presigned URL and PUTs the data there;
 * - download: Dashboard.getAssetData( name, dashboardId ) returns the content (ArrayBuffer), fetched
 *             once and shared by the widgets of the dashboard;
 * - storage:  DashboardAxiosInstance.getAssetStorageStatus() tells whether the organization has it.
 * There is no API to list or delete the stored files: the dashboard manifest counts the references
 * to every asset, the widgets keep them up to date (see ImageGallery.ts).
 */

// Choices of this widget: the platform does not limit the size of the assets
export const IMAGE_TYPES = [ "image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml" ];
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export async function isAssetStorageEnabled(): Promise<boolean> {
  try {
    const status = await DashboardAxiosInstance.getAssetStorageStatus();
    return status?.enabled === true;
  } catch ( e ) {
    return false;
  }
}

/*
 * A new name for every upload. The name is put as it is in the URL of the assets API, and an asset
 * with the name of one already in the dashboard would replace it for every widget using it: never
 * reuse the file name.
 */
export function createAssetName( wgtId: string, file: File ): string {
  const match = /\.([A-Za-z0-9]{1,5})$/.exec( file.name );
  const extension = match ? match[ 1 ].toLowerCase() : "img";
  const prefix = String( wgtId ).replace( /[^A-Za-z0-9_-]/g, "_" );
  return `${prefix}_${crypto.randomUUID()}.${extension}`;
}

// Stores the file as it is (binary) in the asset storage of the dashboard being edited
export async function uploadImageAsset( assetName: string, file: File ): Promise<boolean> {
  const dashboard = projectStore.getCurProject;
  return DashboardAxiosInstance.addAsset( dashboard.id, assetName, file );
}

/*
 * Content of an asset as a data URL, for <img src>. The presigned download URL could be used as src
 * too, but it expires and the type of the stored object depends on the upload: the data keeps the
 * MIME type saved with the image.
 */
export async function loadImageAsset( dashboard: any, assetName: string, dashboardId: string, type: string ): Promise<string> {
  const data = await dashboard.getAssetData( assetName, dashboardId );
  if ( !data ) throw new Error( `asset ${assetName} not available` );
  return readAsDataURL( new Blob( [ data ], { type: type || "application/octet-stream" } ) );
}

export function readAsDataURL( blob: Blob ): Promise<string> {
  return new Promise( ( resolve, reject ) => {
    const reader = new FileReader();
    reader.onload = () => resolve( reader.result as string );
    reader.onerror = () => reject( reader.error );
    reader.readAsDataURL( blob );
  } );
}

/*
 * Keeps the editor in the "saving" state until the upload and the save of the dashboard are done,
 * so the user cannot leave the editor in the meantime. beginSaveGuard, flushSave and endSaveGuard
 * exist only in the recent Corvina versions: without them the upload runs as it is.
 */
export async function withSaveGuard( run: () => Promise<void> ): Promise<void> {
  if ( typeof projectStore.beginSaveGuard !== "function" ) {
    await run();
    return;
  }
  projectStore.beginSaveGuard();
  try {
    await run();
  } finally {
    try {
      await projectStore.flushSave();
    } finally {
      projectStore.endSaveGuard();
    }
  }
}
