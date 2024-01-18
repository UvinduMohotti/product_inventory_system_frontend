<template>
    <NavbarView />
    <div class="card container mt-5">
        <h3 class="card-text mt-3" style="margin-left: 1%;">Product Management</h3>
        <div class="card-body">
            <div class="row mt-10">
                <div class="col-lg-12">
                    <div class="card">
                        <!-- Add Product OPEN -->
                        <form class="form-wizard" v-if="isAddProduct == 1" @submit.prevent="saveProduct">

                            <div class="form-wrap">
                                <div class="card-body pb-0">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Product Name</label>
                                                <input class="form-control" type="text" v-model="name"
                                                    placeholder="Enter Product Name">
                                                <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>

                                            </div>
                                            <div class="form-group mt-2">
                                                <label class="form-label">Product Description</label>
                                                <textarea class="form-control" placeholder="Enter Product Description"
                                                    v-model="description"></textarea>
                                                <span v-if="errors.description" class="text-danger">{{ errors.description
                                                }}</span>
                                            </div>
                                            <div class="form-group mt-2 mb-4">
                                                <label class="form-label">Product Category</label>
                                                <select class="form-select" required="required" v-model="category">
                                                    <option v-for="category in categories" :key="category.id"
                                                        :value="category.id" selected>{{ category.name }}
                                                    </option>
                                                </select>
                                                <span v-if="errors.category" class="text-danger">{{ errors.category
                                                }}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group mt-2">
                                                <label class="form-label">Product Price</label>
                                                <input class="form-control" v-model="price" type="number"
                                                    placeholder="Enter Product Price">
                                                <span v-if="errors.price" class="text-danger">{{ errors.price }}</span>
                                            </div>
                                            <div class="form-group mt-2">
                                                <label class="form-label">Product Quantity</label>
                                                <input class="form-control" v-model="quantity_in_stock" type="number"
                                                    placeholder="Enter Product Quantity">
                                                <span v-if="errors.quantity_in_stock" class="text-danger">{{
                                                    errors.quantity_in_stock }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="container mb-3">
                                <button class="btn btn-primary" type="submit">Save</button>

                                <button class="btn btn-dark" style="margin-left: 1%;" @click="clearAll"
                                    type="button">Clear</button>
                            </div>
                        </form>
                        <!-- Edit Product OPEN -->
                        <form class="form-wizard" v-if="isAddProduct == 2" @submit.prevent="updateProduct">

                            <div class="form-wrap">
                                <div class="card-body pb-0">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Product Name</label>
                                                <input class="form-control" type="text" v-model="product_detail.name"
                                                    placeholder="Enter Product Name">
                                                <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
                                            </div>
                                            <div class="form-group mt-2">
                                                <label class="form-label">Product Description</label>
                                                <textarea class="form-control" placeholder="Enter Product Description"
                                                    v-model="product_detail.description"></textarea>
                                                <span v-if="errors.description" class="text-danger">{{ errors.description
                                                }}</span>
                                            </div>

                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group mt-2">
                                                <label class="form-label">Product Price</label>
                                                <input class="form-control" v-model="product_detail.price" type="number"
                                                    placeholder="Enter Product Price">
                                                <span v-if="errors.price" class="text-danger">{{ errors.price }}</span>
                                            </div>
                                            <div class="form-group mt-2 mb-4">
                                                <label class="form-label">Product Category</label>
                                                <select class="form-select" required="required"
                                                    v-model="product_detail.category">
                                                    <option v-for="category in categories" :key="category.id"
                                                        :value="category.id" selected>{{ category.name }}
                                                    </option>
                                                </select>
                                                <span v-if="errors.category" class="text-danger">{{ errors.category
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="container mb-3">
                                <button class="btn btn-warning" type="submit">Update</button>
                                <button class="btn btn-dark" style="margin-left: 1%;" @click="clearAll"
                                    type="button">Clear</button>
                            </div>
                        </form>

                        <!-- Add Product QTY Update -->
                        <form class="form-wizard" v-if="isAddProduct == 3" @submit.prevent="updateProductQty">

                            <div class="form-wrap">
                                <div class="card-body pb-0">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Product Name</label>
                                                <input class="form-control" type="text" v-model="product_qty_update.name"
                                                    disabled placeholder="Enter Product Name">
                                            </div>
                                        </div>
                                        <div class="col-md-6">

                                            <div class="form-group mt-2">
                                                <label class="form-label">Product Quantity</label>
                                                <input class="form-control" v-model="product_qty_update.quantity_in_stock"
                                                    type="number" placeholder="Enter Product Quantity">
                                                <span v-if="errors.quantity_in_stock" class="text-danger">{{
                                                    errors.quantity_in_stock }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="container mb-3">
                                <button class="btn btn-info" type="submit">Update Quantity</button>

                                <button class="btn btn-dark" style="margin-left: 1%;" @click="clearAll"
                                    type="button">Clear</button>
                            </div>
                        </form>


                        <div class="container mt-4">
                            <div class="table-responsive">

                                <table id="example" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Qty on Hand</th>
                                            <th>Category</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- Your dynamic data goes here -->
                                        <tr v-for="product in products" :key="product.id">
                                            <td>{{ product.id }}</td>
                                            <td>{{ product.name }}</td>
                                            <td>{{ product.price }}</td>
                                            <td>{{ product.quantity_in_stock }}</td>
                                            <td>{{ product.category.name }}</td>
                                            <td>
                                                <button @click='editProduct(product)' class='btn btn-primary'
                                                    style="margin-right: 2%;">EDIT</button>
                                                <button @click='deleteProduct(product)' class='btn btn-danger'
                                                    style="margin-right: 2%;">DELETE</button>
                                                <button @click='qtyUpdate(product)' class='btn btn-success'>QTY
                                                    UPDATE</button>

                                            </td>

                                            <!-- Add more columns as needed -->
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import 'datatables.net-dt';
@import 'datatables.net-bs5';
</style>

<script>
import NavbarView from './NavbarView.vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';
import axios from '@/axios';


import 'datatables.net/js/jquery.dataTables.min.js'; // Make sure you have jQuery installed
import $ from 'jquery';


export default {
    components: {
        NavbarView,
    },
    mounted() {
        this.getAllProducts();
        this.getAllCategories();
    },
    methods: {
        async updateProduct() {
            if (this.validateUpdateForm()) {

                const response = await axios.post("/product-update/" + this.product_detail.id, {
                    name: this.product_detail.name,
                    description: this.product_detail.description,
                    price: this.product_detail.price,
                    category_id: this.product_detail.category
                }).then(
                    response => {
                        this.$swal(response.data.message, "success");
                        this.getAllProducts();
                        this.clearAll();
                    }
                ).catch((error) => {

                });
            } else {

            }

        },
        async updateProductQty() {
            const response = await axios.post("/product/update-quantity/" + this.product_qty_update.id, {
                updated_quantity_in_stock: this.product_qty_update.quantity_in_stock
            }).then(
                response => {
                    this.$swal(response.data.message, "success");
                    this.getAllProducts();
                    this.clearAll();
                }
            ).catch((error) => {

            });


        },
        qtyUpdate(obj) {
            this.isAddProduct = 3;
            this.product_qty_update.id = obj.id;
            this.product_qty_update.name = obj.name;
            this.product_qty_update.quantity_in_stock = obj.quantity_in_stock;

        },
        initDataTable() {
            $(document).ready(function () {
                $('#example').DataTable();
            });
        },
        clearAll() {
            this.errors = {};
            this.isAddProduct = 1;
            this.name = "";
            this.description = "";
            this.quantity_in_stock = "";
            this.price = "";
            this.product_detail = {
                id: "",
                name: "",
                description: "",
                price: "",
                category: ""
            };
            this.product_qty_update = {
                id: "",
                name: "",
                quantity_in_stock: ""
            };
            this.getAllCategories();
        },
        getAllProducts() {
            axios.get('/product').then(
                response => {
                    this.products = response.data.data;
                    this.initDataTable();
                }
            ).catch((error) => {

            });
        },
        getAllCategories() {
            axios.get('/category').then(
                response => {
                    this.categories = response.data.data;
                    this.category = this.categories[0]
                }
            ).catch((error) => {

            });
        },
        validateUpdateForm() {
            this.errors = {};

            if (!this.product_detail.name.trim()) {
                this.errors.name = 'Product Name is required.';
            }

            if (!this.product_detail.description.trim()) {
                this.errors.description = 'Product Description is required.';
            }
            if (this.product_detail.price == '') {
                this.errors.price = 'Product Price is required.';
            }

            if (this.product_detail.category == '') {
                this.errors.category = 'Product Category is required.';
            }


            // Add more validation rules as needed

            return Object.keys(this.errors).length === 0;
        },
        validateSaveForm() {
            this.errors = {};
            if (!this.name.trim()) {
                this.errors.name = 'Product Name is required.';
            }

            if (!this.description.trim()) {
                this.errors.description = 'Product Description is required.';
            }
            if (this.price == '') {
                this.errors.price = 'Product Price is required.';
            }

            if (this.category == '') {
                this.errors.category = 'Product Category is required.';
            }
            if (this.quantity_in_stock == '') {
                this.errors.quantity_in_stock = 'Product Quantity is required.';
            }

            // Add more validation rules as needed

            return Object.keys(this.errors).length === 0;
        },
        editProduct(obj) {
            this.isAddProduct = 2;
            this.product_detail.id = obj.id;
            this.product_detail.name = obj.name;
            this.product_detail.description = obj.description;
            this.product_detail.price = obj.price;
            this.product_detail.category = obj.category_id;

        },
        async deleteProduct(obj) {
            const response = await axios.delete("/product/" + obj.id)
                .then(response => {
                    this.$swal(response.data.message, "success");
                })
                .catch((error) => {

                });

            this.getAllProducts();

        },
        async saveProduct() {
            if (this.validateSaveForm()) {
                const response = await axios.post("/product", {
                    name: this.name,
                    description: this.description,
                    quantity_in_stock: this.quantity_in_stock,
                    price: this.price,
                    category_id: this.category
                }).then(response => {
                    this.$swal(response.data.message);
                    this.getAllProducts();
                    this.clearAll();
                    // Perform any additional actions after successful deletion
                }).catch((error) => {

                });
            } else {

            }
        }
    },
    data() {
        return {
            name: "",
            description: "",
            quantity_in_stock: "",
            price: "",
            category: null,
            categories: [],
            products: [],
            errors: {},
            product_detail: {
                id: "",
                name: "",
                description: "",
                price: "",
                category: ""
            },
            product_qty_update: {
                id: "",
                name: "",
                quantity_in_stock: ""
            },
            isAddProduct: 1

        }
    }
};
</script>