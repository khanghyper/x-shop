import Login from "../Login/Login";

const Modal = () => {
    return `
<div class="fade">
    <div class="modal">
        <div class="modal-title">
            <div class="modal-title-login active">
                Đăng Nhập
                <span></span>
            </div>
            <div class="modal-title-register">
                Đăng Ký
                <span></span>
            </div>
        </div>
        <div class="modal-content">
            ${Login()}
        </div>
        <div class="close-modal">
            <i class="close-modal-icon fa-solid fa-xmark"></i>
        </div>
    </div>
</div>
    `
}

export default Modal;