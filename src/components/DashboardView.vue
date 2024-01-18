<template>
    <NavbarView />
    <div class="card container mt-5">

        <h3 class="card-text mt-3 text-center">Product Details</h3>
        <div class="card-body">
            <div class="row mt-10">
                <div class="col-lg-12">
                    <div class="table-responsive">
                        <DataTable :data="products" :columns="columns" class="table table-striped table-bordered display"
                            :options="{ responsive: true, autoWidth: false }">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty on Hand</th>
                                    <th>Category</th>
                                    <th>VIEW</th>
                                </tr>
                            </thead>
                        </DataTable>
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

DataTable.use(DataTablesCore);

export default {
    components: {
        NavbarView, DataTable,
    },
    mounted() {
        this.getAllProducts();
    },
    methods: {
        getAllProducts() {
            axios.get('/product').then(
                response => {
                    this.products = response.data.data
                }
            ).catch((error) => {

            });
        }
    },
    data() {
        return {
            products: [],
            columns: [
                { data: 'id' },
                { data: 'name' },
                { data: 'price' },
                { data: 'quantity_in_stock' },
                { data: 'category.name' },
                {
                    data: null, orderable: false, render: function (data) {
                        return "<a href='/product/" + data.id + "' class='btn btn-primary'>VIEW</a>";
                    },
                },
            ]
        }
    }
};
</script>