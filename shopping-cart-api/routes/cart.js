import {addToCart, getCarts, deleteCart} from "../controllers/cart.js"    

const cartRouter = (app) => {
    app.route('/cart').post(addToCart)
    app.route('/cart').get(getCarts)
    app.route('/cart/:id').delete(deleteCart)
    // app.route('/cart/calculate').get(cartHandler)
}

export default cartRouter 