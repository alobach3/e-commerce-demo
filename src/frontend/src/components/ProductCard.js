function ProductCard({ product, onBuy }) {

  return (

    <div className="card">

      <img
        src={product.image}
        alt={product.name}
        className="image"
      />

      <div className="info">

        <h3>{product.name}</h3>

        <p className="category">
          {product.category}
        </p>

        <p className="price">
          ${product.price}
        </p>

        <button
          className="buyButton"
          onClick={() => onBuy(product.price)}
        >
          Buy
        </button>

      </div>

    </div>

  )

}

export default ProductCard