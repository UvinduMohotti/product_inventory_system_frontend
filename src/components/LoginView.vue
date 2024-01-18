<template>
    <div class="container">
        <!-- Form for login -->
        <div class="form-container d-flex justify-center" style="margin-top: 5%; margin-bottom: 0%;">
            <form @submit.prevent="login" class="login-form" style="padding: 5%; width: 35%; ">
                <img class="mb-4" src="https://upload.wikimedia.org/wikipedia/commons/2/2d/O-Jolle_insigna.png" alt=""
                    style="width: 60%; margin-left: auto; margin-right: auto; padding-bottom: 10%; padding-top: 10%;">
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <div class="form-floating">
                    <input type="email" v-model="email" class="form-control" id="floatingInput"
                        placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                    <span v-if="errors.email" class="text-danger">{{
                        errors.email }}</span>
                </div>
                <div class="form-floating">
                    <input type="password" v-model="password" class="form-control" id="floatingPassword"
                        placeholder="Password">
                    <label for="floatingPassword">Password</label>
                    <span v-if="errors.password" class="text-danger">{{
                        errors.password }}</span>
                </div>

                <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

            </form>
        </div>
    </div>
</template>
    
    
<script>
import axios from '@/axios';


export default {
    data() {
        return {
            // Data model for the form inputs
            email: "",
            password: "",
            errors: {},
        };
    },
    methods: {
        validateForm() {
            this.errors = {};
            if (this.email == '') {
                this.errors.email = 'Email Address is required.';
            }

            let regExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

            if (!this.email.match(regExp)) {
                this.errors.email = 'Email Address is Inccorect.';
            }

            if (this.password == '') {
                this.errors.password = 'Password is required.';
            }

            // Add more validation rules as needed

            return Object.keys(this.errors).length === 0;
        },
        async login() {
            if (this.validateForm()) {
                try {
                    // Making POST request to "/login" endpoint with email and password as data
                    const response = await axios.post("/login", {
                        email: this.email,
                        password: this.password
                    }).then(
                        response => {
                            
                            localStorage.setItem('token', response.data.data.token);
                            localStorage.setItem('name', response.data.data.name);
                            localStorage.setItem('role', response.data.data.role);


                            // Committing a mutation to update 'isLoggedIn' state
                            this.$store.commit('LOGIN');

                            // Redirecting to the home page
                            this.$router.push('/dashboard');
                        }
                    ).catch((error) => {
            
                        this.$swal(error.response.data.message, "Fail");
                    });

                } catch (error) {
                    console.error("An error occurred:", error);
                }
            }
        }
    }
};
</script>
    
    
    
<style scoped>
.btn-login {}

.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
}


.login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 300px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.login-form input,
.login-form button {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}


.login-form button {
    background-color: #000000;
    color: rgb(11, 246, 195);
    cursor: pointer;
    border-radius: 50px;
}

.login-form button:hover {
    background-color: rgb(11, 246, 195);
    color: rgb(0, 0, 0);
    cursor: pointer;
    /* border: #00000000; */
    border-radius: 50px;
}
</style>