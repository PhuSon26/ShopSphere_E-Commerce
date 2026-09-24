import { useEffect, useState } from "react";
import { ORDER_API, PRODUCT_API } from "../services/api";
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

      if (!userId) {

        setCart([]);
        setTotal(0);

        return;
      }

      // Get cart from Order Service
      const res =
        await ORDER_API.get(
          `/cart/${userId}`
        );

      const cartItems = res.data;

      // Get product information from Product Service
      const cartWithProducts =
        await Promise.all(

          cartItems.map(async (item) => {

            try {

              const productRes =
                await PRODUCT_API.get(
                  `/products/${item.productId}`
                );

              return {
                ...item,
                product: productRes.data
              };

            } catch (error) {

              console.log(
                "Cannot load product:",
                item.productId
              );

              return {
                ...item,
                product: null
              };

            }

          })

        );

      // Remove products that no longer exist
      const validItems =
        cartWithProducts.filter(
          item => item.product !== null
        );

      setCart(validItems);

      // Calculate total
      let grandTotal = 0;

      validItems.forEach(item => {

        grandTotal +=
          item.price * item.quantity;

      });

      setTotal(grandTotal);

    } catch (error) {

      console.log(
        "Load Cart Error:",
        error
      );

      toast.error(
        "❌ Cannot Load Cart"
      );

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

    if (cart.length === 0) {

      toast.warning(
        "Your cart is empty"
      );

      return;
    }

    try {

      const userId =
        localStorage.getItem("userId");

      await ORDER_API.post(
        "/orders",
        {
          userId: Number(userId),
          address: order.address,
          mobile: order.mobile,
          paymentMethod:
            order.paymentMethod,
          totalAmount: total
        }
      );

      toast.success(
        "🎉 Order Placed Successfully"
      );

      setCart([]);
      setTotal(0);

    } catch (error) {

      console.log(
        "Place Order Error:",
        error
      );

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

        {/* Delivery Details */}

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
              onChange={(e) =>
                setOrder({
                  ...order,
                  address: e.target.value
                })
              }
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Mobile Number"
              value={order.mobile}
              onChange={(e) =>
                setOrder({
                  ...order,
                  mobile: e.target.value
                })
              }
            />

            <select
              className="form-control"
              value={order.paymentMethod}
              onChange={(e) =>
                setOrder({
                  ...order,
                  paymentMethod: e.target.value
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

                  {
                    item.product?.name ||
                    item.productName
                  }

                  × {item.quantity}

                </span>

                <span>

                  ₹
                  {
                    item.price *
                    item.quantity
                  }

                </span>

              </div>

            ))}

            <hr />

            <h5>

              Total :

              <span className="text-success ms-2">
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