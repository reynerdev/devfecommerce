import { useContext } from 'react';
import React from 'react';
import styled from 'styled-components';
import noImage from '../assets/noimage.png';
import UserContext, { TYPES } from '../contexts/UserContext';
import { useLocation } from 'react-router-dom';

const Item = () => {
  const param = useLocation();
  const handleImageError = (e) => {
    console.log('dsdsds');
    console.log(noImage);
    e.target.src = noImage;
  };
  const element = param.state;
  const {
    dispatchShoppingCart,
    shoppingCartCount,
    setShoppingCartCount,
  } = useContext(UserContext);

  return (
    <div className="cardDescription flex  justify-center items-center mt-16">
      <Card className={'item mt-6 ml-6'}>
        <CardImg>
          <img
            src={!element.image ? noImage : element.image}
            alt="Logo"
            onError={(e) => handleImageError(e)}
          />
        </CardImg>
        <CardContent>
          <UpperContent>
            <div className="UpperContent-Left">
              <CardTitle>{element.product_name}</CardTitle>

              <CardDescription>{element.description}</CardDescription>
            </div>

            <div className="UpperContent-Right">{`$ ${element.price}`}</div>
          </UpperContent>

          <BottomContent>
            <Button
              onClick={() => {
                dispatchShoppingCart({
                  type: TYPES.add,
                  payload: {
                    _id: element._id,
                    product_name: element.product_name,
                    product_description: element.description,
                    product_price: element.price,
                    product_image: element.image,
                  },
                });
                setShoppingCartCount(shoppingCartCount + 1);
              }}
            >
              Add to Cart
            </Button>
          </BottomContent>
        </CardContent>
      </Card>
    </div>
  );
};

const UpperContent = styled.div`
  /* background-color: green; */

  display: flex;
  height: 220px;

  .UpperContent-Right {
    font-weight: 700;
    font-size: 36px;
    display: flex;
    justify-content: center;
  }
`;

const CardTitle = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 48px;
`;

const CardDescription = styled.div`
  font-size: 24px;
`;
const BottomContent = styled.div`
  /* display: flex; */
  display: flex;
  justify-content: flex-end;
  /* background-color: blue; */
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 460px 844px;
  width: 1304px;
  /* height: 172px; */
  height: 400px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;

const CardImg = styled.div`
  height: 400px;
  width: 400px;
  img {
    display: block;
    max-height: 100%;
    object-fit: cover;
    /* object-fit: fill; */
  }
`;

const CardContent = styled.div`
  padding-top: 48px;
  padding-bottom: 48px;
  padding-right: 48px;
  /* padding-left: 24px; */
  /* background-color: yellow; */
  display: flex;
  flex-direction: column;
`;

const Button = styled.div`
  background-color: #ffee67;
  width: 280px;
  height: 80px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  color: black;
`;

export default Item;
