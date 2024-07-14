<template> 
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageUrl" />
        </div>
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">{{ product.price }}</h3>
            <button @click="addToCart" class="add-to-cart" v-if="user && !itemIsInCart">Add to Cart</button>
            <button style="width: 50vw;" class="grey-button" v-if="user && itemIsInCart">Item is already in the Cart</button>

            <button class="sign-in" @click="signin" v-if="!user">Sign in to add to cart</button>
        </div>
    </div>
    <div v-else>
        <NotFoundPage />
    </div>
</template>

<script>
import {getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink} from 'firebase/auth';
import axios from 'axios';
import NotFoundPage from './NotFoundPage.vue';

export default {
    name: 'ProductDetail',
    props: ['user'],
    data(){
        return{
            product: {},
            cartItems: []
        }
    },
    computed: {
        itemIsInCart() {
            return this.cartItems.some(item => item.id === this.$route.params.productId)
        }
    },
    watch: {
        async use(newUserValue) {
            if(newUserValue){
                const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
                const cartItems = cartResponse.data;
                this.cartItems = cartItems;
            }
        }
    },
    methods: {
        async addToCart() {
            await axios.post(`/api/users/${this.user.uid}/cart` , {id: this.$route.params.productId});
            alert('Successfully added item to the Cart')
        },
        async signin() {
            const email = prompt('Please enter your emauil to sign in :');
            const auth = getAuth();
            const actionCodeSettings = {
                url: `http://localhost:8080/products${this.$route.params.productId}`,
                handleCodeInApp: true,
            }
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            alert('A loging link was sent to the email you provided!');
            window.localStorage.setItem('emailForSignIn' , email);
        }
    },
    components: {
        NotFoundPage
    },

    async created() {
        try {

            const auth = getAuth();
            if (isSignInWithEmailLink(auth, window.location.href)) {
                const email = window.localStorage.getItem('emailForSignIn');
                await signInWithEmailLink(auth, email, window.location.href);
                alert('Successfully Signed in!');
                window.localStorage.removeItem('emailForSignIn');
            }

            const response = await axios.get(`/api/products/${this.$route.params.productId}`);
            const product = response.data;
            this.product = product;
            
            if(this.user){
                const cartResponse = await axios.get(`/api/users/${this.user.uid}/cart`);
                const cartItems = cartResponse.data;
                this.cartItems = cartItems;
            }
            
        } catch (error) {
            console.error('Error fetching product or cart:', error);
        }
    }

  }
</script>