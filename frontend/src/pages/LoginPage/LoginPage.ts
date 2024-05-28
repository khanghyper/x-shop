import './style.css';

const LoginPage = () => {
  const title = document.querySelector('title') as HTMLElement;
  title.innerHTML = 'Đăng nhập'

  return `
<div class="main-container1-login">
  <div class="container1-login">
    <h2>Đăng nhập</h2>  
    <form id="form" action="">
        <div class="input-field">
            <input type="text" name="username" id="username"
                placeholder="Tài khoản đăng nhập">
            <div class="underline"></div>
        </div>
        <div class="input-field">
            <input type="password" name="password" id="password"
                placeholder="Mật khẩu">
            <div class="underline"></div>
        </div>

        <input type="submit" value="Đăng nhập">
    </form>
    <div class="message" style="color: red; margin-top: 10px"></div>
    </div>
</div>
  `
}

export default LoginPage