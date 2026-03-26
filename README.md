# E-COMMERCE DEMO
```text
A simple e-commerce demo project for learning and showcasing DevOps practices. 
This project demonstrates 4 simple microservices using gRPC framework for fast communication between backend services.
```
---

## TECH STACK
- **Frontend:** React.js [[frontend]](https://github.com/alobach3/e-commerce-demo/tree/main/src/frontend)
- **API-GATEWAY:** Flask [[api-gateway]](https://github.com/alobach3/e-commerce-demo/tree/main/src/api-gateway)
- **Payment service:** Python [[payment]](https://github.com/alobach3/e-commerce-demo/tree/main/src/payment)
- **Product service:** Go [[product-service]](https://github.com/alobach3/e-commerce-demo/tree/main/src/product-service)
- **Infrastructure:** Docker, Docker Compose, Kubernetes
- **CI/CD:** GitHub Actions

---

## Project Structure
```text
E-Commerce Demo
├── docker-compose frontend-dev.yml # docker compose used for development purpose
├── docker-compose.yml # docker compose for building microservices locally
├── k8s # Kubernetes manifests for each microservice and for ingress
│   ├── api-gateway.yaml
│   ├── frontend.yaml
│   ├── ingress.yaml
│   ├── payment.yaml
│   └── product-service.yaml
├── proto  # Protocol Buffers definitions for gRPC services
│   └── demo.proto
├── .github
│   └── workflows # CI for building and pushing docker images
│       └── product-service-CI.yml # for product service
└── src
    ├── api-gateway # Gateway for HTTP->gRPC translation
    ├── frontend # Frontend Service 
    ├── payment # Simple payment service using gRPC
    └── product-service # Simple product service using gRPC

```
---

## Architecture

<p align="center">
  <img src="https://github.com/alobach3/e-commerce-demo/blob/main/Architecture.png" width="700"/>
</p>

---

## Gettind Started - Docker Compose (Local)
```bash
docker-compose up --build
```
- Frontend: http://localhost
- API GATEWAY: http://localhost:8080
- gRPC services: product-service on port 50051 and payment service on port 50052

## Getting Started - Kubernetes Minikube (Local)
- Apply manifests under folder k8s:
```bash
kubectl apply -f ./k8s/api-gateway.yaml
kubectl apply -f ./k8s/frontend.yaml
kubectl apply -f ./k8s/payment.yaml
kubectl apply -f ./k8s/product-service.yaml
```
- Enable Ingress
```bash
minikube addons enable ingress
kubectl get pods -n ingress-nginx
kubectl edit svc ingress-nginx-controller -n ingress-nginx
```
> in the opened file add "type: LoadBalancer" instead of "NodePort"
- Apply ingress manifest
```bash
kubectl apply -f ./k8s/ingress.yaml
```
- Enable Minikube tunneling
```bash
minikube tunnel
```
- Check External Ip for Ingress-LoadBalancer
```bash
kubectl get svc -n ingress-nginx
```
- Add external Ip in etc/hosts. For Windows: C:\Windows\System32\drivers\etc/hosts
> Example: 
> 127.0.0.1 myapp.local
- Webpage should be available under link http://myapp.local 
