import axios from "axios";
import OrderPage from "../pages/OrderPage/OrderPage";
import { renderClitentPages } from "../utils";

export default class OrderPageController {
    orders:any;
    user: any;

    constructor(elm: HTMLElement) {
        this.init(elm);
    }
    init = async (elm: HTMLElement) => {
        await this.getOrders()
        await this.render(elm);
    } 

    getOrders = async () => {
        this.user = JSON.parse(localStorage.getItem('user') as string);
        this.orders = await axios.get('http://localhost:4014/api/v1/order/by-user', {
            headers: {
                token: `Bearer ${this.user.accessToken}`
            }
        }).then(data => data.data);
                
    }

    render = async (elm: HTMLElement) => {
        await renderClitentPages(elm);
        const main = <HTMLDivElement>document.querySelector("#main");
        main.innerHTML = OrderPage(this.orders);
    };
}