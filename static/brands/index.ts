// to test the async behavior
function getStringAsync(msg: string = undefined) : Promise<string>
{
  return new Promise(resolve => setTimeout(<any>resolve(msg || 'No online help available yet'), 0));
}

function getObjAsync(obj: any = undefined) : Promise<any>
{
  return new Promise(resolve => setTimeout(<any>resolve(obj || {}), 0));
}

export const applicationsBottomHtml = () => getStringAsync();
export const auditBottomHtml = () => getStringAsync();
export const dashboardsCategoricalChartWidget = () => getStringAsync();
export const dashboardsMyDashboardsBottomHtml = () => getStringAsync();
export const dashboardsMyDashboardsShareDashboardSideHtml = () => getStringAsync();
export const dataConfigureModelListBottomHtml = () => getStringAsync();
export const dataConfigureModelListMappingsSideHtml = () => getStringAsync();
export const dataConfigureModelListModelsSideHtml = () => getStringAsync();
export const dataExploreActiveAlarmsBottomHtml = () => getStringAsync();
export const dataExploreAlarmsHistoryBottomHtml = () => getStringAsync();
export const dataExploreAlarmsSideHtml = () => getStringAsync();
export const dataExploreDeviceConnectionHistoryHtml = () => getStringAsync();
export const dataExploreExploreBottomHtml = () => getStringAsync();
export const dataExploreExploreTagDetailsSideHtml = () => getStringAsync();
export const dataNotificationsBottomHtml = () => getStringAsync();
export const dataNotificationsSideHtml = () => getStringAsync();
export const dealerClientsBottomHtml = () => getStringAsync();
export const dealerClientsSideHtml = () => getStringAsync();
export const dealerProductsBottomHtml = () => getStringAsync();
export const dealerProductsDetailsSideHtml = () => getStringAsync();
export const dealerProductsSideHtml = () => getStringAsync();
export const deviceManageDeviceGroupsBottomHtml = () => getStringAsync();
export const deviceManageDevicesBottomHtml = () => getStringAsync();
export const deviceManageDevicesSideHtml = () => getStringAsync();
export const iamOrganizationsOrganizationsBottomHtml = () => getStringAsync();
export const iamOrganizationsConsumptionsBottomHtml = () => getStringAsync();
export const iamOrganizationsOrganizationsSideHtml = () => getStringAsync();
export const iamOrganizationsResourcesBottomHtml = () => getStringAsync();
export const iamOrganizationsResourcesSideHtml = () => getStringAsync();
export const iamRolesApplicationRolesBottomHtml = () => getStringAsync();
export const iamRolesApplicationRolesSideHtml = () => getStringAsync();
export const iamRolesDeviceRolesBottomHtml = () => getStringAsync();
export const iamRolesDeviceRolesSideHtml = () => getStringAsync();
export const iamUsersGroupsBottomHtml = () => getStringAsync();
export const iamUsersGroupsSideHtml = () => getStringAsync();
export const iamUsersRolesBottomHtml = () => getStringAsync();
export const iamUsersRolesSideHtml = () => getStringAsync();
export const iamUsersUsersBottomHtml = () => getStringAsync();
export const iamUsersUsersSideHtml = () => getStringAsync();
export const vpnApplicationsBottomHtml = () => getStringAsync();
export const vpnApplicationsSideHtml = () => getStringAsync();
export const vpnDeviceEditSideHtml = () => getStringAsync();
export const vpnDevicesBottomHtml = () => getStringAsync();
export const vpnEndpointsBottomHtml = () => getStringAsync();
export const vpnEndpointSideHtml = () => getStringAsync();
export const vpnLogsSideHtml = () => getStringAsync();
export const vpnProfilesBottomHtml = () => getStringAsync();
export const vpnProfilesSideHtml = () => getStringAsync();

// default labels translations from brand corvina
export * from '../../i18n/brands/corvina'

// export const messages = {};

// export const defaultLocale = '';

// export const defaultStandardTime = '';


