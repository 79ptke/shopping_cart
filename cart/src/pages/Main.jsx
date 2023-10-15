import React from "react";
import "../css/ProductCard.css";
import "../css/common.css";
import "../css/Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cart';
import productData from "../model/data";

function Main () {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (data) => {
    const isItemInCart = cartItems.some((item) => item.id === data.id);

    if (isItemInCart) {
      alert('이미 장바구니에 추가된 상품입니다.');
    } else {
      const cartItem = {
        ...data,
        quantity: 1,
        totalPrice: data.price,
      };

      dispatch(addToCart(cartItem));
    }
  };
  

    return (
      <div className="main">
        <div className="wrapper">
          <h1 className="mainTitle"> 인기상품 </h1> 
          <ul className="productItems">
            {productData && productData.map ((data) => {
              return (
                <li className="productItem" key={data.id}>
                  <figure>
                      <img className="productImg" src={data.img} alt="인기상품 이미지" />
                  </figure>
                  <div className="txtArea">
                      <h4 className="itemTitle">{data.title}</h4>
                      <h5 className="itemTxt">{data.description}</h5>
                      <p className="price">{data.price} 원</p>
                  </div>
                  <button className="addCartBrn" onClick={() => handleAddToCart(data)}>
                      <FontAwesomeIcon icon={faCartArrowDown} />
                      장바구니 담기
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
}

export default Main;
