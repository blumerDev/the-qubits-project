package main

import (
	"net/http"
)

func main() {
	// Register the handler
	//http.HandleFunc("/", )

	// Start the server
	http.ListenAndServe(":8080", nil)
}
