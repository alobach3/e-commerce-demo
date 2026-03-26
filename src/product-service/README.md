# Product Service
After service start output should be following:
```text
2026/03/26 20:08:12 Product service running on 50051
```

## Local Build
For Windows:
```bash
go mod download
go build -o product-service.exe main.go
./product-service.exe
```
For Linux
```bash
go mod download
go build -o product-service main.go
./product-service
```

## Docker Build
From root directory 
```bash
docker-compose build product-service
```

## Generate protos locally
Delete all files except main.go
```bash
go mod init product-service
go get google.golang.org/grpc
go get google.golang.org/protobuf
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```
From product-service catalog
```bash
protoc -I ../../proto --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative ../../proto/demo.proto
```
Create new folder named "productservice" and add here generated files

Run and Test
```bash
go mod tidy
go run main.go
```
