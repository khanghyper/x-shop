
const EmptyCartNonUser = () => {
  return `
<div style="width: 100%">
  <div style="display: flex; align-item: center; justify-content: center; width: 100%">
      <img src="https://bili.vn/images/empty-cart.png"/>
  </div>
  <div style="text-align: center; font-weight: 400; margin-top: 20px">Bạn cần đăng nhập để mua hàng </div>
  <a style="text-align: center; display: block;" href="#/login">Đăng nhập</a>
</div>
`
}

export default EmptyCartNonUser