import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../bondValuation/pages/home.component.vue";
import BondCreateAndEditComponent from "../bondValuation/components/bond-create-and-edit.component.vue";
import BondResultComponent from "../bondValuation/pages/bond-result.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/home",
            name: "home",
            component: HomeComponent,
            meta: {title: "Home Page", layout: 'CorporateBondLayoutComponent'}
        },
        {
            path: "/create-bond",
            name: "create-bond",
            component: BondCreateAndEditComponent,
            meta: {title: "Create Bond", layout: 'CorporateBondLayoutComponent'}
        },
        {
            path: "/edit/:id",
            name: "edit-bond",
            component: BondCreateAndEditComponent,
            meta: {title: "Edit Bond", layout: 'CorporateBondLayoutComponent'},
        },
        {
            path: "/bond/:id",
            name: "bond-result",
            component: BondResultComponent,
            meta: {title: "Bond Result", layout: 'CorporateBondLayoutComponent'},
        },
        {
            path: "/",
            redirect: "/home"
        }
    ]
});

export default router;