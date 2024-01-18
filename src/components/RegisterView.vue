<template>
    <NavbarView />
    <div class="card container mt-5">
        <h3 class="card-text mt-3" style="margin-left: 1%;">User Management</h3>
        <div class="card-body">
            <div class="row mt-10">
                <div class="col-lg-12">
                    <div class="card">
                        <!-- Add User OPEN -->
                        <form class="form-wizard" @submit.prevent="register">

                            <div class="form-wrap">
                                <div class="card-body pb-0">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Full Name</label>
                                                <input class="form-control" type="text" v-model="name"
                                                    placeholder="Enter Full Name">
                                                <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
                                            </div>
                                            <div class="form-group mt-2">
                                                <label class="form-label">Email Address</label>
                                                <input class="form-control" type="email" v-model="email"
                                                    placeholder="Enter Email Address">
                                                <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
                                            </div>

                                            <div class="form-group mt-2 mb-4">
                                                <label class="form-label">User Role</label>
                                                <select class="form-select" required="required" v-model="user_role">
                                                    <option v-for="user_role_data in user_roles" :key="user_role_data.key"
                                                        :value="user_role_data.key" selected>{{ user_role_data.value }}
                                                    </option>
                                                </select>
                                                <span v-if="errors.user_role" class="text-danger">{{ errors.user_role
                                                }}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group mt-2">
                                                <label class="form-label">Password</label>
                                                <input class="form-control" v-model="password" type="password"
                                                    placeholder="Enter Password ****">
                                                <span v-if="errors.password" class="text-danger">{{ errors.password
                                                }}</span>
                                            </div>
                                            <div class="form-group mt-2">
                                                <label class="form-label">Confirm Password</label>
                                                <input class="form-control" v-model="cpassword" type="password"
                                                    placeholder="Enter Confirm Password ****">
                                                <span v-if="errors.cpassword" class="text-danger">{{ errors.cpassword
                                                }}</span>
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


                        <div class="container mt-4">
                            <div class="table-responsive">

                                <table id="example" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email Address</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- Your dynamic data goes here -->
                                        <tr v-for="user in users" :key="user.id">
                                            <td>{{ user.id }}</td>
                                            <td>{{ user.name }}</td>
                                            <td>{{ user.email }}</td>
                                            <td>{{ user.role }}</td>
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
    
    
<script>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';
import axios from '@/axios';

import 'datatables.net/js/jquery.dataTables.min.js'; // Make sure you have jQuery installed
import $ from 'jquery';
import NavbarView from './NavbarView.vue';

export default {
    components: {
        NavbarView,
    },
    mounted() {
        this.getAllUsers();
    },
    data() {
        return {
            // Data model for the form inputs
            users: [],
            errors: {},
            name: "",
            email: "",
            cpassword: "",
            user_role: null,
            user_roles: [
                {
                    key: 'admin',
                    value: "Admin"
                },
                {
                    key: 'user',
                    value: "User"
                },
            ],
            password: ""
        };
    },
    methods: {
        clearAll() {
            this.name = "";
            this.email = "";
            this.password = "";
            this.cpassword = "";
            this.user_role = null;
            this.errors = {};
        },
        initDataTable() {
            $(document).ready(function () {
                $('#example').DataTable();
            });
        },
        getAllUsers() {
            axios.get('/user').then(
                response => {
                    this.users = response.data.data;
                    this.initDataTable();
                }
            ).catch((error) => {

            });
        },
        validateForm() {
            this.errors = {};

            if (!this.name.trim()) {
                this.errors.name = 'User Name is required.';
            }

            if (this.email == '') {
                this.errors.email = 'Email is required.';
            }

            let regExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            
            if (!this.email.match(regExp)) {
                this.errors.email = 'Email Address is Inccorect.';
            }

            if (this.password == '') {
                this.errors.password = 'Password is required.';
            }
            if (this.password !== this.cpassword) {
                this.errors.cpassword = 'Password does not match.';
            }

            if (this.user_role == '') {
                this.errors.user_role = 'User Role is required.';
            }


            // Add more validation rules as needed

            return Object.keys(this.errors).length === 0;
        },
        async register() {
            if (this.validateForm()) {
                try {
                    // Making POST request to "/register" endpoint with name, email, and password as data
                    await axios.post("/register", {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.cpassword,
                        role: this.user_role

                    }).then(response => {
                        this.$swal(response.data.message,"success");
                        this.getAllUsers();
                        this.clearAll();
                    }).catch((error) => {

                    });


                }
                catch (error) {
                    console.error("An error occurred:", error);
                    if (error.response) {
                        console.error('Error details:', error.response.data);
                    }
                }
            } else {

            }
        }
    }
};
</script>
    
<style>
@import 'datatables.net-dt';
@import 'datatables.net-bs5';
</style>