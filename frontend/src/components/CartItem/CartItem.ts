import { formatCurrency } from "../../utils"

// const CartItem = (item:any) => {
//   return `
//   <div class="media-line-item">
//   <div class="media-left">
//       <div class="item-img">
//           <a href="#/products/${item.productId}">
//             <img src="${item.image}" alt="">
//           </a>
//       </div>
//       <div class="item-remove" data-index="${item.index}" data-id="${item.productId}">
//           Xóa
//       </div>
//   </div>
//   <div class="media-right">
//       <div class="item-info">
//           <div class="item-title">${item.name} ${item.size ? ` - Size ${item.size}`: ''}</div>
//       </div>
//       <div class="item-price">
//           <p>
//               <span>${formatCurrency(item.price)}</span>
//           </p>
//       </div>
//   </div>
//   <div class="media-total">
//       <div class="item-total-price">
//           <span>${formatCurrency(item.qty * item.price )}</span>
//       </div>
//       <div class="item-qty">
//           <div class="qty">
//               <button class="qty-btn qty-minus" data-index="${item.index}" data-id="${item.productId}">-</button>
//               <input type="text" class="item-quantity" value="${item.qty}">
//               <button class="qty-btn qty-add" data-index="${item.index}" data-id="${item.productId}">+</button>
//           </div>
//       </div>
//   </div>
// </div>
//   `
// }

const CartItem = (item: any) => {
    
    return `
<div style="padding: 1rem; display: flex; font-weight: 400; font-size: 16px; background: white; border-bottom: 0.8px dotted #dbdbdb;">
    <div style="width: 50%; display: flex; gap: 10px;">
        <div>
            <img src="${item.image}" style="width: 80px; height: 80px; border: 1px solid #bcbcbc;"/>
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px; ">
            <div style="color: black;">${item.name}</div>
            ${item.size ? `<div>Size: ${item.size}</div>` : ''}
            
        </div>
    </div>
    <div style="width: 12.5%; text-align: center; padding-top: 20px;">${formatCurrency(item.price)}</div>
    <div style="width: 12.5%; text-align: center; display: flex; gap: 5px; justify-content: center; padding-top: 20px;">
        <div class="qty-minus" style="width: 25px; height: 25px; background: #cfcfcf; border-radius: 50%; cursor: pointer; line-height: 25px;" data-index="${item.index}" data-id="${item.productId}">-</div>
        <div style="width: 40px;">${item.qty}</div>
        <div class="qty-add" style="width: 25px; height: 25px; background: #cfcfcf; border-radius: 50%; cursor: pointer; line-height: 28px;" data-index="${item.index}" data-id="${item.productId}">+</div>
    </div>
    <div style="width: 12.5%; text-align: center; color: red; padding-top: 20px;">${formatCurrency(item.price * item.qty)}</div>
    <div class="item-remove1" style="width: 12.5%; text-align: center; cursor: pointer; padding-top: 20px;" data-index="${item.index}">
        <i class="fa-regular fa-trash-can"></i>
        Xóa
    </div>
</div>   
`
}


export default CartItem