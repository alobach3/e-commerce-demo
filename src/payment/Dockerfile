FROM python:3.11-slim AS builder
WORKDIR /app
RUN --mount=type=bind,source=./requirements.txt,target=/tmp/requirements.txt \
    pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --requirement /tmp/requirements.txt --prefix=/install

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /install /usr/local
COPY . .
#EXPOSE 50052
ENTRYPOINT ["python", "app.py"]