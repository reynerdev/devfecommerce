import ProductCard from './ProductCard';
import Masorny from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { useEffect, useState, useRef, memo } from 'react';

const MainContent = memo(() => {
  const [listItems, setListItems] = useState([]);

  //   console.log('MainContent');

  const mainContentRef = useRef();

  useEffect(() => {
    fetch('https://ecomerce-master.herokuapp.com/api/v1/item')
      .then((response) => response.json())
      .then((body) => {
        setListItems(body);
        console.log(body);
        const mainContent = mainContentRef.current;
        console.log(mainContent);
        let masonry = new Masorny(mainContent, {
          // options
          itemSelector: '.item',
          gutter: 10,
          // columnWidth: 100,
        });
      })
      .catch((error) => console.log(error));
  }, []);

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
