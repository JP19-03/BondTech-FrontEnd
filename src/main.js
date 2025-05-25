import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "./i18n.js"

import PrimeVue from "primevue/config"
import Material from "@primeuix/themes/material";
import {definePreset} from "@primeuix/themes";

import 'primeicons/primeicons.css'
import Button from "primevue/button"
import Chart from "primevue/chart";
import Checkbox from "primevue/checkbox"
import Column from "primevue/column";
import DataTable from "primevue/datatable"
import DatePicker from "primevue/datepicker"
import Dialog from "primevue/dialog"
import DialogService from "primevue/dialogservice"
import Password from "primevue/password"
import FloatLabel from "primevue/floatlabel"
import IconField from "primevue/iconfield"
import IftaLabel from 'primevue/iftalabel';
import InputIcon from "primevue/inputicon"
import InputNumber from "primevue/inputnumber"
import InputText from "primevue/inputtext"
import Menu from "primevue/menu"
import Select from "primevue/select"
import SelectButton from "primevue/selectbutton"
import Toast from "primevue/toast"
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
    .component('pv-chart', Chart)
    .component('pv-checkbox', Checkbox)
    .component('pv-column', Column)
    .component('pv-data-table', DataTable)
    .component('pv-date-picker', DatePicker)
    .component('pv-dialog', Dialog)
    .component('pv-float-label', FloatLabel)
    .component('pv-icon-field', IconField)
    .component('pv-ifta-label', IftaLabel)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-number', InputNumber)
    .component('pv-input-text', InputText)
    .component('pv-menu', Menu)
    .component('pv-password', Password)
    .component('pv-select', Select)
    .component('pv-select-button', SelectButton)
    .component('pv-toast', Toast)
    .component('pv-toolbar', Toolbar)

app.mount('#app')