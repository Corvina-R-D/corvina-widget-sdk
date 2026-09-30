import { initCorvina, setCommunicationSettings, CommunicationSettings } from "corvina";
import { globalWidgetRegistry } from "corvina";

// Disabling organization assets prevent to load widgets from object store.
globalWidgetRegistry.disableOrganizationAssets();

/*
 * Value of a variable of the .env file (see .env.example), replaced at build time by webpack (option
 * dotenv of webpack.config.js). A variable not defined stays process.env.<name>, undefined in the
 * browser: then, or when it is empty, the default is used.
 */
function env( read: () => string | undefined, defaultValue?: string ) {
  try {
    return read() || defaultValue;
  } catch {
    return defaultValue;
  }
}

initCorvina( ()=> {
  setCommunicationSettings(
    env( () => process.env.CORVINA_HOST, "corvina.cloud" ),
    env( () => process.env.CORVINA_REALM, "realm" ),
    env( () => process.env.CORVINA_I18N_HOST )
  );
  console.log(CommunicationSettings)
}).then( () => {
  /*
   * lib.js registers the widgets before initCorvina loads the texts: the labels of their properties
   * handlers, resolved at registration, would show the i18n keys (e.g. BasePropsHandler.id).
   * In Corvina the widget packages are loaded after the texts, this is needed only here.
   */
  globalWidgetRegistry.updateLanguage();
});
