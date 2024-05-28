import "./style.css";

const  CartPage = async () => {
  let title = document.querySelector('title') as HTMLElement;
  title.innerHTML = "Giỏ hàng"

  return `
<div class="main-container">
  <div class="row">
  </div>
</div> `;
};

export default CartPage;
