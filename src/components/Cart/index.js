import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const removeCartItems = () => {
        removeAllCartItems()
      }

      const renderCartListView = () => (
        <div className="cart-content-container">
          <h1 className="cart-heading">My Cart</h1>
          <button type="button" className="removeAll" onClick={removeCartItems}>
            Remove All
          </button>
          <CartListView />
          <CartSummary />
        </div>
      )

      return (
        <>
          <Header />
          <div className="cart-container">
            {cartList.length > 0 ? renderCartListView() : <EmptyCartView />}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
