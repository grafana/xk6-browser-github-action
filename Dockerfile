FROM golang:1.19 AS deps

RUN go install go.k6.io/xk6/cmd/xk6@latest
RUN xk6 build --output "/tmp/k6" --with github.com/grafana/xk6-browser

# ------------------------------------

FROM golang:1.19

COPY --from=deps /tmp/k6 /usr/bin/k6
COPY server.go /go/server.go
COPY entrypoint.sh /entrypoint.sh

RUN apt update && apt install -y chromium

ENV K6_BROWSER_HEADLESS=true
ENV K6_BROWSER_ENABLED=true

ENTRYPOINT ["/entrypoint.sh"]
