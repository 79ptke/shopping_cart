import React from "react";
import { Link } from "react-router-dom";
import '../../css/common.css';
import '../../css/Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldDog } from "@fortawesome/free-solid-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';

function Navbar () {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartCount = calculateCartCount(cartItems);

    function calculateCartCount(items) {
        return items.reduce((total, item) => total + item.quantity, 0);
    }

    return (
        <div className="header">
            <div className="wrapper">
            <Link to={"/"} aria-label="홈으로 이동" className="logo">
                <FontAwesomeIcon icon={faShieldDog} />멍멍마켓
            </Link>
            <nav>
                <Link to={"/"} aria-label="홈으로 이동">홈</Link>
                <Link to={"/cart"} aria-label="장바구니로 이동">장바구니</Link>
                <div className="shoppingCart">
                    <FontAwesomeIcon icon={faCartArrowDown} />
                    <div className="count">{cartCount}</div>
                </div>
            </nav>
            </div>
        </div>
    )
}

export default Navbar;