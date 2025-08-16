package infra

func (w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Welcome to the Go Library! How can I assist you?")
   }
