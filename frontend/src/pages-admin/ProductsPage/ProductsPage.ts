import { formatCurrency, handleDate } from '../../utils';
import './style.css';

const ProductsPage = (product:any, state:any) => {
    const count: number = product.count;
    let pages = 0;
    if (count % state.limit === 0) {
      pages = count / state.limit;
    } else {
      pages = Math.ceil(count / state.limit);
    }
    

  return `
<div class="content-container">
  <div class="title">
      <h3 class="">
          Danh Sách Sản Phẩm
      </h3>
      <a href="#/admin/product/add" class="btn-add-new">
          <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"
                  d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z" />
          </svg>
          Thêm
      </a>
  </div>
  <div class="table">
      <div class="table-container">
          <table style="">
              <thead style="border-bottom: 2px solid rgb(226, 226, 226);">
                  <tr class="">
                      <td style="">#</td>
                      <td style="">Sản phẩm</td>
                      <td style="">Giá</td>
                      <td style="">Số lượng</td>
                      <td style="">Ngày cập nhật</td>
                      <td style="">Trạng thái</td>
                      <td style=""></td>
                  </tr>
              </thead>
              <tbody>
                  ${product.data.map((item:any, index: number) =>`
                <tr class="${(index + 1) % 2  === 0 ? 'abxtest-123' : ''}" style="">
                    <td style="">${index + state.limit * (state.page - 1) + 1}</td>
                    <td style="width: 350px">
                        <div style="display: flex; align-items: center; gap: 20px;">
                            <img style="width: 50px; height: 50px; border: 0.8px solid #d9d9d9;"                          "
                                src="${item.images.length ? item.images[0].url : ''}"
                                alt="">
                            <div>${item.name}</div>
                        </div>
                    </td>
                    <td style="">${formatCurrency(item.price)}</td>
                    <td style="">${item.instock}</</td>
                    <td style="">${handleDate(item.updatedAt)}</td>
                    <td style="">
                        <label class="switch">
                            <input class="active" data-id="${item._id}" type="checkbox" ${item.isActive ? 'checked': ''}>
                            <span class="slider round"></span>
                        </label>
                    </td>
                    <td style="">
                        <div style="display: flex; gap: 20px; justify-content: center; align-items: center;">
                            <a  href="#/admin/product/update/${item._id}"class="btn-detail-ax" style="color: #0c0c9a; font-weight: 400; font-size: 14px; cursor: pointer;" data-id="${item._id}">Chi tiết</a>
                            <div class="btn-del-ax"  style="color: #ee1111; font-weight: 400; font-size: 14px; cursor: pointer;" data-id="${item._id}">Xóa</div>
                        </div>
                    </td>
                </tr>
                  `).join('')}
              </tbody>
          </table>
          <div class="table-bottom">
              <div class="table-bottom-container">
                  <div class="">
                      <div>
                          <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                              fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round"
                                  stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                          </svg>
                      </div>
                      <div>
                        
                        ${[...Array(pages)]
                            .map((_, i) => i + 1)
                            .map(
                              (item: number) =>
                                `<div class="abx-page ${item === state.page ? 'abx-selected': ''}" data-page="${item}">${item}</div>`
                            )
                            .join("")}
                      </div>
                      <div>
                          <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                              fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round"
                                  stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                          </svg>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

</div>
`
}

export default ProductsPage


// ${item.isActive ? `
//                             <div style="display: flex; align-items: center; cursor: pointer;">
//                                 <span
//                                     style="color: #108c10; background-color: #a0d5a066; border-radius: 5px; width: 100px; text-align: center; padding: 10px 0; font-size: 13px;">Kích
//                                     Hoạt</span>
//                             </div>
//                         `: `
//                             <div style="display: flex; align-items: center; cursor: pointer;">
//                                 <span
//                                     style="color: #ee3c3c; background-color: #d743431a; border-radius: 5px; width: 100px; text-align: center; padding: 10px 0; font-size: 13px;">Tạm
//                                     Ngưng</span>    
//                             </div>        
//                         `}