import {createRouter, createWebHistory} from "vue-router";
import SignUpComponent from "../iam/components/sign-up.component.vue";
import SignInComponent from "../iam/components/sign-in.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/sign-up',
            name: 'sign-up',
            component: SignUpComponent,
            meta: {title: 'Sign Up', layout: 'AuthenticationLayoutComponent'},
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignInComponent,
            meta: {title: 'Sign In', layout: 'AuthenticationLayoutComponent'},
        },
        {
            path: '/',
            redirect: () => {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    return {name: 'sign-in'};
                }
                return {name: 'home'};
            }
        }
    ]
});

export default router;