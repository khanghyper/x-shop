import './style.css'

const AddProductPage = ({categories}:any) => {
  return `
<div class="content-container">
  <section class="max-w-4xl p-6 mx-auto">
      <h1 class="text-xl font-bold text-black capitalize">Tạo sản phẩm</h1>
      <form id="form">
          <div class="grid grid-cols-1 gap-6 mt-4">
              <div>
                  <label class="text-black">Tên sản phẩm</label>
                  <input id="name" type="text" id="name"
                      class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              </div>
              <div>
                  <label class="text-black dark:text-gray-200" for="passwordConfirmation">Danh mục</label>
                  <select id="categoryId" name="categoryId" 
                      class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                        ${categories.map((item:any) => `<option value="${item.id}">${item.name}</option>`)}
                  </select>
              </div>
              <div>
                  <label class="text-black dark:text-gray-200" for="passwordConfirmation">Số lượng</label>
                  <input id="instock" type="number" min="0" name="instock"
                      class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              </div>
              <div>
                  <label class="text-black">Giá sản phẩm</label>
                  <input id="price" type="number" name="price"
                      class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              </div>
              <div>
                  <label class="text-black dark:text-gray-200" for="passwordConfirmation">Giảm giá</label>
                  <input id="promotion" type="number" step="10" min="0" max="90" name="promotion"
                      class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              </div>
              <div>
                  <label class="text-black dark:text-gray-200" for="passwordConfirmation">Trạng thái</label>
                  <select id="isActive" name="isActive"
                      class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                      <option value="true">Kích hoạt</option>
                      <option value="false">Tạm ngưng</option>
                  </select>
              </div>
              <div>
                  <label class="text-black">Mô tả</label>
                  <textarea id="description" rows="8" name="description"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Mô tả sản phẩm"></textarea>
              </div>
              <div>
                  <label class="text-black dark:text-gray-200" for="passwordConfirmation">Ảnh</label>
                  <input id="images" type="file" name="images" multiple step="10" min="0" max="90" name="promotion"
                      class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              </div>
          </div>

          <div class="flex justify-end mt-6">
              <button id="btn-sm" type="submit"
                  class="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
          </div>
      </form>
  </section>
</div>
`
}


export default AddProductPage