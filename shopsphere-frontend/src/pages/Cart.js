import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const calculateTotal = (items) => {
    let grandTotal = 0;

    items.forEach(item => {
      if (item.product) {
        grandTotal += item.product.price * item.quantity;
      }
    });

    setTotal(grandTotal);
  };

  const loadCart = async () => {
    try {

      const userId =
  localStorage.getItem("userId");

const res =
  await API.get(`/cart/${userId}`);

      const validItems = res.data.filter(
        item => item.product !== null
      );

      setCart(validItems);

      calculateTotal(validItems);

    } catch (error) {
      console.log(error);
    }
  };

  const increaseQty = async (id) => {

  try {

    const item = cart.find(c => c.id === id);

    const newQty = item.quantity + 1;

    await API.put(
      `/cart/${id}?quantity=${newQty}`
    );

    loadCart();

  } catch (error) {
    console.log(error);
  }
};

  const decreaseQty = async (id) => {

  try {

    const item = cart.find(c => c.id === id);

    if (item.quantity <= 1) return;

    const newQty = item.quantity - 1;

    await API.put(
      `/cart/${id}?quantity=${newQty}`
    );

    loadCart();

  } catch (error) {
    console.log(error);
  }
};

  const removeItem = async (id) => {

  try {

    await API.delete(`/cart/${id}`);

    setCart(cart.filter(item => item.id !== id));

    toast.info("🗑️ Product Removed From Cart");

  } catch (error) {

    toast.error("❌ Failed To Remove Product");
  }
};

  return (

    <div className="container mt-4">

      <h2 className="mb-4 text-center">
        🛒 Shopping Cart
      </h2>

      {cart.length === 0 ? (

        <div className="alert alert-warning text-center">
          Cart is Empty
        </div>

      ) : (

        <>
          {cart.map(item => (

            <div
              className="card mb-4 shadow border-0"
              key={item.id}
            >
              <div className="row g-0">

                <div className="col-md-3">

                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="img-fluid rounded-start"
                    style={{
                      height: "250px",
                      width: "100%",
                      objectFit: "cover"
                    }}
                  />

                </div>

                <div className="col-md-9">

                  <div className="card-body">

                    <h4 className="fw-bold">
                      {item.product.name}
                    </h4>

                    <p className="text-muted">
                      {item.product.description}
                    </p>

                    <h5 className="text-success fw-bold">
                      ₹{item.product.price}
                    </h5>

                    {/* Quantity */}

                    <div
                      className="d-flex align-items-center mt-3"
                    >

                      <button
                        className="btn btn-outline-danger btn-lg"
                        onClick={() =>
                          decreaseQty(item.id)
                        }
                      >
                        −
                      </button>

                      <span
                        className="mx-4 fw-bold fs-4"
                      >
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-success btn-lg"
                        onClick={() =>
                          increaseQty(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                    <h5 className="mt-3">
                      Subtotal :
                      ₹{item.product.price * item.quantity}
                    </h5>

                    <button
                      className="btn btn-danger mt-3"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      Remove Item
                    </button>

                  </div>

                </div>

              </div>
            </div>

          ))}

          <div className="card shadow-lg p-4 text-center">

            <h3 className="fw-bold">
              Grand Total : ₹{total}
            </h3>


            <button
  className="btn btn-primary mt-3"
  onClick={() => navigate("/checkout")}
>
  Proceed To Checkout
</button>
            

          </div>

        </>

      )}

    </div>
  );
}

export default Cart;