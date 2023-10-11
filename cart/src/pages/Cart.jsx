import CartItem from '../component/CartItem/CartItem';
import "../css/common.css";
import "../css/Cart.css";

function Cart () {
    return (
      <div className="cart">
      <div className="wrapper">
        <h1 className="cartTitle"> 장바구니</h1> 
        <CartItem />
      </div>
    </div>
    )
}

export default Cart;