import { createRouter, createWebHistory } from "vue-router";

import LoginView from "./components/LoginView.vue"; // Import the Login component
import RegisterView from "./components/RegisterView.vue"; // Import the Register component
import SingleProduct from "./components/SingleProduct.vue"; // Import the Register component
import Dashboard from "./components/DashboardView.vue"; // Import the Register component
import ProductManagementView from "./components/ProductManagementView.vue"; // Import the Register component
import Error403 from "./components/403Error.vue"; // Import the Register component

const routes = [
  {
    path: "/login", // Add this route
    name: "Login",
    component: LoginView,
    meta: { public: true }, // Mark this route as public
  },
  {
    path: "/403", // Add this route
    name: "403",
    component: Error403,
    meta: { public: false }, // Mark this route as public
  },
  {
    path: "/register", // Add this route
    name: "Register",
    component: RegisterView,
    meta: { public: true }, // Mark this route as public
  },
  {
    path: "/product/:id",
    props: true,
    name: "product",
    component: SingleProduct,
    meta: { public: false }, // Mark this route as public
  },
  {
    path: "/", // Add this route
    name: "Home",
    component: Dashboard,
    meta: { public: false }
  },
  {
    path: "/dashboard", // Add this route
    name: "Dashboard",
    component: Dashboard,
    meta: { public: false }, // Mark this route as public
  },
  {
    path: "/product-management", // Add this route
    name: "ProductManagement",
    component: ProductManagementView,
    meta: { public: false }, // Mark this route as public
  },
  {
    path: "/user-management", // Add this route
    name: "UserManagement",
    component: RegisterView,
    meta: { public: false }, // Mark this route as public
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Check if the user is authenticated (e.g., check if a token is stored)
  const isAuthenticated = !!localStorage.getItem("token");

  if (!to.meta.public && !isAuthenticated) {
    // If the route is not public and the user is not authenticated, redirect to login
    next({ name: "Login" });
  } else {
    // Otherwise, allow navigation
    next();
  }
});

export default router;
