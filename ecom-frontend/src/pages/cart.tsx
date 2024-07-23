import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "asadada",
    photo: "https://m.media-amazon.com/images/I/71eXNIDUGjL._SX522_.jpg",
    name: "Macbook",
    price: 45000,
    quantity: 1,
    stock: 10,
  },
];
const subtotal = 400000;
const tax = Math.round(subtotal * 0.18);
const shippingChargers = subtotal > 1000 ? 0 : 200;
const discount = 400;
const total = subtotal + tax + shippingChargers - discount;
const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(id);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => <CartItem key={idx} cartItem={i} />)
        ) : (
          <h1>No items Added in the Cart</h1>
        )}
      </main>
      <aside>
        <p>Subtotal : ₹{subtotal} </p>
        <p>Shipping Charges : ₹{shippingChargers} </p>
        <p>Tax : ₹{tax}</p>
        <p>
          Discount : <em className="red">- ₹{discount}</em>
        </p>
        <p>
          <b>Total : ₹{total}</b>
        </p>
        <input
          placeholder="Coupon code"
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid coupon code <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
