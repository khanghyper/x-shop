import axios from "axios";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import { render1, renderClitentPages, toast } from "../utils";

export default class ProductDetailPageController {
  sizes: string[] = ["M", "L", "XL"];
  sizeState: string | undefined;
  qtyState: number = 1;

  id: string;
  product: any;
  constructor(elm: HTMLElement, id: string) {
    this.id = id;
    this.init(elm);
  }
  async init(elm: HTMLElement) {
    await this.getProduct();
    await this.productDetailPage(elm);
    this.renderSize();
    this.rennderQty();
    this.selectSize();
    this.handleQty();
    this.addCart()
  }

  getProduct = async () => {
    this.product = await axios
      .get(`http://localhost:4014/api/v1/product/${this.id}`)
      .then((data) => data.data);
    this.sizeState = this.product.categoryId.isSizes
      ? this.sizes[0]
      : undefined;
  };

  productDetailPage = async (elm: HTMLElement) => {
    await renderClitentPages(elm);
    const main = <HTMLDivElement>document.querySelector("#main");
    // render(main,() => ProductDetailPage(id), product.name );
    render1(main, () => ProductDetailPage(this.product));
  };

  renderSize = () => {
    const ab = document.querySelector(".product-sizes-group123");
    if (this.product.categoryId.isSizes) {
      ab!.innerHTML = `
            Kích thước
            <div class="product-sizes123">
                ${this.sizes
                  .map(
                    (item: string) => `
                        <div class="product-size123 ${
                          item === this.sizeState ? "selected-size123" : ""
                        }" data-size=${item}>${item}</div>
                        `
                  )
                  .join("")}
            </div>`;
    }else{
      ab!.remove();
    }
  };
  rennderQty = () => {
    const ab = document.querySelector(".qty-box123");
    ab!.innerHTML = `
<input type="text" value="${this.qtyState}" readonly="">
<div class="btns-qty123">
    <div class="btn-add-qty123">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m16 14-4-4-4 4"></path>
        </svg>
    </div>
    <div class="btn-minus-qty123">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m8 10 4 4 4-4"></path>
        </svg>
    </div>
</div>
    `;
  };
  // feature
  selectSize = () => {
    const sizes = document.querySelectorAll(
      ".product-size123"
    ) as NodeListOf<HTMLElement>;
    sizes.forEach((item) => {
      item.onclick = () => {
        const size = item.dataset.size as string;
        this.sizeState = size;
        this.renderSize();
        this.selectSize();
      };
    });
  };
  handleQty = () => {
    const add = document.querySelector(".btn-add-qty123") as HTMLElement;
    const minus = document.querySelector(".btn-minus-qty123") as HTMLElement;

    add.addEventListener("click", () => {
      this.qtyState = this.qtyState + 1;
      this.rennderQty();
      this.handleQty();
    });
    minus.addEventListener("click", () => {
      if (this.qtyState > 1) {
        this.qtyState = this.qtyState - 1;
        this.rennderQty();
        this.handleQty();    
      }
    });
  };
  addCart =  () => {
    const btn = document.querySelector('.btn-add-to-cart123') as HTMLElement;
    btn.onclick = async () => {
      const user = localStorage.getItem('user') as string;
      const user1 = JSON.parse(user);
      if(user) {
        const cart = await axios.post(`http://localhost:4014/api/v1/cart`, {
          productId: this.id,
          size: this.sizeState,
          qty: this.qtyState
        },{
          headers: {
            token: `Bearer ${user1.accessToken}`
          }
        }).then(data => data.data);
        document.querySelector('.qty-cart')!.innerHTML = cart.reduce((init: number,item:any) => init + item.qty, 0);
        toast({
          title:'Thành công',
          message: 'Thêm giỏ hàng thành công',
          type: 'success'
        })
        this.qtyState = 1;
        this.rennderQty();
        this.handleQty();
        
      }else{
        toast({
          title:'Error',
          message: 'Bạn cần đăng nhập!',
          type: 'error'
        })
      }
    }
  }
}
