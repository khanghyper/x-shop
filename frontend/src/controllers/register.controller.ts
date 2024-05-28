import axios from "axios";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import { renderClitentPages, router, toast } from "../utils";

export default class RegisterPageController {
  state: {
    username: boolean;
    name: boolean;
    address: boolean;
    email: boolean;
    phone: boolean;
    password: boolean;
    password1: boolean;
  } = {
    username: false,
    name: false,
    address: false,
    email: false,
    phone: false,
    password: false,
    password1: false,
  };
  state1: {
    username: string;
    name: string;
    address: string;
    email: string;
    phone: string;
    password: string;
  } = {
    username: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    password: '',
  };
  user: any;
  constructor(elm: HTMLElement) {
    this.init(elm);
  }
  init = async (elm: HTMLElement) => {
    if(this.user) {
        console.log(this.user);
        
        router.navigate('/');
    }else{
        
        await this.render(elm);
        this.handleUsername();
        this.handleName();
        this.handleAddress();
        this.handleEmail();
        this.handlePhone();
        this.handlePassword();
        this.handlePassword1();
        this.handleRegister();
    }
    
  };
  getUser = () => {
    let user = localStorage.getItem('user') as string;
    this.user = user;
  }
  render = async (elm: HTMLElement) => {
        await renderClitentPages(elm);
        const main = <HTMLDivElement>document.querySelector("#main");
        console.log(main);
    
        main.innerHTML = RegisterPage();
    
  };

  handleUsername = () => {
    let username = document.querySelector("#username") as HTMLInputElement;
    console.log(username);

    username.oninput = () => {
      let messageErr = username.parentElement?.nextElementSibling;

      if (username.value.length < 6) {
        messageErr!.innerHTML = `Tên đăng nhập phải từ 6 ký tự`;
        this.state.username = false;
      } else {
        this.state.username = true;
        this.state1.username = username.value;
        messageErr!.innerHTML = ``;
      }
    };
  };
  handleName = () => {
    let username = document.querySelector("#name") as HTMLInputElement;

    username.oninput = () => {
      let messageErr = username.parentElement?.nextElementSibling;

      if (!username.value.length) {
        this.state.name = false;
        messageErr!.innerHTML = `Họ tên không được để trống!`;
      } else {
        this.state.name = true;
        this.state1.name = username.value;

        messageErr!.innerHTML = ``;
      }
    };
  };
  handleAddress = () => {
    let username = document.querySelector("#address") as HTMLInputElement;

    username.oninput = () => {
      let messageErr = username.parentElement?.nextElementSibling;

      if (!username.value.length) {
        this.state.address = false;
        messageErr!.innerHTML = `Địa chỉ không được để trống!`;
      } else {
        this.state.address = true;
        this.state1.address = username.value;

        messageErr!.innerHTML = ``;
      }
    };
  };
  handleEmail = () => {
    let username = document.querySelector("#email") as HTMLInputElement;

    username.oninput = () => {
      let regex =
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let messageErr = username.parentElement?.nextElementSibling;

      if (!regex.test(username.value)) {
        this.state.email = false;
        messageErr!.innerHTML = `Email không hợp lệ!`;
      } else {
        this.state.email = true;
        this.state1.email = username.value;

        messageErr!.innerHTML = ``;
      }
    };
  };
  handlePhone = () => {
    let username = document.querySelector("#phone") as HTMLInputElement;

    username.oninput = () => {
      let regex = /^0\d{8,12}$/;
      let messageErr = username.parentElement?.nextElementSibling;

      if (!regex.test(username.value)) {
        this.state.phone = false;

        messageErr!.innerHTML = `Số điện thọai không hợp lệ!`;
      } else {
        this.state.phone = true;
        this.state1.phone = username.value;

        messageErr!.innerHTML = ``;
      }
    };
  };
  handlePassword = () => {
    let username = document.querySelector("#password") as HTMLInputElement;

    username.oninput = () => {
      let messageErr = username.parentElement?.nextElementSibling;

      if (username.value.length < 6) {
        this.state.password = false;
        
        messageErr!.innerHTML = `Mật khẩu từ 6 ký tự`;
      } else {
        this.state.password = true;

        messageErr!.innerHTML = ``;
      }
    };
  };
  handlePassword1 = () => {
    let username1 = document.querySelector("#password1") as HTMLInputElement;
    let username = document.querySelector("#password") as HTMLInputElement;
    username1.oninput = () => {
      let messageErr = username1.parentElement?.nextElementSibling;

      if (username.value !== username1.value) {
        this.state.password1 = false;

        messageErr!.innerHTML = `Mật khẩu không khớp`;
      } else {
        this.state.password1 = true;
        this.state1.password = username.value;

        messageErr!.innerHTML = ``;
      }
    };
  };

  handleRegister = () => {
    const form = document.querySelector("#form") as HTMLFormElement;
    
    form.onsubmit = async (e: Event) => {
      e.preventDefault();
      
      let abx = []
      for (const [property, value] of Object.entries(this.state)) {
        abx.push(value)
      }
      if(abx.every(item => item === true)) {
        try {
            let rs = await axios.post(`http://localhost:4014/api/v1/auth/register`, {
                ...this.state1
            }).then(data => data.data);
            toast({
                title: 'Thành công!',
                message: 'Đăng ký thành công!',
                type: 'success'
            });
            
            localStorage.setItem('user', JSON.stringify(rs))
            router.navigate('/');
            
        } catch (error: any) {
            const message124abx = document.querySelector('.message124abx') as HTMLElement;
            message124abx.innerHTML = error?.response?.data?.MS;
        }
      }
      

    };
  };
}
