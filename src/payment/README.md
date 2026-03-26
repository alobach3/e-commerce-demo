# Payment Service
After service start, output should be following
```text
Payment service running on 50052
```
## Run Local
```bash
python app.py
```

## Docker Build 
From root directory
```bash
docker-compose build payment
```

## Generate protos locally
Delete all files except app.py

Run from root directory
```bash
pip install grpcio grpcio-tools
python -m grpc_tools.protoc  -I proto  --python_out=src/payment  --grpc_python_out=src/payment  proto/demo.proto
```
