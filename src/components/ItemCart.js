import React, { useContext, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import Plus from '../assets/plus.svg';
import Minus from '../assets/minus.svg';
import Delete from '../assets/Delete.svg';
import UserContext, { TYPES } from '../contexts/UserContext';
const logo =
  'https://www.sincable.mx/wp-content/uploads/2020/01/patrick-ward-z_dLXnQg0JY-unsplash-1024x664.jpg';

const ItemCart = ({ item, setTotal, total, updateSubtotal }) => {
  console.log(item, 'ITEMMMMMMMMMMMM');

  const {
    dispatchShoppingCart,
    shoppingCartCount,
    setShoppingCartCount,
  } = useContext(UserContext);

  const handleOnDeleteItem = () => {
    console.log('handleOnDeleteItem', item);

    dispatchShoppingCart({ type: TYPES.delete, payload: item });
    setShoppingCartCount(shoppingCartCount - item.count);
  };

  const handleAddOneItem = () => {
    dispatchShoppingCart({ type: TYPES.add, payload: item });
    setShoppingCartCount(shoppingCartCount + 1);
  };

  const handleRemoveOneItem = () => {
    if (item.count > 1) {
      console.log('handleRemoveOneItem');
      dispatchShoppingCart({ type: TYPES.deleteOne, payload: item });
      setShoppingCartCount(shoppingCartCount - 1);
    }
  };

  useEffect(() => {
    // setTotal(total + item.subtotal)
    console.log('ITEM CAR RENDERED', item.subtotal);
    updateSubtotal(parseInt(item.subtotal));
  }, []);
  return (
    <ItemCartWrapper className="mb-5">
      <LogoWrapper>
        <Logo>
          <img src={item.product_image} alt="Logo" width="200px" />
        </Logo>
      </LogoWrapper>
      <ContentItem>
        <ContentTitle>{item.product_name}</ContentTitle>
        <ContentDescription>{item.product_description}</ContentDescription>
      </ContentItem>

      <ItemCountWrapper>
        <PlusIconWrapper onClick={handleAddOneItem}>
          <img src={Plus} alt="Plus" />
        </PlusIconWrapper>
        <Count>{item.count}</Count>
        <MinusIconWrapper onClick={handleRemoveOneItem}>
          <img src={Minus} alt="Minus" />
        </MinusIconWrapper>
      </ItemCountWrapper>

      <PriceWrapper>{`$ ${item.product_price}`}</PriceWrapper>

      <DeleteIconWrapper onClick={handleOnDeleteItem}>
        <img src={Delete} alt="Delete" />
      </DeleteIconWrapper>
    </ItemCartWrapper>
  );
};

export default ItemCart;

const ItemCartWrapper = styled.div`
  display: flex;
  padding: 24px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  width: 780px;
  margin-right: 50px;
  background-color: white;
`;

const LogoWrapper = styled.div`
  border-radius: 5px;
  background-color: #fff499;
`;

const Logo = styled.div`
  padding: 20px;
`;

const ContentItem = styled.div`
  margin-left: 30px;
  flex: 0 0 220px;
`;

const ContentTitle = styled.div`
  font-weight: 700;
`;

const ContentDescription = styled.div`
  font-weight: 700;
  color: #cbd2d9;
`;

const ItemCountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  flex: 0 0 120px;
`;

const PlusIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  cursor: pointer;
`;

const Count = styled.div`
  /* width: 20px; */
  border: 1px solid #5136ad;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  padding: 10px;
`;
const MinusIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  cursor: pointer;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  /* margin-left: 30px; */
  flex: 0 0 80px;
`;

const DeleteIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 50px;
  cursor: pointer;
  /* margin-left: 30px; */
`;
