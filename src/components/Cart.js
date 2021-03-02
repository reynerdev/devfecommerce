import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ItemCart from './ItemCart';
import arrowLeft from '../assets/arrowLeft.svg';
import UserContext from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';

const Cart = () => {
  const history = useHistory();
  const [total, setTotal] = useState(0);
  const { shoppingCarItems } = useContext(UserContext);

  console.log(shoppingCarItems, 'Shopping Car Item');

  const handleOnCLickContinueShopping = () => {
    history.goBack();
  };

  const orderSummaryItem = (name, subTotal) => {
    console.log('orderSummaryItem');
    return (
      <div className="flex subtotal">
        <div className="" style={{ width: '200px', marginRight: '50px' }}>
          {name}
        </div>
        <div className="">{subTotal}</div>
      </div>
    );
  };

  return (
    <Container className="flex justify-content">
      <LeftSideWrapper>
        <ContinueShopping
          className="flex"
          onClick={handleOnCLickContinueShopping}
        >
          <div className="flex align-center mr-3">
            <img src={arrowLeft} alt="arrowLeft" width="8px" />
          </div>
          Continue Shopping
        </ContinueShopping>
        <ShoppingCartWrapper>
          <ShoppingCartTitle>Shoppping Cart</ShoppingCartTitle>
          <ShoppingCartList>
            {shoppingCarItems.map((element, index) => {
              return (
                <ItemCart
                  item={element}
                  key={index}
                  setTotal={setTotal}
                  total={total}
                />
              );
            })}
          </ShoppingCartList>
        </ShoppingCartWrapper>
      </LeftSideWrapper>
      <OrderSummaryWrapper>
        <div className="mb-5">Order Summary</div>
        {shoppingCarItems.map((element) => {
          return orderSummaryItem(element.product_name, element.subtotal);
        })}
        <Total>Total: {total}</Total>
        <div className="flex justify-center">
          <ButtonOrder>Check Out</ButtonOrder>
        </div>
      </OrderSummaryWrapper>
    </Container>
  );
};

export default Cart;

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: #f5f7fa;
`;

const LeftSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContinueShopping = styled.div`
  padding: 32px 0;
  border-bottom: 1px solid #dbdbdb;
  margin-right: 50px;
  color: #7b8794;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`;

const OrderSummaryWrapper = styled.div`
  width: 400px;
  height: 500px;
  padding: 32px;
  font-weight: 700;
  font-size: 24px;
  background-color: white;

  .subtotal {
    color: #cbd2d9;
    font-size: 16px;
  }
`;

const ShoppingCartWrapper = styled.div``;

const ShoppingCartTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin: 32px 0;
`;

const ShoppingCartList = styled.div``;

const ButtonOrder = styled.button`
  padding: 12px 60px;
  color: white;
  font-weight: 700;
  background-color: #ccb74f;
  border-radius: 5px;
  font-size: 18px;
`;

const Total = styled.div`
  font-size: 16px;
  color: #7b8794;
  margin-top: 36px;
  margin-bottom: 80px;
`;
