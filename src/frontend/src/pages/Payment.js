import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"

import "../App.css"

function Payment() {

  const { price } = useParams()

  const navigate = useNavigate()

  const [status, setStatus] = useState("")
  const [email, setEmail] = useState("")
  const [card, setCard] = useState("")

  const apiHost = process.env.REACT_APP_API_HOST || "";
  const url = apiHost ? `${apiHost}/pay` : "/pay";
  

  const pay = () => {
    
    //fetch("http://api-gateway-service.default.svc.cluster.local:8080/pay", {
    //fetch("http://localhost:8080/pay", { // without ingress, for local testing
    fetch(url, {
    //fetch("/pay", { //ingress will route this to api-gateway
    //fetch("http://localhost:8080/pay", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        amount: Number(price)
      })

    })
      .then(res => res.json())
      .then(data => setStatus(data.status))

  }

  return (

    <div className="paymentContainer">

      <div className="paymentCard">

        <h1>Checkout</h1>

        <h2 className="totalPrice">
          Total: ${price}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Card number"
          value={card}
          onChange={(e)=>setCard(e.target.value)}
          className="input"
        />

        <button
          className="payButton"
          onClick={pay}
        >
          Pay Now
        </button>

        {status && (
          <p className="status">
            {status}
          </p>
        )}

        <button
          className="backButton"
          onClick={()=>navigate("/")}
        >
          Back to Store
        </button>

      </div>

    </div>

  )

}

export default Payment