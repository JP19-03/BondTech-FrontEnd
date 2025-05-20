import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "./i18n.js"

import PrimeVue from "primevue/config"
import Material from "@primeuix/themes/material";
import {definePreset} from "@primeuix/themes";

import 'primeicons/primeicons.css'
import Button from "primevue/button"
import Column from "primevue/column";
import DataTable from "primevue/datatable"
import DialogService from "primevue/dialogservice"
import IconField from "primevue/iconfield"
import InputIcon from "primevue/inputicon"
import InputText from "primevue/inputtext"
import Menu from "primevue/menu"
import SelectButton from "primevue/selectbutton"
import ToastService from "primevue/toastservice"
import Toolbar from "primevue/toolbar"

import router from "./router/index.js"

const app = createApp(App)

app.use(i18n);

app.use(router);

const MyPreset = definePreset(Material, {
    semantic: {
        primary: {
            50: '{amber.50}',
            100: '{amber.100}',
            200: '{amber.200}',
            300: '{amber.300}',
            400: '{amber.400}',
            500: '{amber.500}',
            600: '{amber.600}',
            700: '{amber.700}',
            800: '{amber.800}',
            900: '{amber.900}',
            950: '{amber.950}',
        }
    }
});

app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: false,
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue'
            }
        }
    }
})
    .use(DialogService)
    .use(ToastService);

app.component('pv-button', Button)
    .component('pv-column', Column)
    .component('pv-data-table', DataTable)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-text', InputText)
    .component('pv-menu', Menu)
    .component('pv-select-button', SelectButton)
    .component('pv-toolbar', Toolbar)

app.mount('#app')