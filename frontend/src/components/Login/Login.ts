const Login = () => {
    return `
<div class="field">
    <label>Tài Khoản</label>
    <input type="text">
</div>
<div class="field">
    <label>Mật Khẩu</label>
    <input type="password">
</div>
<div class="field">
    <button>Đăng Nhập</button>
</div>
<div class="field">
    <div>
        Bạn Chưa Có Tài Khoản? 
        <span class="to-register" style="text-decoration: underline; color: #088178;cursor: pointer;">Đăng Ký Tại Đây</span> 
    </div>
</div>
`
}
export default Login