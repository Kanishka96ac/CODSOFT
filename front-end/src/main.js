import { createApp } from 'vue';
import App from './App.vue';
import './main.css';
import * as VueRouter from 'vue-router';
import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import ProductPage from './pages/ProductPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFJUTELEabj7FHWOOo34OFuHrlr4DxXJw",
  authDomain: "olive-aura.firebaseapp.com",
  projectId: "olive-aura",
  storageBucket: "olive-aura.appspot.com",
  messagingSenderId: "22385306342",
  appId: "1:22385306342:web:f4433843c68b34f3056927"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes : [{
        path: '/cart',
        component: ShoppingCartPage
    },
    {
        path: '/products',
        component: ProductPage
    },
    {
        path: '/products/:productId',
        component: ProductDetailPage
    },
    {
        path: '/',
        redirect: '/products'
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage
    }]
}))
.mount('#app')
