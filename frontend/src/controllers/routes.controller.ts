import axios from "axios";
import CartPage from "../pages/CartPage/CartPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import { render1, renderClitentPages, router, toast } from "../utils";

export default class RoutesControllers {
  static homePage = async (elm: HTMLElement) => {
    await renderClitentPages(elm);
    const main = <HTMLDivElement>document.querySelector("#main");
    // render(main,HomePage, 'Trang chủ');
    render1(main, HomePage);
  };
  static productsPage = async (elm: HTMLElement) => {
    await renderClitentPages(elm);
    const main = <HTMLDivElement>document.querySelector("#main");
    await render1(main, ProductsPage);
  };

  static aboutPage = async (elm: HTMLElement) => {
    await renderClitentPages(elm);
    const main = <HTMLDivElement>document.querySelector("#main");
    main.innerHTML = "about";
  };

  static productDetailPage = async (elm: HTMLElement, id: string) => {
    await renderClitentPages(elm);
    const main = <HTMLDivElement>document.querySelector("#main");
    // render(main,() => ProductDetailPage(id), product.name );
    // render1(main, () => ProductDetailPage(this.));
  };

  static cartPage = async (elm: HTMLElement) => {
    await renderClitentPages(elm);
    const main = <HTMLDivElement>document.querySelector("#main");
    await render1(main, CartPage);

    const cartItems = document.querySelectorAll(".media-line-item");

    cartItems.forEach((elm) => {
      elm.addEventListener("click", async (e: Event) => {
        const target = e.target as HTMLElement;

        if (target.matches(".item-remove")) {
          const del = async () => {
            let user = localStorage.getItem("user") as string;
            let ax: { name: string; accessToken: string } = JSON.parse(user);
            const id = target.dataset.id;
            await axios.post(
              "http://localhost:4014/api/v1/cart/del",
              {
                productId: id,
              },
              {
                headers: {
                  token: `Bearer ${ax.accessToken}`,
                },
              }
            );
            await render1(main, CartPage);
            await del();
          };
        }
      });
    });
  };

  static loginPage = async (elm: HTMLElement) => {
    await renderClitentPages(elm);
    const main = <HTMLDivElement>document.querySelector("#main");
    const user = localStorage.getItem("user");
    const historyRoute = router.lastResolved();
    const historyUrl = historyRoute?.[0].url;
    console.log(historyUrl);

    if (user) {
      if (historyUrl) return router.navigate(`/${historyUrl}`);
      else return router.navigate("/");
    }

    await render1(main, LoginPage);
    RoutesControllers.handleLogin();
  };

  static handleLogin = () => {
    const form = document.querySelector("#form") as HTMLFormElement;
    form.addEventListener("submit", async (e: Event) => {
      e.preventDefault();

      const username = <HTMLInputElement>document.querySelector("#username");
      const password = <HTMLInputElement>document.querySelector("#password");
      let messageElm = document.querySelector(".message") as HTMLElement;

      username.oninput = () => {
        messageElm.innerHTML = "";
      };
      password.oninput = () => {
        messageElm.innerHTML = "";
      };
      const login = await axios
        .post("http://localhost:4014/api/v1/auth/login", {
          username: username.value,
          password: password.value,
        })
        .then((data) => data.data)
        .catch((response: any) => response.response.data);

      if (login.MC) {
        const accessToken = login.data.accessToken;
        // const name = login.data.name;
        localStorage.setItem("user", JSON.stringify({ ...login.data}));
        router.navigate("/");
        toast({ message: "Thành công!", type: "success" });
      } else {
        messageElm.innerHTML = login.MS;
      }
    });
  };

  static handleLogout = () => {
    localStorage.removeItem("user");
    router.navigate("/");
    toast({
      message: "Đăng xuất thành công!",
      type: "success",
      title: "Thành công!",
    });
  };
}
