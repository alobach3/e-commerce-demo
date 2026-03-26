import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import ProductCard from "../components/ProductCard"

import "../App.css"

function Products() {

  const [products, setProducts] = useState([])

  const navigate = useNavigate()

  const apiHost = process.env.REACT_APP_API_HOST || "";
  const url = apiHost ? `${apiHost}/products` : "/products";

  useEffect(() => {

    //fetch("http://localhost:8080/products") // without ingress, for local testing
    //fetch("http://api-gateway-service.default.svc.cluster.local:8080/products")
    fetch(url)
    //fetch("/products") //ingress will route this to api-gateway
      .then(res => res.json())
      .then(data => setProducts(data.products))

  }, [])


  const buy = (price) => {

    navigate(`/payment/${price}`)

  }


  return (

    <div className="container">

      <h1 className="title">
        Anime Merch
      </h1>

      <div className="grid">

        {products.map(product => (

          <ProductCard
            key={product.id}
            product={product}
            onBuy={buy}
          />

        ))}

      </div>

    </div>

  )

}

export default Products