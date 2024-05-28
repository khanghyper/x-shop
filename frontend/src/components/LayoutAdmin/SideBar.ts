import { router } from "../../utils";
import "./style.css";

const abx = () => {
  let path = router.getCurrentLocation().hashString.split("/");
  return path[2];
};

interface Link {
    title: string;
    icon: string;
    link: string;
    name: string
  }

const links: Link[] = [
  {
    title: "Dashboard",
    icon: `
        <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"
                d="M9.1 4H5c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm-10 10H5c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Z" />
        </svg>
    `,
    link: "#/admin",
    name: ''
  },{
    title: 'Thành viên',
    icon: `
    <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-width="2"
            d="M7 17v1c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>`,
    link: '#/admin/user',
    name: 'user'
  }, {
    title: 'Sản phẩm',
    icon: `
    <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2"
            d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 1 12c0 .5-.5 1-1 1H6a1 1 0 0 1-1-1L6 8h12Z" />
    </svg>`,
    link: '#/admin/product',
    name: 'product'
  },{
    title: 'Đơn hàng',
    icon: `
    <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h18M6 14h2m3 0h5M3 7v10c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H4a1 1 0 0 0-1 1Z" />
    </svg>`,
    link: '#/admin/order',
    name: 'order'
  }, {
    title: 'Thông tin',
    icon: `
    <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2"
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>`,
    link: '#/admin/info',
    name: 'info'
  }, {
    title: "Đăng xuất",
    icon: `
    <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
    </svg>`,
    link: '#/admin/logout',
    name: 'logout'
  }
];

function LinkItem(item: Link, path: string) {
  return `
    <a href="${item.link}" class="link ${path === item.name ? 'link-selected': ''}">
        ${item.icon}
        <div class="title-link">${item.title}</div>
    </a> 
`;
}

const LayOutAdmin = () => {
  let path = abx();

  return `
<div class="containeradmin">
  <div class="sidebar">
      <div class="logo-container">
          logo
      </div>
      <div class="center">
          <ul class="">
              ${links.map(link => LinkItem(link, path)).join('')}
          </ul>
      </div>
  </div>
  <div class="main">
      <div class=" navbar">
          <div class="navbar-container">
              <div class="btn-show-sidebar">
                  <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                          d="M5 7h14M5 12h14M5 17h14" />
                  </svg>
              </div>
              <div class="avatar">
                  <img class="" src="" alt="">
              </div>
          </div>

      </div>
      <div class="content">
          
      </div>
  </div>
</div>
`;
};

export default LayOutAdmin;
