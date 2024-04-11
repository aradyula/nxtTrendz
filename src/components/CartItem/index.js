import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {id, title, brand, quantity, price, imageUrl} = cartItemDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,

          removeCartItem,
        } = value
        const deleteItem = () => {
          removeCartItem(id)
        }
        const onIncrease = () => {
          //    console.log('increment')
          incrementCartItemQuantity(id)
        }
        const onDecrease = () => {
          //    console.log('decrement')

          decrementCartItemQuantity(id)
        }
        return (
          <li className="cart-item">
            <img className="cart-product-image" src={imageUrl} alt={title} />
            <div className="cart-item-details-container">
              <div className="cart-product-title-brand-container">
                <p className="cart-product-title">{title}</p>
                <p className="cart-product-brand">by {brand}</p>
              </div>
              <div className="cart-quantity-container">
                <button
                  data-testid="minus"
                  aria-label="button"
                  type="button"
                  className="quantity-controller-button"
                  onClick={onDecrease}
                >
                  <BsDashSquare color="#52606D" size={12} />
                </button>
                <p className="cart-quantity">{quantity}</p>
                <button
                  data-testid="plus"
                  type="button"
                  aria-label="button"
                  className="quantity-controller-button"
                  onClick={onIncrease}
                >
                  <BsPlusSquare color="#52606D" size={12} />
                </button>
              </div>
              <div className="total-price-delete-container">
                <p className="cart-total-price">Rs {price * quantity}/-</p>
                <button className="remove-button" type="button">
                  Remove
                </button>
              </div>
            </div>
            <button
              className="delete-button"
              data-testid="remove"
              type="button"
              aria-label="button"
              onClick={deleteItem}
            >
              <AiFillCloseCircle color="#616E7C" size={20} />
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
