package rest

import (
	"log/slog"
	"net/http"
)

func Ping(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "json; charset=utf-8")
	if _, err := w.Write([]byte("pong")); err != nil {
		slog.Error("Failed to write response", err)
	}
}
