import axios from "axios";
import { renderAdminPages, router, toast } from "../utils";
import UpdateProductPage from "../pages-admin/UpdateProductPage/UpdateProductPage";

export default class AdminUpdateProductPageController {
  id: string;
  product: any;
  user: any;
  categories: any;
  constructor(elm: HTMLElement, id: string) {
    this.id = id;
    this.init(elm);
  }
  init = async (elm: HTMLElement) => {
    this.getUser();
    if (this.user?.isAdmin) {
      await this.getProduct();
      await this.getCategories()

      this.renderLayout(elm);
      this.render();

      this.handleImage();
      this.handleForm()
    } else {
      router.navigate("/");
      toast({
        message: "Không có quyền truy cập!",
        type: "error",
        title: "Lỗi",
      });
    }
  };

  getProduct = async () => {
    this.product = await axios
      .get(`http://localhost:4014/api/v1/product/${this.id}`)
      .then((data) => data.data);
  };
  getUser = () => {
    let user = localStorage.getItem("user") as string;
    this.user = JSON.parse(user);
  };

  getCategories = async () => {
    let categories = await axios
      .get("http://localhost:4014/api/v1/category")
      .then((data) => data.data);
    this.categories = [
      ...categories.map((item: any) => ({ id: item._id, name: item.name })),
    ];
  };

  renderLayout = (elm: HTMLElement) => {
    renderAdminPages(elm);
  };
  render = () => {
    const content = document.querySelector(".content") as HTMLElement;
    content.innerHTML = UpdateProductPage({
      categories: this.categories,
      product: this.product
    });
  };

  handleImage = () => {
    const images = document.querySelector('#images') as HTMLInputElement;

    images.onchange = () => {
      let image = URL.createObjectURL(images.files![0]);
      
      const imgPreview = document.querySelector('.img-preview') as HTMLImageElement;

      imgPreview.src = image;
    }
  }
  handleForm = () => {
    const form = document.querySelector("#form") as HTMLFormElement;

    form.onsubmit = async (e: Event) => {
      e.preventDefault();

      let name = document.querySelector("#name") as HTMLInputElement;
      let price = document.querySelector("#price") as HTMLInputElement;
      let instock = document.querySelector("#instock") as HTMLInputElement;
      let promotion = document.querySelector("#promotion") as HTMLInputElement;
      let description = document.querySelector(
        "#description"
      ) as HTMLTextAreaElement;
      let categoryId = document.querySelector(
        "#categoryId"
      ) as HTMLSelectElement;
      let isActive = document.querySelector("#isActive") as HTMLSelectElement;
      let images = document.querySelector("#images") as HTMLInputElement;

      let formData = new FormData();

      formData.append("name", name.value);
      formData.append("price", price.value);
      formData.append("instock", instock.value);
      formData.append("promotion", promotion.value);
      formData.append("description", description.value);
      formData.append("categoryId", categoryId.value);
      formData.append("isActive", isActive.value);

      if (images.files) {
        for (let file of images.files) {
          formData.append("images", file);
        }
      }

      for (let [key, value] of formData) {
        console.log(`${key} - ${value}`);
      }
      
      
      try {
        const content = document.querySelector(".content") as HTMLElement;
        content.innerHTML = '<div class="loader"></div>';
        await axios.patch(
          `http://localhost:4014/api/v1/product/${this.product._id}`,
          formData,
          {
            headers: {
              token: `Bearer ${this.user.accessToken}`,
            },
          }
        );
        
        toast({
            type: 'success',
            message: 'Cập nhật phẩm thành công!',
            title: 'Thành công'
        })
        router.navigate('/admin/product')
      } catch (error) {
        toast({
            type: 'error',
            message: 'Có lỗi xãy ra',
            title: 'Thất bại'
        })
      }
    };
  };
}
