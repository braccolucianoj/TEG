#!/usr/bin/env bash
curl -O https://dl.min.io/client/mc/release/darwin-amd64/mc
chmod +x mc
./mc alias set myminio http://localhost:9000 minio_access_key minio_secret_key --api S3v4
# creating dev bucket
./mc mb myminio/dev
# creating public policy
./mc policy set public myminio/dev
rm mc