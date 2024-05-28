import Product from "../../models/Product";
import { formatCurrency } from "../../utils";
import "./style.css";

const ProductDetailPage = async (product: Product) => {
  const title = <HTMLElement>document.querySelector("title");
  title.innerHTML = product.name;

  return `
<div class="main-container123">
  <div class="product-container123">
      <div class="left123" style="position: relative;">
          <div class="product-img123">
              <img src="${product.images[0].url}">
          </div>
          <div class="product-imgs123">
            <img src="${product.images[0].url}">
            <img src="${product.images[0].url}">
            <img src="${product.images[0].url}">
          </div>
      </div>
      <div class="right123">
          <div class="product-name123">
              ${product.name}
          </div>
          <div class="product-group123">
              <div class="brand123">
                  <span>Nhãn hàng:</span>
                  <p class="brand-name123"></p>
              </div>
              <div class="product-rating123">
                  <div class="stars123">
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path
                              d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z">
                          </path>
                      </svg>
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path
                              d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z">
                          </path>
                      </svg>
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path
                              d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z">
                          </path>
                      </svg>
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path
                              d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z">
                          </path>
                      </svg>
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd"
                              d="m13 4-.2-.6a1 1 0 0 0-1.2-.3c-.2 0-.3.2-.3.2l-.2.1c0 .2-.2.3-.3.5a33.9 33.9 0 0 0-2.4 4.4l-4.6.4a2 2 0 0 0-1.1 3.5l3.5 3-1 4.3A2 2 0 0 0 8 21.7l4-2.4c.5-.3.9-1 .9-1.7V4Zm-2 0Z"
                              clip-rule="evenodd"></path>
                      </svg>
                  </div>
                  <div class="product-rating-count123">(25 Người đánh giá)</div>
              </div>
          </div>

          <div class="product-price123" style="display: flex; align-items: center; gap: 1rem;">
            ${product.instock ? `
                ${product.promotion ? `
                    <p style="color: black; font-weight: 400; font-size: 18px;">
                        <strike>${formatCurrency(product.price)}</strike>
                    </p>
                    ${formatCurrency(product.price * (100 - product.promotion)/100)}
                    <div style="color: white; font-size: 14px; font-weight: 400; background: red; padding: 3px 10px">GIẢM ${product.promotion}%</div>
                `: `
                    ${formatCurrency(product.price * (100 - product.promotion)/100)}
                `} 
            `: `
                <p style="color: black; font-weight: 400; font-size: 18px;">
                    ${formatCurrency(product.price)}
                </p>
            `}
            
          </div>
          <div class="product-detail123">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti
              reiciendis minima nisi modi,
              quasi, odio minus dolore impedit fuga eum eligendi? Officia doloremque facere quia.
              Voluptatum, accusantium!
          </div>
          <div class="product-sizes-group123">
              
          </div>
          <div class="product-qty-group123">
              Số lượng
              <div class="qty-box123">
                  
              </div>
          </div>
          ${product.instock ? `
            <div class="btn-add-to-cart123">
                <button>Thêm giỏ hàng</button>
            </div>
          `: `Hết hàng`}
          
      </div>
  </div>
</div>  
`;
};

export default ProductDetailPage;

// <div class="product-size123 selected-size123 ">M</div>
//                   <div class="product-size123">L</div>
//                   <div class="product-size123">XL</div>
