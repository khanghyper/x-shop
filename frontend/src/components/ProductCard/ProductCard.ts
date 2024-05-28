import { formatCurrency } from "../../utils"
import './style.css';

interface Product {
  name: string, 
  price: number, 
  _id: string, 
  images: {
    url: string,
    publicId: string,
    _id: string
  }[],
  description: string,
  promotion: number,
  isActive:boolean,
  instock: number
}

const ProductCard = (product:Product) => {
  return `
<div class="product-card" data-id="${product._id}">
  <a href="#/products/${product._id}">
      <img loading="lazy" class="product-image" src="${product.images[0].url}">
  </a>
  <div class="product-card-container">
      <div class="product-card-name">
          <p>${product.name}</p>
      </div>
      ${product.instock ? `
        <div class="product-card-price">
        ${product.promotion ? `
          <p>${formatCurrency(product.price * (100 - product.promotion)/100)}</p>
          <strike style="font-size: 13px">${formatCurrency(product.price)}</strike> 
        `: `
          <p style="color: black; font-weight: 400;">${formatCurrency(product.price)}</p>
        `}
        </div>
      `: `<p style="color: black; font-weight: 400;">${formatCurrency(product.price)}</p>`}
      
  </div>
  ${product.instock ? `
    ${product.promotion ? `
      <div class="product-hot" style="background: red; border-radius: 0;">- ${product.promotion}%</div>
    `: ``} 
  ` : `<div class="product-hot" style="background: white; border-radius: 0; color: black; font-weight: 400; border: 1px solid #dfdfdf;">Hết hàng</div>`}
   
</div>
  `
}

// <div class="product-card-btn-add">
//             <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
//             </svg>  
//             <div class="add-icon">+</div>
//             <div class="show-btn-info">Thêm giỏ hàng</div>
//           </div>
export default ProductCard