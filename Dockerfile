FROM golang:1.19 AS deps

RUN go install go.k6.io/xk6/cmd/xk6@latest
RUN xk6 build --output xk6-browser --with github.com/grafana/xk6-browser

# ------------------------------------

FROM golang:1.19 AS runner

RUN apt update && apt install -y chromium
COPY --from=deps /go/xk6-browser /go/xk6-browser

COPY server.go /go/server.go
COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
