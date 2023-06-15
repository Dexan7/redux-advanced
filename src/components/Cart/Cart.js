import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import {useSelector} from "react-redux";

const Cart = (props) => {
  const products = useSelector(state => state.cart.products);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {products.length > 0 && products.map(product =>
          <CartItem key={product.id}
            item = {{ id: product.id, title: product.title, quantity: product.quantity, price: product.price, total: product.totalPrice}}
          />
        )}
      </ul>
    </Card>
  );
};

export default Cart;
