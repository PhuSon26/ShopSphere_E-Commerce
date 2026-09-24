import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    const res =
      await API.get("/orders");

    setOrders(res.data);
  };

  const updateStatus = async (
    id,
    status
  ) => {

    await API.put(
      `/orders/${id}/${status}`
    );

    loadOrders();
  };

  return (

    <div className="container mt-4">

      <h2>
        📦 Admin Orders
      </h2>

      <table className="table mt-3">

        <thead>

          <tr>

            <th>ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {orders.map(order => (

            <tr key={order.id}>

              <td>{order.id}</td>

              <td>{order.userId}</td>

              <td>
                ₹{order.totalAmount}
              </td>

              <td>
                {order.status}
              </td>

              <td>

                <button
                  className="btn btn-success btn-sm"
                  onClick={() =>
                    updateStatus(
                      order.id,
                      "DELIVERED"
                    )
                  }
                >
                  Deliver
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminOrders;