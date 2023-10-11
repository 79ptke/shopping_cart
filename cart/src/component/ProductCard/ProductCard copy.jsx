import React from "react";
import "../../css/ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart';
import productData from "../../model/data"; 

function ProductCard () {
    const dispatch = useDispatch();

  const handleAddToCart = (data) => {
    dispatch(addToCart(data));
  };

    return (
      <ul className="productItems">
          {
                productData && productData.map(data => {
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
                            <button className="addCartBrn" onClick={handleAddToCart}>
                                <FontAwesomeIcon icon={faCartArrowDown} />
                                장바구니 담기
                            </button>
                        </li>
                    )
                })
            }
      </ul>
    )
}

export default ProductCard;