import { formatCurrency } from "../../utils";

const handleDate = (dateString:string) => {
    const date = new Date(dateString);

    // Lấy ngày, tháng, năm từ đối tượng Date
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}


const ORDER_STATUS: any = {
    '0': 'Đang duyệt',
    '1': 'Đang giao',
    '2': 'Thành công',
    '3': 'Hủy đơn'
}

const OrderItem = (order: any) => {
  return `
<div>
  <div style="padding: 10px 5px; display: flex; align-items: center; justify-content: space-between; border: 1px solid #bbbbbb; background: #f4f4f4; color: black; font-weight: 300; font-size: 15px;">
      <div>Mã đơn hàng: ${order.id}</div>
      <div>Đặt ngày: ${handleDate(order.createdAt)}</div>
      <div>Trạng thái: ${ORDER_STATUS[order.status]} </div>
      <div>
        Tổng tiền: 
        <span style="color: red; font-weight: 500; font-size: 15px;">
            ${formatCurrency(order.order.reduce((init:0, item:any) => init + item.price*item.qty, 0))}
        </span>
      </div>
      <div>
          Chi tiết
          <i class="fa-solid fa-caret-down"></i>
      </div>
  </div>
  <div style="border: 0.8px solid #bbbbbb; padding: 10px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px">
        ${order.order.map((item:any) => `
            <div style="display: flex; gap: 1rem;"> 
                <img style="width: 80px; height: 80px; border: 0.8px solid #e4e4e4;" src="${item.image}"/>
                <div>
                    <div style="font-weight: 500; color: black; font-size: 17px;">${item.name} ${item.size ? ' - Size '+ item.size: ''}</div>
                    <div style="font-size: 15px;">${item.qty} x <span style="color: red; font-weight:500;">${formatCurrency(item.price)}</span></div>
                </div>
            </div>
        `).join('')}
      
  </div>
</div>  
`
}

export default OrderItem