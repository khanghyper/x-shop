import axios from "axios";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import { render1, renderClitentPages } from "../utils";
import ProductCard from "../components/ProductCard/ProductCard";

export default class CheckOutPageController {

  constructor(elm: HTMLElement) {
    this.init(elm);
  }
  // init
  init = async (elm: HTMLElement) => {
    await this.productsPage(elm);

    await this.render();

  };

  render = async () => {
  };

  // get page
  public productsPage = async (elm: HTMLElement) => {
    await renderClitentPages(elm); // render khung header, footer, trang products

    const main = <HTMLDivElement>document.querySelector("#main");
    await render1(main, ProductsPage);
  };
}
