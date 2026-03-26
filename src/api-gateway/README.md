# API Gateway Service
After service start, output should be following
```text
API Gateway running on http://0.0.0.0:8080
 * Serving Flask app 'server'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:8080
 * Running on http://192.168.0.102:8080
Press CTRL+C to quit
```
## Run Local
```bash
python server.py
```

## Docker Build 
From root directory
```bash
docker-compose build api-gateway
```

## Generate protos locally
Delete all files except server.py

Run from root directory
```bash
pip install grpcio grpcio-tools
python -m grpc_tools.protoc  -I proto  --python_out=src/api-gateway  --grpc_python_out=src/api-gateway  proto/demo.proto
```
