import './style.css';

const RegisterPage = () => {
  const title = document.querySelector('title') as HTMLElement;
  title.innerHTML = 'Đăng ký'

  return `
<div class="main-container1-login111">
  <div class="container1-login111">
    <h2>Đăng Ký</h2>  
    <form id="form" action="">
        <div class="input-field1">
            <input type="text" name="username" id="username"
                placeholder="Tài khoản đăng nhập">
            <div class="underline"></div>
        </div>
        <div class="text-[red] message-err"></div>

        <div class="input-field1">
            <input type="text" name="name" id="name"
                placeholder="Họ tên">
            <div class="underline"></div>
        </div>
        <div class="text-[red] message-err"></div>
        <div class="input-field1">
            <input type="text" name="address" id="address"
                placeholder="Địa chỉ">
            <div class="underline"></div>
        </div>
        <div class="text-[red] message-err"></div>
        <div class="input-field1">
            <input type="email" name="email" id="email"
                placeholder="Email">
            <div class="underline"></div>
        </div>
        <div class="text-[red] message-err"></div>
        <div class="input-field1">
            <input type="text" name="phone" id="phone"
                placeholder="Số điện thoại">
            <div class="underline"></div>
        </div>
        <div class="text-[red] message-err"></div>
        <div class="input-field1">
            <input type="password" name="password" id="password"
                placeholder="Mật khẩu">
            <div class="underline"></div>
        </div>
        <div class="text-[red] message-err"></div>
        <div class="input-field1">
            <input type="password" name="password1" id="password1"
                placeholder="Nhập lại mật khẩu">
            <div class="underline"></div>
        </div>
        <div class="text-[red] message-err"></div>
        <input type="submit" value="Đăng ký">
    </form>
    <div class="message124abx" style="color: red; margin-top: 10px"></div>
    </div>
</div>
  `
}

export default RegisterPage