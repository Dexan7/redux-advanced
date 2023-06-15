import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Notification from "./components/UI/Notification";
import {fetchCartData, sendCartData} from "./store/cart-actions";

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const isCartShow = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification)


  // using async login insode the component
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'pending',
  //         title: 'Sending...',
  //         message: 'Sending cart data...'
  //       })
  //     )
  //     const response = await fetch('https://react-htpp-e6ab7-default-rtdb.firebaseio.com/cart.json', {
  //       method: 'PUT',
  //       body: JSON.stringify(cart)
  //     });
  //
  //     if (!response.ok) {
  //      throw new Error('Sending cart data failed.');
  //     }
  //
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'success',
  //         title: 'Success!',
  //         message: 'Send cart data successfully!'
  //       })
  //     )
  //   }
  //
  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }
  //
  //   sendCartData().catch((error) => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'error',
  //         title: 'Error!',
  //         message: 'Send cart data failed!'
  //       })
  //     )
  //   })
  //
  // }, [cart, dispatch]);


  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // using Action Creator Thunk
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {isCartShow && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
