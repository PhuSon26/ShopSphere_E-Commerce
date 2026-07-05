import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Checkout() {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [order, setOrder] = useState({
    address: "",
    mobile: "",
    paymentMethod: "COD"
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {

    try {

      const userId =
        localStorage.getItem("userId");

      const res =
        await API.get(`/cart/${userId}`);

      setCart(res.data);

      let grandTotal = 0;

      res.data.forEach(item => {
        grandTotal +=
          item.product.price * item.quantity;
      });

      setTotal(grandTotal);

    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {

    if (
      !order.address ||
      !order.mobile
    ) {
      toast.warning(
        "Please fill all fields"
      );
      return;
    }

    try {

      const userId =
        localStorage.getItem("userId");

      await API.post("/orders", {
        userId,
        address: order.address,
        mobile: order.mobile,
        paymentMethod:
          order.paymentMethod,
        totalAmount: total
      });

      toast.success(
        "🎉 Order Placed Successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed To Place Order"
      );
    }
  };

  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4">
        🧾 Checkout
      </h2>

      <div className="row">

        {/* Address Section */}

        <div className="col-md-7">

          <div className="card shadow p-4">

            <h4 className="mb-3">
              Delivery Details
            </h4>

            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="Enter Delivery Address"
              value={order.address}
              onChange={(e)=>
                setOrder({
                  ...order,
                  address:e.target.value
                })
              }
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Mobile Number"
              value={order.mobile}
              onChange={(e)=>
                setOrder({
                  ...order,
                  mobile:e.target.value
                })
              }
            />

            <select
              className="form-control"
              value={order.paymentMethod}
              onChange={(e)=>
                setOrder({
                  ...order,
                  paymentMethod:e.target.value
                })
              }
            >

              <option value="COD">
                Cash On Delivery
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="CARD">
                Credit / Debit Card
              </option>

            </select>

          </div>

        </div>

        {/* Order Summary */}

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h4 className="mb-3">
              Order Summary
            </h4>

            {cart.map(item => (

              <div
                key={item.id}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {item.product.name}
                  × {item.quantity}
                </span>

                <span>
                  ₹
                  {item.product.price *
                    item.quantity}
                </span>

              </div>

            ))}

            <hr />

            <h5>
              Total :
              <span className="text-success">
                ₹{total}
              </span>
            </h5>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={placeOrder}
            >
              Place Order
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;