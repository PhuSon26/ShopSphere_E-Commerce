import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminDashboard() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async () => {

  try {

   await API.post("/products", product);

  toast.success("🎉 Product Added Successfully");

  resetForm();

  loadProducts();

  } catch (error) {

    toast.error("❌ Failed To Add Product");

    console.log(error);
  }
};

  const editProduct = (p) => {

  setEditingId(p.id);

  setProduct({
    name: p.name,
    description: p.description,
    price: p.price,
    quantity: p.quantity,
    imageUrl: p.imageUrl
  });

  document
    .getElementById("productForm")
    ?.scrollIntoView({
      behavior: "smooth"
    });

  toast.info("✏️ Edit Mode Enabled");
};

  const updateProduct = async () => {
    try {
      await API.put(`/products/${editingId}`, product);

      alert("Product Updated Successfully");

      setEditingId(null);

      resetForm();

      loadProducts();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {

  try {

    await API.delete(`/products/${id}`);

    toast.info("🗑️ Product Deleted");

    loadProducts();

  } catch (error) {

    toast.error("❌ Failed To Delete Product");

    console.log(error);
  }
};

  const resetForm = () => {
    setProduct({
      name: "",
      description: "",
      price: "",
      quantity: "",
      imageUrl: ""
    });
  };

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">
        🛒 ShopSphere Admin Dashboard
      </h2>

      {/* Dashboard Cards */}

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <h5>Total Products</h5>
              <h3>{products.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h5>Total Orders</h5>
              <h3>25</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning shadow">
            <div className="card-body text-center">
              <h5>Total Users</h5>
              <h3>10</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
              <h5>Revenue</h5>
              <h3>₹50,000</h3>
            </div>
          </div>
        </div>

      </div>

      {/* Product Form */}

      <div
  id="productForm"
  className="card shadow mb-4"
>
        <div className="card-body">

          <h4 className="mb-3">
            {editingId ? "✏ Update Product" : "➕ Add Product"}
          </h4>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) =>
              setProduct({
                ...product,
                name: e.target.value
              })
            }
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={product.description}
            onChange={(e) =>
              setProduct({
                ...product,
                description: e.target.value
              })
            }
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={product.price}
            onChange={(e) =>
              setProduct({
                ...product,
                price: e.target.value
              })
            }
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Quantity"
            value={product.quantity}
            onChange={(e) =>
              setProduct({
                ...product,
                quantity: e.target.value
              })
            }
          />

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Image URL"
            value={product.imageUrl}
            onChange={(e) =>
              setProduct({
                ...product,
                imageUrl: e.target.value
              })
            }
          />

          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt="preview"
              width="150"
              className="rounded shadow mb-3"
            />
          )}

          <br />

          {editingId ? (
            <button
              className="btn btn-warning"
              onClick={updateProduct}
            >
              Update Product
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={addProduct}
            >
              Add Product
            </button>
          )}

        </div>
      </div>

      {/* Search */}

      <input
        className="form-control mb-3"
        placeholder="🔍 Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Product Table */}

      <div className="card shadow">
        <div className="card-body">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredProducts.map((p) => (

                <tr key={p.id}>

                  <td>
                    <img
                      src={
                        p.imageUrl ||
                        `https://picsum.photos/80?random=${p.id}`
                      }
                      alt="product"
                      width="80"
                      height="80"
                    />
                  </td>

                  <td>{p.name}</td>

                  <td>₹{p.price}</td>

                  <td>{p.quantity}</td>

                  <td>
                    {p.quantity < 5 ? (
                      <span className="badge bg-danger">
                        Low Stock
                      </span>
                    ) : (
                      <span className="badge bg-success">
                        In Stock
                      </span>
                    )}
                  </td>

                  <td>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => editProduct(p)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* Recent Orders */}

      <div className="card shadow mt-4">
        <div className="card-body">

          <h4>📦 Recent Orders</h4>

          <ul className="list-group">

            <li className="list-group-item">
              Order #1001 - ₹1999
            </li>

            <li className="list-group-item">
              Order #1002 - ₹4999
            </li>

            <li className="list-group-item">
              Order #1003 - ₹999
            </li>

          </ul>

        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;