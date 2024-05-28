import HomePage from "../pages/HomePage/HomePage";
import { render1, renderClitentPages } from "../utils";

export default class HomePageController {
    constructor(elm: HTMLElement) {
        this.init(elm);        
    }

    init = async(elm: HTMLElement) => {
        await this.homePage(elm);
    }

    public homePage = async (elm: HTMLElement) => {
        await renderClitentPages(elm);
        const main = <HTMLDivElement>document.querySelector("#main");
        // render(main,HomePage, 'Trang chủ');
        render1(main, HomePage);
    };
}