package main

import (
	"log/slog"
	"net/http"
	"os"
	"the-quibits-project/food/infra/rest"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	http.HandleFunc("/", rest.Ping)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		slog.Error("Failed to start server", err)
		panic(err)
	}

	slog.Info("Server listening on :8080")
}
