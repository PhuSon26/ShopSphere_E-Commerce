function ProductCard({ product, addToCart }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow">
        <img src={product.imageUrl} className="card-img-top" alt="" />

        <div className="card-body text-center">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <h6 className="text-success">₹{product.price}</h6>

          <button
            className="btn btn-primary w-100"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;