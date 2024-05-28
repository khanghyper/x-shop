import ProfilePage from "../pages/ProfilePage/ProfilePage";
import { render1, renderClitentPages } from "../utils";

export default class ProfilePageController {
    constructor(elm: HTMLElement) {
        this.init(elm);
    }
    init = async (elm: HTMLElement) => {
        await this.profilePage(elm);
    } 

    profilePage = async (elm: HTMLElement) => {
        await renderClitentPages(elm);
        const main = <HTMLDivElement>document.querySelector("#main");
        await render1(main, ProfilePage);
    };
}