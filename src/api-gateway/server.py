import os

from flask import Flask, jsonify, request
from flask_cors import CORS
import grpc
import demo_pb2
import demo_pb2_grpc

app = Flask(__name__)
CORS(app)  # CORS

# Resolve service hostnames via env vars (works in Docker and local)
product_host = os.getenv("PRODUCT_HOST", "product-service")
#product_host = os.getenv("PRODUCT_HOST", "product-service.default.svc.cluster.local")
payment_host = os.getenv("PAYMENT_HOST", "payment")
#payment_host = os.getenv("PAYMENT_HOST", "payment-service")
#payment_host = os.getenv("PAYMENT_HOST", "payment-service.default.svc.cluster.local")

# Product Service gRPC client
product_channel = grpc.insecure_channel(f"{product_host}:50051")
#grpc.channel_ready_future(product_channel).result(timeout=5) for kubernetes
product_client = demo_pb2_grpc.ProductServiceStub(product_channel)

# Payment Service gRPC client
payment_channel = grpc.insecure_channel(f"{payment_host}:50052")
#grpc.channel_ready_future(payment_channel).result(timeout=5) for kubernetes
payment_client = demo_pb2_grpc.PaymentServiceStub(payment_channel)

@app.route("/products", methods=["GET"])
def products():
    res = product_client.ListProducts(demo_pb2.Empty())
    products_list = []
    for p in res.products:
        products_list.append({
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "image": p.image  
        })
    return jsonify({"products": products_list})

@app.route("/pay", methods=["POST"])
def pay():
    data = request.json
    res = payment_client.Charge(demo_pb2.PaymentRequest(amount=data["amount"]))
    return jsonify({"status": res.status})

# test comment
#if __name__ == "__main__":
#    print("API Gateway running on http://localhost:8080")
#    app.run(port=8080)

if __name__ == "__main__":
    print("API Gateway running on http://0.0.0.0:8080")
    app.run(host="0.0.0.0", port=8080)
