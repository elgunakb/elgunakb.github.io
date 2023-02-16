import "../style/pages/Cart.scss";
import { Context } from "../context";
import React, { useContext } from "react";
import Btn from "../components/right/Btn";
import DeleteBtn from "../assets/images/delete.svg";
import Line from "../assets/images/Vector 1788.svg";
import EmptyCart from "../assets/images/image 134.svg";
import { Link } from "react-router-dom";

const Cart = () => {
  const { list, setList } = useContext(Context);

  const decrement = (id) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const increment = (id) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const total = list.reduce(
    (plus, item) => plus + item.price * item.quantity,
    0
  );
  const deleteItem = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <div className="cart__flex">
      <div style={{ display: "flex" }} className="container">
        {total ? (
          <>
            <div className="all__carts">
              <h2 className="shopping__cart">Shopping cart</h2>
              <img className="line" src={Line} alt="" />
              {list.map((item) => (
                <div className="carts" key={item.id}>
                  <div className="cart">
                    <img src={item.image01} alt="" />
                    <div className="cart__details">
                      <h5 className="cart__title">{item.title}</h5>
                      <button
                        className="delete__btn"
                        onClick={() => deleteItem(item.id)}
                      >
                        <img src={DeleteBtn} alt="" />
                      </button>
                      <p>{item.price * item.quantity} ₼</p>
                    </div>
                    <div className="counter">
                      <button
                        onClick={() => decrement(item.id)}
                        disabled={item.quantity === 1}
                        style={{
                          backgroundColor:
                            item.quantity === 1
                              ? "#adadad"
                              : "rgb(255, 50, 50)",
                          cursor:
                            item.quantity === 1 ? "not-allowed" : "pointer",
                        }}
                      >
                        -
                      </button>
                      <p style={{ marginTop: "4px" }}>{item.quantity}</p>
                      <button
                        onClick={() => increment(item.id)}
                        style={{ backgroundColor: "green" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="total__div">
              <h3 className="cart__sum">Cart Summary</h3>
              <img className="line" src={Line} alt="" />
              <div className="price__delivery">
                <p>Price</p>
                <p>{total} ₼</p>
              </div>
              <div className="price__delivery">
                <p>Delivery</p>
                <p>5.00 ₼</p>
              </div>
              <img
                style={{ marginTop: "32px" }}
                className="line"
                src={Line}
                alt=""
              />
              <div className="subtotal">
                <p>Subtotal</p>
                <p>{total + 5} ₼</p>
              </div>
              <div className="btn__buy">
                <Btn />
              </div>
            </div>
          </>
        ) : (
          <div className={"total empty"}>
            <div className="empty__cart">
              <button>
                <Link to="/home">Back to home</Link>
              </button>
              <img src={EmptyCart} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
