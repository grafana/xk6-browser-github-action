package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fileServer := http.FileServer(http.Dir("./dist"))
	http.Handle("/", fileServer)

	fmt.Sprintf("Starting server at port %d\n", 9000)

	if err := http.ListenAndServe(":9000", nil); err != nil {
		log.Fatal(err)
	}
}
