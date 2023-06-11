import React, { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price, quantity } = cartItem;
  // const { clearItemFromCart, addItemToCart, removeItemFromCart } =
  //   useContext(CartContext);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => dispatch(removeItemFromCart(cartItems, cartItem))}
        >
          &#10094;
        </div>
        {quantity}
        <div
          className="arrow"
          onClick={() => dispatch(addItemToCart(cartItems, cartItem))}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div
        onClick={() => dispatch(clearItemFromCart(cartItems, cartItem))}
        className="remove-button"
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
