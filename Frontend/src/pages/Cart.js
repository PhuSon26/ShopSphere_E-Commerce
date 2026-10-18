import { useCallback, useEffect, useState } from "react";
import { ORDER_API, PRODUCT_API } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const calculateTotal = useCallback((items) => {
    const grandTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setTotal(grandTotal);
  }, []);

  const loadCart = useCallback(async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setCart([]);
        setTotal(0);
        return;
      }

      const res = await ORDER_API.get(`/cart/${userId}`);
      const cartItems = res.data;

      const cartWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          try {
            const productRes = await PRODUCT_API.get(
              `/products/${item.productId}`
            );

            return {
              ...item,
              product: productRes.data,
            };
          } catch (error) {
            console.error(
              "Cannot load product:",
              item.productId,
              error
            );

            return {
              ...item,
              product: null,
            };
          }
        })
      );

      const validItems = cartWithProducts.filter(
        (item) => item.product !== null
      );

      setCart(validItems);
      calculateTotal(validItems);
    } catch (error) {
      console.error("Load Cart Error:", error);
      toast.error("Cannot Load Cart");
    }
  }, [calculateTotal]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const increaseQty = async (id) => {
    try {
      const item = cart.find((cartItem) => cartItem.id === id);

      if (!item) return;

      await ORDER_API.put(
        `/cart/${id}?quantity=${item.quantity + 1}`
      );

      await loadCart();
    } catch (error) {
      console.error("Increase Quantity Error:", error);
      toast.error("Failed To Increase Quantity");
    }
  };

  const decreaseQty = async (id) => {
    try {
      const item = cart.find((cartItem) => cartItem.id === id);

      if (!item || item.quantity <= 1) {
        return;
      }

      await ORDER_API.put(
        `/cart/${id}?quantity=${item.quantity - 1}`
      );

      await loadCart();
    } catch (error) {
      console.error("Decrease Quantity Error:", error);
      toast.error("Failed To Decrease Quantity");
    }
  };

  const removeItem = async (id) => {
    try {
      await ORDER_API.delete(`/cart/${id}`);

      const updatedCart = cart.filter(
        (item) => item.id !== id
      );

      setCart(updatedCart);
      calculateTotal(updatedCart);

      toast.info("🗑️ Product Removed From Cart");
    } catch (error) {
      console.error("Remove Item Error:", error);
      toast.error("Failed To Remove Product");
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
          {cart.map((item) => (
            <div
              className="card mb-4 shadow border-0"
              key={item.id}
            >
              <div className="row g-0">
                <div className="col-md-3">
                  <img
                    src={
                      item.product?.imageUrl ||
                      "https://via.placeholder.com/300"
                    }
                    alt={
                      item.product?.name ||
                      item.productName ||
                      "Product"
                    }
                    className="img-fluid rounded-start"
                    style={{
                      height: "250px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-9">
                  <div className="card-body">
                    <h4 className="fw-bold">
                      {item.product?.name ||
                        item.productName ||
                        "Unknown Product"}
                    </h4>

                    <p className="text-muted">
                      {item.product?.description ||
                        "No description available"}
                    </p>

                    <h5 className="text-success fw-bold">
                      ₹{item.price}
                    </h5>

                    <div className="d-flex align-items-center mt-3">
                      <button
                        className="btn btn-outline-danger btn-lg"
                        onClick={() => decreaseQty(item.id)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span className="mx-4 fw-bold fs-4">
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-success btn-lg"
                        onClick={() => increaseQty(item.id)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <h5 className="mt-3">
                      Subtotal: ₹
                      {item.price * item.quantity}
                    </h5>

                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => removeItem(item.id)}
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
              Grand Total: ₹{total}
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