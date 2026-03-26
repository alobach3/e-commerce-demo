FROM golang:1.26 AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download
    
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GO111MODULE=on go build -ldflags "-s -w" -o product-service main.go

FROM alpine:latest AS release
WORKDIR /app
COPY --from=builder /app/product-service/ .
#EXPOSE 50051
ENTRYPOINT ["./product-service"]
