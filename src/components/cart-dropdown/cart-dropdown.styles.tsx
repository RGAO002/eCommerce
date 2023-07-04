import styled from "styled-components";

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "../button/button.styles";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;
export const CartItems = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  overflow: auto;

  /* For Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    width: 8px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 3px solid transparent; /* creates padding around scroll thumb */
  }
`;

// /* For Chrome, Safari, and Opera */
// .cart-items::-webkit-scrollbar {
//   width: 8px; /* width of the entire scrollbar */
// }

// .cart-items::-webkit-scrollbar-track {
//   background: transparent; /* color of the tracking area */
// }

// .cart-items::-webkit-scrollbar-thumb {
//   background-color: darkgrey; /* color of the scroll thumb */
//   border-radius: 20px; /* roundness of the scroll thumb */
//   border: 3px solid transparent; /* creates padding around scroll thumb */
// }
