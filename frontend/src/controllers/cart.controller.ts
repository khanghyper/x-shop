import axios from "axios";
import CartPage from "../pages/CartPage/CartPage";
import { render1, renderClitentPages, router, toast } from "../utils";
import EmptyCartNonUser from "../components/EmptyCartNonUser/EmptyCartNonUser";
import EmptyCartUser from "../components/EmptyCartUser/EmptyCartUser";
import Cart from "../components/Cart/Cart";

export default class CartPageController {
    cart:any;
    user:any;

    constructor(elm: HTMLElement) {
        this.init(elm);
    }
    init = async (elm: HTMLElement) => {
        await this.cartPage(elm);
        await this.getCart();

        this.render();
        this.handleDel();
        this.handleQty();
        this.handleCheckout();
    } 

    cartPage = async (elm: HTMLElement) => {
        await renderClitentPages(elm);
        const main = <HTMLDivElement>document.querySelector("#main");
        await render1(main, CartPage);
    };

    getCart = async () => {
        let user = localStorage.getItem('user');
        
        if(user) {
            this.user = JSON.parse(user);

            this.cart = await axios.get(`http://localhost:4014/api/v1/cart`, {
                headers: {
                    token: `Bearer ${this.user.accessToken}`
                }
            }).then(data => data.data);
        }
        
    }

    render = () => {
        const a1 = document.querySelector('.row') as HTMLElement;
        if(!this.user) {
            a1.innerHTML = EmptyCartNonUser();
        }else{
            if(!this.cart.length){
                a1.innerHTML = EmptyCartUser();
            }else{
                a1.innerHTML = Cart(this.cart, this.user);
            }
        }
    }

    // features
    handleDel = () => {
        if(this.user && this.cart.length){
            const dels = document.querySelectorAll('.item-remove1') as NodeListOf<HTMLElement>;
            dels.forEach(item => {
                item.onclick = async () => {
                    let index = item.dataset.index;
                    
                    const delCart = await axios.delete(`http://localhost:4014/api/v1/cart/del/${index}`, {
                        headers: {
                            token: `Bearer ${this.user.accessToken}`
                        }
                    }).then(data => data.data);
                    this.cart = delCart;
                    document.querySelector('.qty-cart')!.innerHTML = this.cart.reduce((init: number,item:any) => init + item.qty, 0);
                    this.render();
                    this.handleDel();
                    this.handleQty();
                }
            })
        }
    }
    handleQty = () => {
        if(this.user && this.cart.length){
            const add = document.querySelectorAll('.qty-add') as NodeListOf<HTMLElement>;
            const minus = document.querySelectorAll('.qty-minus') as NodeListOf<HTMLElement>
            add.forEach(item => {
                item.onclick = async () => {
                    const index = item.dataset.index;
                    console.log(index);
                    
                    const cart = await axios.post(`http://localhost:4014/api/v1/cart/add-qty/${index}`,{}, {
                        headers: {
                            token: `Bearer ${this.user.accessToken}`
                        }
                    }).then(data => data.data);

                    this.cart = cart;
                    document.querySelector('.qty-cart')!.innerHTML = this.cart.reduce((init: number,item:any) => init + item.qty, 0);
                    this.render();
                    this.handleQty();
                    this.handleDel();
                }
            })
            minus.forEach(item => {
                item.onclick = async () => {
                    const index = item.dataset.index;
                    const cart = await axios.post(`http://localhost:4014/api/v1/cart/minus-qty/${index}`,{}, {
                        headers: {
                            token: `Bearer ${this.user.accessToken}`
                        }
                    }).then(data => data.data);

                    this.cart = cart;
                    document.querySelector('.qty-cart')!.innerHTML = this.cart.reduce((init: number,item:any) => init + item.qty, 0);
                    this.render();
                    this.handleQty();
                    this.handleDel();
                }
            })
        }
    }

    handleCheckout = () => {
        const btnCheckout = document.querySelector('.btn-checkout') as HTMLElement;
        if(btnCheckout) {
            btnCheckout.onclick = async () =>{
                try {
                    await axios.post(`http://localhost:4014/api/v1/order`, {}, {
                        headers: {
                            token: `Bearer ${this.user.accessToken}`
                        }
                    })
                    toast({
                        type: 'success',
                        message: 'Đặt hàng thành công!',
                        title: 'Thành công'
                    })
                    router.navigate('/');
                } catch (error) {
                    toast({
                        type: 'error',
                        message: 'Có lỗi xãy ra!',
                        title: 'Lỗi'
                    })
                }            
            }
        }

        
    }
}