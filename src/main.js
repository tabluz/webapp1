import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import BaseBlock from "@/components/BaseBlock.vue";
import BaseBackground from "@/components/BaseBackground.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";

// Template directives
import clickRipple from "@/directives/clickRipple";

// Bootstrap framework
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

// Craft new application
const app = createApp(App);

// Register global components
app.component("BaseBlock", BaseBlock);
app.component("BaseBackground", BaseBackground);
app.component("BasePageHeading", BasePageHeading);

// Register global directives
app.directive("click-ripple", clickRipple);
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
// Use Pinia and Vue Router
app.use(pinia);
app.use(router);

// ..and finally mount it!
app.mount("#app");
