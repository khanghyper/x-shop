import { formatCurrency } from "../../utils";
import CartItem from "../CartItem/CartItem";

// const Cart = (cart:any[]) => {
//   return `
// <div class="left">
//   <div class="header-cart">
//       <div>Giỏ Hàng Của Bạn</div>
//   </div>
//   <div class="list-pageform-cart">
//       <div class="cart-formpage">
//           <div class="cart-row">
//               <p class="title-number-cart">
//                   Bạn đang có <span class="count-cart">
//                       ${cart.reduce((init:number, item:any) => init + item.qty ,0)} sản phẩm
//                   </span> trong giỏ hàng
//               </p>
//               <div class="table-cart">
//                   ${cart.map((item:any, index:number) => CartItem({...item, index})).join('')}
//               </div>
//           </div>
//       </div>
//   </div>
// </div>
// <div class="right">
//   <div class="wrap-order-summary">
//       <div class="order-summary-block">
//           <div class="summary-title">Thông tin đơn hàng</div>
//           <div class="summary-total">
//               <p>Tổng tiền: <span>${ formatCurrency(cart.reduce((init:number, item:any) => init + (item.price* item.qty) ,0))}</span></p>
//           </div>
//           <div class="summary-action">
//               <p>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
//               <p>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</p>
//               <div class="summary-button">
//                   <a href="#/checkout">thanh toán</a>
//               </div>
//           </div>
//       </div>
//   </div>
// </div>
// <div style="display: flex">
// 123
// </div>
// `
// }

const Cart = (cart:any[], user:any) => {
    // const main = document.querySelector('#main') as HTMLElement;
    // main.style.background = 'rgb(244 244 244)';
  return `
    <div style="width: 100%">
        <div style="background: white; display: flex; justify-content: space-between; align-items: center; color: black; padding: 1rem; font-weight: 500; font-size: 16px; text-transform: uppercase;  border-bottom: 0.8px dotted #d5d5d5;">
            <div>Thông tin giỏ hàng</div>
            <div style="display: flex; gap: 2rem; cursor: pointer;">
                <div>
                    <i class="fa-solid fa-arrow-left-long" style="margin-right: 5px;"></i>
                    Chọn tiếp sản phẩm khác</div>
                <div style="cursor: pointer">Xóa giỏ hàng</div>
            </div>
        </div>
        <div style="padding: 1rem; display: flex; font-weight: 400; font-size: 16px; background: white; border-bottom: 0.8px dotted #b4b4b4;">
            <div style="width: 50%">Sản phẩm</div>
            <div style="width: 12.5%; text-align: center">Đơn giá</div>
            <div style="width: 12.5%; text-align: center">Số lượng</div>
            <div style="width: 12.5%; text-align: center">Số tiền</div>
            <div style="width: 12.5%; text-align: center">Thao tác</div>
        </div>
        <div class="a123" style="margin-top: 15px">
            ${cart.map((item:any, index:number) => CartItem({...item, index})).join('')}
        </div>
        <div style="margin-top: 15px; background: white; display: flex; padding: 15px 10px; gap: 10px;">
            <div style="padding: 5px 0; width: 30%">
                <div style="text-transform: uppercase; font-weight: 500; font-size: 16px; color: black; display: flex; gap: 10px; align-items: center;">
                    <i class="fa-solid fa-map-location-dot"></i>
                    địa chỉ nhận hàng
                </div>
                <div style="width: 100%; padding: 10px 0; display: flex; flex-direction: column; gap: 15px;">
                    <div style="width: 100%;">
                        <input readonly value="${user.name}" type="text" style="width: calc(100% - 30px); padding: 12px 15px; font-size: 15px; outline: none; background: rgb(244 244 244); border: 0.8px solid #b5b5b5;" placeholder="Họ tên">
                    </div>
                    <div style="width: 100%;">
                        <input readonly value="${user.email}" type="text" style="width: calc(100% - 30px); padding: 12px 15px; font-size: 15px; outline: none; background: rgb(244 244 244); border: 0.8px solid #b5b5b5;" placeholder="Email">
                    </div>
                    <div style="width: 100%;">
                        <input readonly value="${user.address}" type="text" style="width: calc(100% - 30px); padding: 12px 15px; font-size: 15px; outline: none; background: rgb(244 244 244); border: 0.8px solid #b5b5b5;" placeholder="Địa chỉ">
                    </div>
                    <div style="width: 100%;">
                        <input readonly value="${user.phone}" type="text" style="width: calc(100% - 30px); padding: 12px 15px; font-size: 15px; outline: none; background: rgb(244 244 244); border: 0.8px solid #b5b5b5;" placeholder="Số điện thoại">
                    </div>
                </div>
            </div>
            <div style="width: 30%;">
                <div style="width: 100%; padding: 5px 0;">
                    <div style="height: 24px;"></div>
                    <div style="padding: 10px 0;">
                        <div style="width: 100%;">
                            <input class="description" type="text" style="width: calc(100% - 30px);height: 176px; padding: 12px 15px; font-size: 15px; outline: none; background: rgb(244 244 244); border: 0.8px solid #b5b5b5;" placeholder="Ghi chú">
                        </div>
                    </div>
                </div>
            </div>
            <div style="padding: 5px 0; width: 40%">
                <div style="text-transform: uppercase; font-weight: 500; font-size: 16px; color: black; display: flex; gap: 10px; align-items: center;">
                    <i class="fa-solid fa-credit-card"></i>
                    hình thức thanh toán
                </div>
                <div style="width: 100%; padding: 10px 0;">
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <input type="checkbox" checked/>
                            Thanh toán trước khi nhận hàng - COD
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <input type="checkbox"/>
                            Thanh toán trước khi chuyển khoản
                        </div>
                    </div>
                    <div style="background: rgb(244 244 244); width: 100%;">
                        <div style="padding: 10px; display: flex;">
                            <input style="font-size: 16px; padding: 10px 5px ;width: 60%; outline: none; border: 0.8px solid #e4e4e4;" placeholder="Mã voucher"/>
                            <button style="font-size: 16px; padding: 5px ;width: 40%; display: flex; gap: 5px; justify-content: center; border: none; background: red; color: white; align-items: center;">
                                <i class="fa-solid fa-ticket"></i>
                                Nhập mã voucher
                            </button>
                        </div>
                    </div>
                    <div>
                        <p style="text-align: right; padding: 5px 0; font-weight: 300; font-size: 15px;">Tổng tiền hàng (<span style="color: red;">${cart.reduce((init: number, item:any) => init + item.qty,0)} sản phẩm</span>): <span style="color: red; font-weight: 500; font-size: 20px">${formatCurrency(cart.reduce((init: number, item:any) => init + item.qty * item.price,0))}</span></p>
                    </div>
                    <div style="width: 100%;">
                        <button class="btn-checkout" style="width: 100%; text-transform: uppercase; padding: 18px 0; border: none; background: red; color: white; font-weight: 500; font-size: 17px; cursor: pointer;">đặt mua ngay</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
};

export default Cart;
