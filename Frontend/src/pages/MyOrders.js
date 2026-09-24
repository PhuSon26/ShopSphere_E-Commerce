import { useEffect, useState } from "react";
import API from "../services/api";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders = async () => {

    const userId =
      localStorage.getItem("userId");

    const res =
      await API.get(`/orders/${userId}`);

    setOrders(res.data);
  };

  return (

    <div className="container mt-4">

      <h2>📦 My Orders</h2>

      <table className="table mt-3">

        <thead>

          <tr>
            <th>Order Id</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {orders.map(order => (

            <tr key={order.id}>

              <td>{order.id}</td>

              <td>
                ₹{order.totalAmount}
              </td>

              <td>
                {order.paymentMethod}
              </td>

              <td>
                {order.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MyOrders;