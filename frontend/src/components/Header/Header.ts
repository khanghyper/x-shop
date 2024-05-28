import axios from 'axios';
import './style.css';

const Header = async () => {
    let user = localStorage.getItem('user');
    let abx = ''
    if(!user){
        abx = `
        <a href="#/login" style="text-decoration: none; color: black">
            <div class="user-icon" style="display: flex; gap: 5px;">
                Tài Khoản
                <i class="fa-regular fa-user"></i>
            </div>
        </a>
        <div class="cart-icon">
            <a href="#/cart">
                <svg class="w-6 h-6 ext-gray-800 dark:text-whitet" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 1 12c0 .5-.5 1-1 1H6a1 1 0 0 1-1-1L6 8h12Z" />
                </svg>
            </a>
            <div class="qty-cart">0</div>
        </div>
        `
    }else{
        let ax:any = JSON.parse(user);
        let cart:any[] = await axios.get('http://localhost:4014/api/v1/cart', {
            headers:{
                token: `Bearer ${ax.accessToken}`
            }
        }).then(data => data.data);
        
        abx = `
        <div class="in4">
            <div class="user-icon" style="display: flex; gap: 5px;">
                    Chào, ${ax.name}
            </div>
            <div class="in4-container">
                <div class="in4-item">
                    <i class="fa-regular fa-circle-user"></i>
                        <a href="#/profile">Thông tin</a>
                    <span></span>
                </div>
                ${ax.isAdmin ? `
                <div class="in4-item">
                    <i class="fa-solid fa-user-tie"></i>
                        <a href="#/admin">Admin</a>
                    <span></span>
                </div>
                `: ''}
                <div class="in4-item">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <a href="#/logout">Đăng xuất</a>
                    <span></span>
                </div>
            </div>
        </div>
        <div class="cart-icon">
            <a href="#/cart">
                <svg class="w-6 h-6 ext-gray-800 dark:text-whitet" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 1 12c0 .5-.5 1-1 1H6a1 1 0 0 1-1-1L6 8h12Z" />
                </svg>
            </a>
            <div class="qty-cart">${cart.reduce((init:number, item:any) => init + item.qty ,0)}</div>
        </div>
        `
    }
    
  return `
  <header id="header" class="">
            <div class="header-container">

                <nav class="nav-links-group">
                    <ul class="nav-links-group-container">
                        <li class="nav-links-item">
                            <a class="" href="#/">Cửa hàng
                            </a>
                        </li>
                        <li class="nav-links-item">
                            <a class="" href="#/products">Tất Cả Sản Phẩm
                            </a>
                        </li>
                    </ul>
                </nav>

                <div class="logo-container">
                    <a class="" href="#/">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.53 0 2.03 2.03 0 0 0 .65-.488c.185-.209.332-.457.433-.73.1-.273.152-.566.152-.861 0-.974-1.108-3.85-1.618-5.121A.983.983 0 0 0 17.466 4H6.456a.986.986 0 0 0-.93.645C5.045 5.962 4 8.905 4 9.736c.023.59.241 1.148.611 1.567.37.418.865.667 1.389.697Zm0 0c.328 0 .651-.091.94-.266A2.1 2.1 0 0 0 7.66 11h.681a2.1 2.1 0 0 0 .718.734c.29.175.613.266.942.266.328 0 .651-.091.94-.266.29-.174.537-.427.719-.734h.681a2.1 2.1 0 0 0 .719.734c.289.175.612.266.94.266.329 0 .652-.091.942-.266.29-.174.536-.427.718-.734h.681c.183.307.43.56.719.734.29.174.613.266.941.266a1.819 1.819 0 0 0 1.06-.351M6 12a1.766 1.766 0 0 1-1.163-.476M5 12v7a1 1 0 0 0 1 1h2v-5h3v5h7a1 1 0 0 0 1-1v-7m-5 3v2h2v-2h-2Z"/>
                  </svg>
                  
                        SHOPX
                    </a>
                </div>

                <div class="user-group">
                    
                    ${abx}

                </div>
            </div>
        </header>
  `
}

export default Header

// ${user ? `
//                     <div style="text-decoration: none; color: black">
//                         <div class="user-icon" style="display: flex; gap: 5px;">
//                             Chào mừng, ${JSON.parse(user).username}
//                         </div>
//                     </div>
//                     `: `
                    
//                     `}

// <div class="popup-cart">
//                             <div class="popupcart-item-hodler">
//                                 <div class="popupcart-item">
//                                     <a href="">
//                                         <img src="https://res.cloudinary.com/doblimgca/image/upload/v1711558100/xshop/d9bsl2vag1xldp3t5b38.jpg" style="width: 85px; height: 85px; border: 1px solid silver"/>
//                                     </a>
//                                     <div class="popupcart-text">
//                                         <div class="popupcart-in4">
//                                             <span class="popupcart-name">áo1</span>
//                                             <span class="popupcart-qty">x1</span>
//                                         </div>
//                                         <div class="popupcart-price">
//                                             120.000đ
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="popupcart-item">
//                                     <a href="">
//                                         <img src="https://res.cloudinary.com/doblimgca/image/upload/v1711558100/xshop/d9bsl2vag1xldp3t5b38.jpg" style="width: 85px; height: 85px; border: 1px solid silver"/>
//                                     </a>
//                                     <div class="popupcart-text">
//                                         <div class="popupcart-in4">
//                                             <span class="popupcart-name">áo1</span>
//                                             <span class="popupcart-qty">x1</span>
//                                         </div>
//                                         <div class="popupcart-price">
//                                             120.000đ
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="popupcart-item">
//                                     <a href="">
//                                         <img src="https://res.cloudinary.com/doblimgca/image/upload/v1711558100/xshop/d9bsl2vag1xldp3t5b38.jpg" style="width: 85px; height: 85px; border: 1px solid silver"/>
//                                     </a>
//                                     <div class="popupcart-text">
//                                         <div class="popupcart-in4">
//                                             <span class="popupcart-name">áo1</span>
//                                             <span class="popupcart-qty">x1</span>
//                                         </div>
//                                         <div class="popupcart-price">
//                                             120.000đ
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div class="cart-price-hover">
//                                 <p>
//                                     Tổng tiền hàng (<span style="color: red">4 sản phẩm</span>): <span style="color: red; font-weight: 500; font-size: 20px;">1.000.000 đ</span>
//                                 </p>
//                                 <a class="gocart" href="#/cart">thanh toán ngay</a>
//                             </div>
//                         </div>