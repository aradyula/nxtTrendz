import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    //  console.log(product)
    const uniqueProduct = cartList.find(item => item.id === product.id)
    if (uniqueProduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const newList = cartList.map(item => {
        if (item.id === product.id) {
          const updatedItem = {
            ...item,
            quantity: item.quantity + product.quantity,
          }

          return updatedItem
        }

        return item
      })
      this.setState({cartList: newList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    //  console.log(id)
    const newList = cartList.filter(item => item.id !== id)
    //  console.log(newList)
    this.setState({cartList: newList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const uniqueProduct = cartList.findIndex(item => item.id === id)
    if (uniqueProduct !== -1) {
      const newList = cartList.map(item => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            quantity: item.quantity + 1,
          }

          return updatedItem
        }

        return item
      })
      this.setState({cartList: newList})
    }
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
