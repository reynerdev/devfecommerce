import ProductCard from './ProductCard';
import Masorny from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { useEffect, useState, useRef, memo, useContext } from 'react';
import 'animate.css';
import Loader from 'react-loader-spinner';
import UserContext from '../contexts/UserContext';

const MainContent = memo(() => {
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setIsLoginClicked } = useContext(UserContext);
  const mainContentRef = useRef();

  useEffect(() => {
    setIsLoginClicked(false);
    fetch('https://ecomerce-master.herokuapp.com/api/v1/item')
      .then((response) => response.json())
      .then((body) => {
        setListItems(body);
        console.log('FETCHED', body);
        const mainContent = mainContentRef.current;
        let masonry = new Masorny(mainContent, {
          // options
          itemSelector: '.item',
          gutter: 10,
          // columnWidth: 100,
        });

        imagesLoaded(mainContent).on('progress', function () {
          masonry.layout();
        });

        // setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center ">
        <div ref={mainContentRef} className="container mainContent">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center ">
      <div ref={mainContentRef} className="container mainContent">
        {listItems.map((element, index) => {
          return <ProductCard element={element} key={index} />;
        })}
      </div>
    </div>
  );
});

export default MainContent;
