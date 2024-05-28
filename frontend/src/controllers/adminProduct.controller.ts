import axios from "axios";
import ProductsPage from "../pages-admin/ProductsPage/ProductsPage";
import { renderAdminPages, router, toast } from "../utils";

export default class AdminProductPageController {
  user: any;
  products: any;
  state: { page: number; limit: number } = {
    page: 1,
    limit: 6,
  };

  constructor(elm: HTMLElement) {
    this.init(elm);
  }

  getData = async () => {
    let user = localStorage.getItem("user") as string;
    if (user) {
      this.user = JSON.parse(user);
      this.products = await axios
        .get(
          `http://localhost:4014/api/v1/product?${this.handleQuery()}&sort=-createdAt`
        )
        .then((data) => data.data);
    }
  };

  init = async (elm: HTMLElement) => {
    await this.getData();

    if (this.user?.isAdmin) {
      // get data
      //render
      this.renderLayout(elm);
      this.render();

      // handle event

      this.handlePage();
      this.handleDelete();
      this.handleChangeActive();
    } else {
      router.navigate("/");
      toast({
        message: "Không có quyền truy cập!",
        type: "error",
        title: "Lỗi",
      });
    }
  };

  renderLayout = (elm: HTMLElement) => {
    renderAdminPages(elm);
  };

  render = () => {
    const content = document.querySelector(".content") as HTMLElement;
    content.innerHTML = ProductsPage(this.products, this.state);
  };

  handlePage = () => {
    const pages = document.querySelectorAll(
      ".abx-page"
    ) as NodeListOf<HTMLElement>;

    pages.forEach((item) => {
      item.onclick = async () => {
        let page = item.dataset.page as string;
        this.state.page = +page;
        await this.getData();
        this.render();

        // handle event

        this.handlePage();
        this.handleDelete();
        this.handleChangeActive();
      };
    });
  };

  handleDelete = () => {
    const btnDels = document.querySelectorAll(
      ".btn-del-ax"
    ) as NodeListOf<HTMLElement>;

    btnDels.forEach((btn) => {
      btn.onclick = async () => {
        let id = btn.dataset.id;
        try {
          const content = document.querySelector(".content") as HTMLElement;
          content.innerHTML = '<div class="loader"></div>';
          await axios.delete(`http://localhost:4014/api/v1/product/${id}`, {
            headers: {
              token: `Bearer ${this.user.accessToken}`,
            },
          });
          toast({
            message: "Xóa thành công",
            title: "Thành công",
            type: "success",
          });
          await this.getData();
          this.render();

          // handle event

          this.handlePage();
          this.handleDelete();
          this.handleChangeActive();
        } catch (error) {
          toast({
            message: "Xóa thất bại",
            title: "Lỗi",
            type: "error",
          });
        }
      };
    });
  };

  handleChangeActive = () => {
    const activeBtns = document.querySelectorAll('.active') as NodeListOf<HTMLElement>

    activeBtns.forEach(btn => {
      btn.onclick = async () => {
        let id = btn.dataset.id;
        
        try {
          await axios.get(`http://localhost:4014/api/v1/product/change-status/${id}`, {
          headers: {
            token: `Bearer ${this.user.accessToken}`
          }
        })
        toast({
          type: 'success',
          title: 'Thành công',
          message: 'Thay đổi trạng thái kích hoạt thành công!'
        })
        await this.getData();
        this.render();

        // handle event

        this.handlePage();
        this.handleDelete();
        this.handleChangeActive();
        } catch (error) {
          toast({
            type: 'error',
            title: 'Lỗi',
            message: 'Có lỗi!'
          })
        }
      }
    })
  }

  handleQuery = () => {
    let state = this.state;
    let ax = [];
    for (let key in state) {
      if ((state as any)[key]) {
        ax.push(`${key}=${(state as any)[key]}`);
      }
    }
    return ax.join("&");
  };
}
