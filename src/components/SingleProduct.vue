<template>
    <NavbarView />
    <div class="row" style="padding: 5%;">
        <div class="col-md-6 d-flex">
            <img src="https://media.wusa9.com/assets/WUSA/images/09e72cf6-5b11-433b-a218-c0bac9968e65/09e72cf6-5b11-433b-a218-c0bac9968e65_1920x1080.jpg"
                width="60%">
        </div>
        <div class="col-md-6">
            <div>
                <h3 style="padding-bottom: 3%; padding-top: 3%;">{{ product_detail.name }} </h3>
                <p>
                    {{ product_detail.description }}
                </p>

                <p style="font-size: 30px; color: rgb(78, 117, 224); font-weight: 900;">{{ product_detail.price }} $</p>
                <p style="padding-bottom: 5%;">Quantity On Hand {{ product_detail.quantity_in_stock }}</p>
                <button type="button" class="btn btn-primary btn-buy">Buy Now</button>

            </div>
        </div>
    </div>
</template>

<script>
import NavbarView from './NavbarView.vue';
import axios from '@/axios';

export default {
    data() {
        return {
            product_detail: {},
        }
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    components: {
        NavbarView,
    },
    mounted() {
        this.singleProductDetails();
    },
    methods: {
        singleProductDetails() {
            axios.get('/product/' + this.id).then(
                response => {
                    this.product_detail = response.data.data
                }
            ).catch((error) => {

            });
        },
    },
};
</script>

<style scoped>
.btn-buy {
    background-color: black;
    background: #000;
    border: #000;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 2%;
    padding-bottom: 2%;
}

.btn-buy:hover {
    background-color: rgb(0, 255, 179);
    background: rgb(0, 255, 179);
    border: rgb(0, 255, 179);
    color: #000;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 2%;
    padding-bottom: 2%;
}
</style>