package main

import (
	"net/http"
	"the-quibits-project/food/infra"
)

func main() {

	http.HandleFunc("/", infra.Ping)

	http.ListenAndServe(":8080", nil)
}
