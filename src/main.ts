declare var adjustPath;
import { registerWidget, registerPropControl } from "corvina";
import manifest from "./manifest.json";

import MyWidget from "./examples/MyWidget/MyWidget";
import MyWidgetVue from "./examples/MyWidget/MyWidget.vue";
import { myWidgetGallery } from "./examples/MyWidget/MyWidgetGallery";
import { widgetType as MyWidgetType } from "./examples/MyWidget/defs";

// Registering widget
const iconMyWidget = require( "./resources/images/corvina-widget1.png" );
registerWidget({
  type: MyWidgetType,  // The value is org.MyWidget
  class: MyWidget,
  component: MyWidgetVue,
  gfx: myWidgetGallery.getDefaultConfiguration,
  props: myWidgetGallery.getPropsHandler(),
  icon: adjustPath( iconMyWidget ),
  category: "MyGallery"
}, manifest);