import "./style.css";


const ProductsPage = async () => {
  let title = document.querySelector('title');
  title!.innerHTML = 'Tất cả sản phẩm';
   
  return /*html*/`
<div class="main-container1">
  <div class="left1">
      <div class="filter-box1">
          <div class="categories-box1">
              <div class="categories-title1">
                  Loại Sản Phẩm
              </div>
              <div class="a12" style="display: flex; flex-direction: column; gap: 10px;">
              </div>
          </div>
          <div class="categories-box1">
              <div class="categories-title1">
                  Lọc Theo Giá
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                  <div class="category-item1">
                      <div class="category-checkbox1 checked-box1"></div>
                      <span>Tất Cả</span>
                  </div>
                  <div class="category-item1">
                      <div class="category-checkbox1"></div>
                      <span>Tất Cả</span>
                  </div>
                  <div class="category-item1">
                      <div class="category-checkbox1"></div>
                      <span>Tất Cả</span>
                  </div>
                  <div class="category-item1">
                      <div class="category-checkbox1"></div>
                      <span>Tất Cả</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div class="right1">
      <div class="products-box1">
          <div style="display: flex; justify-content: space-between; padding: 20px 0; ">
              <div class="search-box1">
                  <input type="text" placeholder="Tìm Kiếm Sản Phẩm">
                  <i class="fa-solid fa-magnifying-glass"></i>
              </div>   
              <div>
                  <select name="sort" id="sort" style="width: 120px; padding: 10px 5px; outline: none; border-radius: 3px; border: 1px solid rgb(201, 201, 201);">
                      <option value="0">Mặc Định</option>
                      <option value="price">Giá Tăng Dần</option>
                      <option value="-price">Giá Giảm Dần</option>
                      <option value="name">Tên Từ A-Z</option>
                      <option value="-name">Tên Từ Z-A</option>
                  </select>
              </div>
          </div>
          <div class="products-row1">
          </div>
          <div class="pagination1">
              <div class="pagination-box1">
                  <div class="btn-pagination1"><i class="fa-solid fa-chevron-left"></i></div>
                  <div class="b12" style="display: flex;"></div>   
                  <div class="btn-pagination1"><i class="fa-solid fa-chevron-right"></i></div>
              </div>
          </div>
      </div>
  </div>
</div>
  `;
};

export default ProductsPage;

// <div class="btn-pagination-num1 btn-pagination-num-checked1" data-page=1>1</div>
//                   <div class="btn-pagination-num1" data-page=2>2</div>
//                   <div class="btn-pagination-num1" data-page=3>3</div>
//                   <div class="btn-pagination-num1" data-page=4>4</div>

// <div class="category-item1">
// <div class="category-checkbox1 checked-box1"></div>
// <span>Tất Cả</span>
// </div>
// <div class="category-item1">
// <div class="category-checkbox1"></div>
// <span>Tất Cả</span>
// </div>
// <div class="category-item1">
// <div class="category-checkbox1"></div>
// <span>Tất Cả</span>
// </div>
// <div class="category-item1">
// <div class="category-checkbox1"></div>
// <span>Tất Cả</span>
// </div>