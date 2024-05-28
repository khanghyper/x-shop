

const coreController = () => {
    console.log(123);
    
    const cart = document.querySelector('.cart-icon') as HTMLElement;
    const popupCart = document.querySelector('.popup-cart') as HTMLElement;



    cart.onmouseover = (e:Event) => {
        const target = e.target as HTMLElement;
        if(target.matches('.cart-icon')){
            popupCart.style.visibility = 'visble'
            popupCart.classList.remove('hiddencart');
            popupCart.classList.add('showcart');
        }
        
    }
    cart.onmouseout = (e:Event) => {
        const target = e.target as HTMLElement;
        if(target.matches('.cart-icon')){
            popupCart.style.visibility = 'hidden'
            popupCart.classList.remove('showcart');
        popupCart.classList.add('hiddencart');
        }
        
    }
}

export default coreController;
