FROM golang:1.19-bullseye as builder

RUN go install -trimpath go.k6.io/xk6/cmd/xk6@latest
RUN xk6 build --output "/tmp/k6" --with github.com/grafana/xk6-browser

# ------------------------------------

FROM golang:1.19-bullseye

RUN apt update && apt install -y chromium

COPY --from=builder /tmp/k6 /usr/bin/k6
COPY server.go /go/server.go
COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]