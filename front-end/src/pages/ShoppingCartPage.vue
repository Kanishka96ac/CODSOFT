<template> 
    <h1>Shopping Cart</h1>
    <ShoppingCartList @remove-from-cart="removeFromCart($event)" :CartList = "cartItems"/>
</template>

<script>
import axios from 'axios';
import ShoppingCartList from '@/components/ShoppingCartList.vue';

export default {
    name: 'ShoppingCart',
    props: ['user'],
    components: {
        ShoppingCartList,
    },
    data(){
        return{
            cartItems: [],
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
    methods:{
        async removeFromCart(productId){
            const response = await axios.delete(`/api/users/${this.user.uid}/cart/${productId}`);
            const updatedCart = response.data;
            this.cartItems = updatedCart;
        },
    },
    async created(){
        if(this.user){
            const response = await axios.get(`/api/users/${this.user.uid}/cart`);
            const cartItems = response.data;
            this.cartItems = cartItems;
        }
    }
  }
</script>