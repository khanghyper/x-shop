import axios from "axios";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import { render1, renderClitentPages } from "../utils";
import ProductCard from "../components/ProductCard/ProductCard";

export default class ProductsPageController {
  products: any;
  categories: any;
  pages: any;
  state: { categoryId: string; page: number; sort: string } = {
    categoryId: "0",
    page: 1,
    sort: "0",
  };
  constructor(elm: HTMLElement) {
    this.init(elm);
  }
  // init
  init = async (elm: HTMLElement) => {
    await this.productsPage(elm);
    await this.getProducts();
    await this.getCategories();
    this.getPages();

    await this.render();

    this.filter();
  };

  render = async () => {
    await this.renderRowCategory();
    await this.renderRowPages();
    await this.renderRowProduct();
  };

  renderRowProduct = async () => {
    const rowProducts = document.querySelector(".products-row1") as HTMLElement;
    this.handleQuery();
    await render1(rowProducts, async () =>
      this.products.data.map((item: any) => ProductCard(item)).join("")
    );
  };

  renderRowCategory = async () => {
    const rowCategory = document.querySelector(".a12") as HTMLElement;
    await render1(rowCategory, async () =>
      this.categories
        .map(
          (item: any) => /*html*/ `
    <div class="category-item1" data-id="${item.id}">
        <div class="category-checkbox1 ${
          item.id === this.state.categoryId ? "checked-box1" : ""
        } "></div>
        <span>${item.name}</span>
    </div>`
        )
        .join("")
    );
  };

  renderRowPages = async () => {
    const rowPages = document.querySelector(".b12") as HTMLElement;
    await render1(rowPages, () =>
      [...Array(this.pages)]
        .map((_, i) => i + 1)
        .map(
          (item: number) =>
            `<div class="btn-pagination-num1 ${
              this.state.page === item ? "btn-pagination-num-checked1" : ""
            }" data-page=${item}>${item}</div>`
        )
        .join("")
    );
  };

  // get page
  public productsPage = async (elm: HTMLElement) => {
    await renderClitentPages(elm); // render khung header, footer, trang products

    const main = <HTMLDivElement>document.querySelector("#main");
    await render1(main, ProductsPage);
  };

  // get data
  getProducts = async () => {
    let query = this.handleQuery();
    console.log(query);

    this.products = await axios
      .get(`http://localhost:4014/api/v1/product?${query}`)
      .then((data) => data.data);
  };
  getCategories = async () => {
    let categories = await axios
      .get("http://localhost:4014/api/v1/category")
      .then((data) => data.data);
    this.categories = [
      { id: "0", name: "Tất cả" },
      ...categories.map((item: any) => ({ id: item._id, name: item.name })),
    ];
  };
  getPages = () => {
    const count: number = this.products.count;
    if (count % 12 === 0) {
      this.pages = count / 12;
    } else {
      this.pages = Math.ceil(count / 12);
    }
  };

  // features
  filter = () => {
    const categoryItems = document.querySelectorAll(".a12 .category-item1");
    categoryItems.forEach((item: Element) => {
      item.addEventListener("click", async () => {
        let item1 = item as HTMLElement;
        let id = item1.dataset.id as string;
        this.state.categoryId = id;
        this.state.page = 1;
        await this.getProducts();
        await this.getPages();
        await this.render();
        this.filter();
        window.scroll(0, 0);
      });
    });

    const pages = document.querySelectorAll(".btn-pagination-num1");
    pages.forEach((item: Element) => {
      item.addEventListener("click", async () => {
        let item1 = item as HTMLElement;
        let page = item1.dataset.page as string;
        this.state.page = +page;
        await this.getProducts();
        await this.getPages();
        await this.render();
        this.filter();
        window.scroll(0, 0);
      });
    });

    const sorts = document.querySelector("#sort") as HTMLSelectElement;

    sorts.onchange = async (e: Event) => {
      const target = e.target as HTMLSelectElement;
      this.state.sort = target.value;
      this.state.page = 1;
      await this.getProducts();
      await this.getPages();
      await this.render();
      this.filter();
      window.scroll(0, 0);

    };
  };

  handleQuery = () => {
    let state = this.state;
    let ax = [];
    for (let key in state) {
      if ((state as any)[key] !== "0") {
        ax.push(`${key}=${(state as any)[key]}`);
      }
    }
    return ax.join("&");
  };
}
