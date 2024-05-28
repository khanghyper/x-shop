import Navigo from "navigo";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LayOutAdmin from "../components/LayoutAdmin/SideBar"; 
// import coreController from "../controllers/core.controller";

export const render = async (elm: HTMLElement, content: any, title:string) => {
  const titleElm = <HTMLElement>document.querySelector('title');
  titleElm.innerText = title;
  elm.innerHTML = await content();
};

export const render1 = async (elm: HTMLElement, content: any) => {
  elm.innerHTML = await content();
};
 
export const formatCurrency = (number: number): string => {
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
export const router = new Navigo('/', {
  linksSelector: 'a',
  hash: true
})

export const renderClitentPages = async (elm:HTMLElement) =>{
  elm.innerHTML = `
    ${await Header()}
    <div id="main"></div>
    ${Footer()}
  `;
}

export const renderAdminPages = (elm:HTMLElement) =>{
  elm.innerHTML = `
    ${LayOutAdmin()}
  `;
}

export function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  console.log('in toast');
  
  const main = document.getElementById("toast");
  
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e:Event) {
      const target = e.target as HTMLElement;
      if (target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons:any = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle"
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(toast);
    console.log(toast);
    
  }
}


export const handleDate = (dateString:string) => {
  const date = new Date(dateString);

  // Lấy ngày, tháng, năm từ đối tượng Date
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}
