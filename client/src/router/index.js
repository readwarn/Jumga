import Vue from "vue";
import VueRouter from "vue-router";
import Land from "../views/landing.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Land",
    component: Land
  },
  {
    path: "/markets/:id",
    name: "Market",
    component: () =>
      import("../views/market.vue")
  },
  {
    path: "/markets",
    name: "Platforms",
    component: () =>
      import("../views/platforms.vue")
  },
  {
    path: "/buyer/approval/:orderID/:paymentID",
    name: "Approval",
    component: () =>
      import("../views/approval.vue")
  },
  {
    path: "/seller/approval/:shopID/:paymentID",
    name: "ApprovalSeller",
    component: () =>
      import("../views/approvalSeller.vue")
  },
  {
    path: "/:id/login",
    name: "Login",
    component: () =>
      import("../views/login.vue")
  },
  {
    path: "/:id/register",
    name: "Register",
    component: () =>
      import("../views/register.vue")
  },
  {
    path: "/payment/:id",
    name: "Payment",
    component: () =>
      import("../views/payment.vue")
  },
  {
    path: "/notification",
    name: "Notification",
    component: () =>
      import("../views/notification.vue")
  },
  {
    path: "/onboard",
    name: "Onboard",
    component: () =>
      import("../views/onboard.vue")
  },
  {
    path: "/newProduct/:cc/:id",
    name: "newProduct",
    component: () =>
      import("../views/addProduct.vue")
  },
  {
    path: "/shops/myShop",
    name: "Shop",
    component: () =>
      import("../views/shop.vue")
  },
  {
    path: "/cart/:id",
    name: "Cart",
    component: () =>
      import("../views/cart.vue")
  },
  {
    path: "/market/:cc/items/:id",
    name: "Item",
    component: () =>
      import("../views/item.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
