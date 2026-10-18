# Payment Service MVP

MVP Java 17 / Spring Boot payment service intended to become two runtime images: **payment-api** and **payment-worker**. Both connect to the existing shared MySQL server and use only payment-owned tables (`payment_transactions`). RabbitMQ and Redis are intentionally not required in this first version.

## What it does

- `POST /api/v1/payments`: accepts an order payment, requires `Idempotency-Key`, stores it as `PENDING`, returns `202 Accepted`.
- `GET /api/v1/payments/{paymentId}`: reads current status and checkout URL.
- Worker polls pending rows from the same MySQL database. `mock` completes demo transactions; `momo` creates a MoMo checkout and waits for its signed IPN callback.
- MoMo requests and IPN signatures use HMAC-SHA256. The callback verifies the signature, payment ID, amount, and payment method before changing status.
- Health endpoint: `/actuator/health`.

This MVP does not collect or store card numbers, bank passwords, OTPs, or wallet credentials. MoMo integration needs merchant sandbox credentials and a publicly reachable HTTPS IPN URL. Use the MoMo test app and credentials for testing; do not point this starter at production money movement without provider onboarding, security review, reconciliation, retries, and operational controls.

## Run locally

Requirements: Java 17, Maven 3.9+, an existing MySQL server. Create a database/schema and a restricted DB user for this service. Do not put raw credentials in Git.

```bash
cp .env.example .env
# Edit .env to point at the MySQL server shared with your other services.
docker compose up --build
```

Compose starts API and worker containers only; it does not create a second MySQL, Redis, or RabbitMQ. On Docker Desktop, `host.docker.internal` points to the host. For an existing MySQL container, set `MYSQL_HOST` to that container's network DNS name and attach this compose project to its Docker network.

For local Maven run, export the datasource variables from `.env`, then run `mvn spring-boot:run` for the API and `APP_ROLE=worker mvn spring-boot:run` for the worker. For Windows PowerShell, set `$env:APP_ROLE='worker'` before launching the worker.

## API example

```bash
curl -i http://localhost:8080/api/v1/payments \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: order-1001-payment-1' \
  -d '{"orderId":"order-1001","amount":125000,"currency":"VND","method":"MOCK"}'
```

The response is initially `PENDING`; poll `GET /api/v1/payments/{paymentId}`. With `PAYMENT_GATEWAY=mock`, the worker changes it to `SUCCEEDED`. Repeat the same request with the same key to retrieve the original payment. Reusing a key for different payment details returns `400`.

To try MoMo sandbox, set `PAYMENT_GATEWAY=momo`, fill the `MOMO_*` credentials/URLs, restart, and send `"method":"MOMO"`. The returned payment will reach `REQUIRES_ACTION` with `checkoutUrl`; redirect the customer there. MoMo's server-to-server IPN moves it to `SUCCEEDED` or `FAILED`. Redirects alone are not treated as proof of payment.

## Building separate images later

The same source and jar can run with either role. `docker-compose.yml` builds and tags two images from the same Dockerfile:

- API image: `APP_ROLE=api` (HTTP endpoints)
- Worker image: `APP_ROLE=worker` (background payment processing)

To publish them separately, build twice with `docker build -t your-name/payment-api:0.1.0 .` and `docker build -t your-name/payment-worker:0.1.0 .`, then set the appropriate `APP_ROLE` in each deployment. A later production version should use separate minimal entrypoints and a durable message broker/outbox if payment volume requires it.

## Table ownership

The database server/schema may be shared with other services, while these rows remain isolated in `payment_transactions`. In production, provision the schema and database account through migrations/IaC, then change `spring.jpa.hibernate.ddl-auto` from `update` to `validate` and add Flyway migrations.
