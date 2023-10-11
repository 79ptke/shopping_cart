import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/CartItem.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { removeFromCart } from '../../redux/cart';

function CartItem() {
  const cartItems = useSelector((state) => state.cart.cartItems); 
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const totalOrderAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);
  const [selectAll, setSelectAll] = useState(false);

  const increaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        const updatedQuantity = cartItem.quantity + 1;
        return {
          ...cartItem,
          quantity: updatedQuantity,
          totalPrice: updatedQuantity * cartItem.price, 
        };
      }
      return cartItem;
    });

    dispatch({ type: 'UPDATE_CART', payload: updatedCartItems });
  };

  const decreaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 0) {
        const updatedQuantity = cartItem.quantity - 1;
        return {
          ...cartItem,
          quantity: updatedQuantity,
          totalPrice: updatedQuantity * cartItem.price,
        };
      }
      return cartItem;
    });

    dispatch({ type: 'UPDATE_CART', payload: updatedCartItems });
  };

  const handleOpenModal = (item) => {
    setIsModalOpen(true);
    setItemToRemove(item); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemToRemove(null); 
  };

  const handleRemoveItem = () => {
    if (itemToRemove) {
      dispatch(removeFromCart(itemToRemove));
      handleCloseModal();
    }
  };

  const handleToggleAll = () => {
    const updatedCartItems = cartItems.map((cartItem) => ({
      ...cartItem,
      isChecked: !selectAll,
    }));

    dispatch({ type: 'UPDATE_CART', payload: updatedCartItems });
    setSelectAll(!selectAll);
  };

  const handleToggleItem = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          isChecked: !cartItem.isChecked,
        };
      }
      return cartItem;
    });

    dispatch({ type: 'UPDATE_CART', payload: updatedCartItems });

    const allChecked = updatedCartItems.every((item) => item.isChecked);
    setSelectAll(allChecked);
  };

  const handleDelChkItems = () => {
    const selectedItems = cartItems.filter((item) => item.isChecked);
  
    selectedItems.forEach((item) => {
      dispatch(removeFromCart(item));
    });
  };
  

  

  return (
    <div className="cartItemListsArea">
      <div className="cartItemListWrap">
        <div className="tableWrap">
          <table className="cartItemLists">
            <thead>
              <tr className="cartItemList headerList">
                <th className="inputTd">
                  <input className="allChk" type="checkbox" checked={selectAll} onChange={handleToggleAll} />
                </th>
                <th className="imgTd"></th>
                <th className="nameTd">
                  <p>
                    상품정보
                  </p>
                </th>
                <th className="opsTd">
                  <p>
                    수량
                  </p>
                </th>
                <th className="priceTd">
                  <p>
                    가격
                  </p>
                </th>
                <th className="delTd"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr className="cartItemList" key={item.id}>
                  <th className="inputTd">
                    <input type="checkbox" checked={item.isChecked} onChange={() => handleToggleItem(item)}/>
                  </th>
                  <td className="imgTd">
                    <img className="itemImg" src={item.img} alt={item.title} />
                  </td>
                  <td className="nameTd">
                    <p className="itemName">{item.title}</p>
                  </td>
                  <td className="opsTd">
                    <div className="opsArea">
                      <button className="minus ops" onClick={() => decreaseQuantity(item)}>-</button>
                      <p className="num">{item.quantity}</p>
                      <button className="plus ops" onClick={() => increaseQuantity(item)}>+</button>
                    </div>
                  </td>
                  <td className="priceTd">
                    <p className="price">{item.totalPrice} 원</p>
                  </td>
                  <td className="delTd">
                    <button className='xBtn' onClick={() => handleOpenModal(item)}>
                      <FontAwesomeIcon icon={faX} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="chkDelBtn" onClick={handleDelChkItems}>선택 삭제하기</button>
      </div>
      <div className="sumArea">
        <div className="tableArea">
            <table>
              <tbody>
                <tr>
                  <th>총 주문 금액</th>
                  <td>{totalOrderAmount} 원</td>
                </tr>
                <tr>
                  <th>할인금액</th>
                  <td>0 원</td>
                </tr>
                <tr>
                  <th>배송비</th>
                  <td>0 원</td>
                </tr>
                <tr className="totalSum">
                  <th>총 결제 금액</th>
                  <td>{totalOrderAmount} 원</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="payBtn">결제하기</button>
      </div>
      

      {isModalOpen && (
        <div className="modalArea">
          <div className="delModal">
            <p>삭제하시겠습니까?</p>
            <div className="btnArea">
              <button className="delBtn" onClick={handleRemoveItem}>삭제</button>
              <button className="cancelBtn" onClick={handleCloseModal}>취소</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default CartItem;
