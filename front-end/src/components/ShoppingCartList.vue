<template>
    <div v-if="CartList.length > 0">
        <div class="product-container"
            v-for="item in CartList"
            :key="item.id"
        >
            <img class="product-image" :src="item.imageUrl" />
            <div class="details-wrap">
                <h3>{{item.name}}</h3>
                <p>{{ item.price }}</p>
            </div>
            <button @click="$emit('remove-from-cart' , item.id)" class="remove-button"> Remove from Cart</button>
        </div>
        <button class="checkout-button">Proceed to Checkout</button>
    </div>

    <div v-if="CartList.length === 0">
        You currently have no items in your Cart!
    </div>
</template>

<script>
export default {
    name: "ShoppingCartList",
    props: ['CartList']
}
</script>