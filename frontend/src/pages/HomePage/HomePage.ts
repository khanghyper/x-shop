import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import './style.css';
import Product from "../../models/Product";


const HomePage = async () => {
    const products:any = await axios(`http://localhost:4014/api/v1/product`).then(data => data.data);
    const title = <HTMLElement>document.querySelector('title')
    title.innerHTML = 'Trang chủ'

  return `
  <div class="main-container2">
  <nav id="store">
                    <div class="store-container">

                        <div class="store-title">
                            Sản phẩm
                        </div>

                        <div class="other-group">

                            <div class="other-group-item">
                                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24">
                                    <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                                </svg>
                            </div>

                            <div class="other-group-item">
                                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                                </svg>
                            </div>

                        </div>
                    </div>
                </nav>
    <div class="products-row2">
    ${products.data.map((product:Product) => ProductCard(product)).join('')}
    </div>
  </div>
  `
}

export default HomePage