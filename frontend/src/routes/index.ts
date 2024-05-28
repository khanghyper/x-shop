import AdminAddProductPageController from "../controllers/adminAddProductController";
import AdminProductPageController from "../controllers/adminProduct.controller";
import AdminUpdateProductPageController from "../controllers/adminUpdateProduct.controller";
import CartPageController from "../controllers/cart.controller";
import HomePageController from "../controllers/home.controller";
import OrderPageController from "../controllers/order.controller";
import ProductDetailPageController from "../controllers/productDetail.controller";
import ProductsPageController from "../controllers/products.controller";
import ProfilePageController from "../controllers/profile.controller";
import RegisterPageController from "../controllers/register.controller";
import RoutesControllers from "../controllers/routes.controller";
import AddProductPage from "../pages-admin/AddProductPage/AddProductPage";
import {router } from "../utils";

const initRoutes = (elm: HTMLElement) => {
  router.on("/", () => {
    new HomePageController(elm);
    window.scroll(0, 0);
  });

  router.on("/products", () => {
    new ProductsPageController(elm);
    window.scroll(0, 0);
  });
  router.on("/products/:id", ({ data: { id } }: any) => {
    // RoutesControllers.productDetailPage(elm, id);
    new ProductDetailPageController(elm, id);
    window.scroll(0, 0);
  });

  router.on("/cart", () => {
    new CartPageController(elm);
    window.scroll(0, 0);
  });

  router.on("/profile", () => {
    new ProfilePageController(elm);
    window.scroll(0, 0);
  });
  router.on("/profile/order", () => {
    new OrderPageController(elm);
    window.scroll(0, 0);
  });

  router.on("/login", () => {
    RoutesControllers.loginPage(elm);
    window.scroll(0, 0);
  });
  router.on("/register", () => {
    new RegisterPageController(elm);
    window.scroll(0, 0);
  });
  router.on("/logout", () => {
    RoutesControllers.handleLogout();
  });

  router.on('/admin', () => {
    const app = document.querySelector('#app') as HTMLElement;
    app.innerHTML = '<a href="/admin/product">sản phẩm</a>';
    router.navigate('/admin/product')
    window.scroll(0, 0);
  })

  router.on('/admin/product', () => {
    new AdminProductPageController(elm);
    window.scroll(0, 0);
  })
  router.on("/admin/product/update/:id", ({ data: { id } }: any) => {
    // RoutesControllers.productDetailPage(elm, id);
    new AdminUpdateProductPageController(elm, id);
    window.scroll(0, 0);
  });

  router.on('/admin/product/add', () => {
    new AdminAddProductPageController(elm);
    window.scroll(0, 0);
  })

  router.notFound(() => {
    const app = document.querySelector(`#app`) as HTMLElement;
    app.innerHTML = `<h1>404 NOTFOUND</h1>`;
  });
  router.resolve();
};

export default initRoutes;
