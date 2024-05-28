import OrderItem from "../OrderItem/OrderItem";

const OrderPage = (orders: any) => {
    return `
  <div class="main-container">
      <div class="row">
          <div style="width: 100%;">
              <div style="font-weight: 500; font-size: 30px; text-align: center; color: black; padding: 2rem 0; width: 100%; border-bottom: 0.8px dotted gray;">
                  Đơn hàng của bạn
              </div>
              <div style="display: flex; width: 100%; padding: 1rem 0; gap: 20px;">
                    <div style="flex: 1; min-height: 100px; border-right: 1px dotted gray;">
                        <ul style="list-style: none;">
                            <li style="padding: 5px 0; color: black; font-size: 17px;">
                                <a style="text-decoration: none; color: black;" href="#/profile">Thông tin tài khoản</a>
                            </li>
                            <li style="padding: 5px 0; color: black; font-size: 17px;">
                                <a style="text-decoration: none; color: black;" href="#/profile/order">Đơn hàng của bạn</a>
                            </li>
                            <li style="padding: 5px 0; color: black; font-size: 17px;">
                                <a style="text-decoration: none; color: black;" href="#/logout">Đăng xuất</a>
                            </li>
                        </ul>
                    </div>
                    <div style="flex: 3; display: flex; gap: 20px; flex-direction: column;">
                        ${orders.map((item: any) => OrderItem(item)).join('')}
                    </div>
              </div>
          </div>
      </div>
   </div>`;
  };
  
  export default OrderPage;
  