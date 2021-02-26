import styled from 'styled-components';
import noImage from '../assets/noimage.png';
const ProductCard = ({ element, index }) => {
  const handleImageError = (e) => {
    console.log('dsdsds');
    console.log(noImage);
    e.target.src = noImage;
  };

  return (
    <Card className={'item mt-6 ml-6'} key={index}>
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
          <Button>Add to Cart</Button>
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
