<template>
    <!-- Navigation bar -->
    <nav>
        <!-- Links for different routes. They are conditionally rendered based on the 'isLoggedIn' state. -->
        <!-- <router-link to="/login" v-if="!isLoggedIn">Login</router-link> |
        <router-link to="/register" v-if="!isLoggedIn">Register</router-link> | -->
        <!-- Logout button that calls 'logout' action when clicked -->

    </nav>
    <div class="container p-0">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" v-if="isLoggedIn" aria-current="page" href="/dashboard">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" v-if="isLoggedIn && role == 'admin'" href="/product-management">Product Management</a>
                        </li>
                        <li class="nav-item">
                            <!-- <router-link to="/register" class="nav-link" v-if="isLoggedIn">User Management</router-link>  -->
                            <a class="nav-link" v-if="isLoggedIn && role == 'admin' " href="/user-management">User Management</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                {{ name }}
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" @click="logout" v-if="isLoggedIn">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                    <!-- <span class="navbar-text">
                    Navbar text with an inline element
                </span> -->

                </div>
            </div>
        </nav>
    </div>
</template>
    
    
<script>
import { mapState, mapActions } from 'vuex'


export default {
    data() {
        return {
            name: '',
            role : ''
        };
    },
    created() {
        this.getUserNameFromLocalStorage();
    },
    computed: {
        // Using Vuex helpers to map the 'isLoggedIn' state to a computed property
        ...mapState(['isLoggedIn'])
    },
    methods: {
        // Using Vuex helpers to map the 'logout' action to a method
        ...mapActions(['logout']),
        getUserNameFromLocalStorage() {
            const storedUserName = localStorage.getItem('name');
            if (storedUserName) {
                this.name = storedUserName;
                this.role = localStorage.getItem('role');
            }
        },
    }
}
</script>
