import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import noImage from '../assets/noimage.png';
import UserContext, { TYPES } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';

const ProductCard = ({ element, index }) => {
  const history = useHistory();

  useEffect(() => {
    console.log('Product Card');
  });

  const handleImageError = (e) => {
    console.log('dsdsds');
    console.log(noImage);
    e.target.src = noImage;
  };

  const {
    dispatchShoppingCart,
    shoppingCartCount,
    setShoppingCartCount,
  } = useContext(UserContext);

  const handleOnClickCart = () => {
    history.push(`/item/${element._id}`, element);
  };

  return (
    <Card
      className={'item mt-6 ml-6 bg-white	 '}
      key={index}
      onClick={handleOnClickCart}
    >
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
            onClick={(event) => {
              event.stopPropagation();
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
  );
};

const UpperContent = styled.div`
  /* background-color: green; */

  display: flex;
  height: 110px;

  .UpperContent-Right {
    font-weight: 700;
    font-size: 18px;
    display: flex;
    justify-content: center;
  }
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const CardDescription = styled.div`
  font-size: 12px;
`;
const BottomContent = styled.div`
  /* display: flex; */
  display: flex;
  justify-content: flex-end;
  /* background-color: blue; */
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 230px 422px;
  width: 652px;
  /* height: 172px; */
  height: 200px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;

const CardImg = styled.div`
  height: 200px;
  width: 200px;
  img {
    display: block;
    max-height: 100%;
    object-fit: cover;
    /* object-fit: fill; */
  }
`;

const CardContent = styled.div`
  padding-top: 24px;
  padding-bottom: 24px;
  padding-right: 24px;
  /* padding-left: 24px; */
  /* background-color: yellow; */
  display: flex;
  flex-direction: column;
`;

const Button = styled.div`
  background-color: #ffee67;
  width: 140px;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  color: black;
`;

export default ProductCard;
