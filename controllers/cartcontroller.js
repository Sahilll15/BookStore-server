
const Cart = require('../models/cart');

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { bookId, quantity } = req.body;
        const userId = req.user;
        console.log(userId)

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {

            const newCart = new Cart({
                user: userId,
                items: [{ book: bookId, quantity }]
            });
            await newCart.save();
            return res.status(200).json({ msg: 'Item added to cart', book: newCart.items[0].book });
        }


        const existingItem = cart.items.find(item => item.book.toString() === bookId);
        if (existingItem) {

            existingItem.quantity += quantity;
        } else {

            cart.items.push({ book: bookId, quantity });
        }

        await cart.save();
        return res.status(200).json({ msg: 'Item added to cart', book: cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error', error: error });
    }
};

// Get cart items
exports.getCartItems = async (req, res) => {
    try {
        const userId = req.user;
        const cart = await Cart.findOne({ user: userId }).populate('items.book');
        if (!cart) {
            return res.status(400).json({ msg: 'Cart not found' });
        }
        res.status(200).json({ cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}

// Delete item from cart
exports.updateCartItemQuantity = async (req, res) => {
    try {
        const { cartItemId, quantity } = req.body;
        const userId = req.user;
        console.log(userId)

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const cartItem = cart.items.find((item) => item._id.toString() === cartItemId);

        if (!cartItem) {
            return res.status(404).json({ error: 'CartItem not found' });
        }

        cartItem.quantity = quantity;
        await cart.save();

        return res.status(200).json({ msg: 'CartItem quantity updated successfully', cartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error', error: error });
    }
};
