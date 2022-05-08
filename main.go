package main

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
)

//go:embed build
var content embed.FS

func clientHandler() http.Handler {
	fsys := fs.FS(content)
	contentStatic, _ := fs.Sub(fsys, "client/build")
	return http.FileServer(http.FS(contentStatic))
}

func getFileSystem() http.FileSystem{
	fsys, err := fs.Sub(content, "build")
	if err != nil{
		panic(err)
	}
	return http.FS(fsys)
}

func main() {
	os := hostOS()
	fmt.Printf("Starting Server %s", os)
	handler := http.FileServer(getFileSystem())
	http.ListenAndServe(":3001", handler)
}
