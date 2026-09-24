import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PRODUCT_API, ORDER_API } from "../services/api";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

function Products() {

  const [products, setProducts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const searchParam =
    new URLSearchParams(location.search);

  const searchText =
    searchParam.get("search") || "";

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {

    try {

      const res = await PRODUCT_API.get("/products");

      setProducts(res.data);

    } catch (error) {

      console.log(error);

      toast.error("Cannot load products");

    }
  };

  const addToCart = async (product) => {

    const userId =
      localStorage.getItem("userId");

    if (!userId) {

      toast.warning("Please Login First");

      navigate("/login");

      return;
    }

    try {

      await ORDER_API.post("/cart", {

        userId: Number(userId),

        productId: product.id,

        productName: product.name,

        price: product.price,

        quantity: 1

      });

      toast.success(
        "🛒 Product Added Successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "❌ Something Went Wrong"
      );
    }
  };

  const filteredProducts =
    products.filter(product =>
      product.name
        ?.toLowerCase()
        .includes(
          searchText.toLowerCase()
        )
    );

  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4">
        🛍️ Our Products
      </h2>

      {searchText && (

        <div className="alert alert-info">

          Search Result For:
          <strong>
            {" "}
            {searchText}
          </strong>

        </div>

      )}

      <div className="row">

        {filteredProducts.length > 0 ? (

          filteredProducts.map(product => (

            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />

          ))

        ) : (

          <div className="col-12">

            <div className="alert alert-warning text-center">

              No Product Found

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Products;