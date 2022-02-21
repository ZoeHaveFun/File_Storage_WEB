import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import axios from "axios";
import "./assets/fonts/icomoon.css";

createApp(App).use(store).use(router).mount("#app");
