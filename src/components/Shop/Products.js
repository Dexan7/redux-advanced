import ProductItem from './ProductItem';
import classes from './Products.module.css';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const Products = (props) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch('https://react-htpp-e6ab7-default-rtdb.firebaseio.com/Products.json');
    const responseData = await response.json();

    let productsData = [];
    for (let key in responseData) {
      productsData.push({
        id: key,
        title: responseData[key].title,
        price: responseData[key].price,
        description: responseData[key].description,
      })
    }

    setProducts(productsData);
  };

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map(product =>
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
        />)}
      </ul>
    </section>
  );
};

export default Products;
