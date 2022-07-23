package main

import (
	"embed"
	"encoding/json"
	"fmt"
	"io/fs"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"os/exec"
	"runtime"
	"path/filepath"
)

type fileAndTranspose struct {
	fileName string
	tranpose string
}

//go:embed build
var content embed.FS

func getFileSystem() http.FileSystem {
	fsys, err := fs.Sub(content, "build")
	if err != nil {
		fmt.Println(err)
	}
	return http.FS(fsys)
}


func multipleFiles(r *http.Request) []fileAndTranspose {
	// setting the max size
	err := r.ParseMultipartForm(200 << 20)
	// fmt.Println(r)
	// handle err
	if err != nil {
		fmt.Println(err)
	}
	var fileNameList []fileAndTranspose
	value := r.FormValue("transpose")
	// list of files from the form
	// fmt.Println(r.MultipartForm)
	// iterate through them
	for _, fh := range r.MultipartForm.File["files"] {
		// fmt.Println(fh)
		// append files to lise
		// printing to console, fileName, size, and header
		fmt.Printf("Uploaded File: %+v\n", fh.Filename)
		fmt.Printf("FileSize: %+v\n", fh.Size)
		fmt.Printf("MIME Header: %+v\n", fh.Header)
		// add timeToFileName
		// tempFileName := addTimeToFileName(fh.Filename)
		fileNameList = append(fileNameList, fileAndTranspose{fileName: fh.Filename, tranpose: value})
		// create and Write each File
		//getting the file from file.Header
		theFile, _ := fh.Open()
		// passing the file along with the file name to save it as
		createAndWriteFile(getFullPath(fh.Filename), theFile)
		fmt.Println("Successfully created the file")
		
		//change this so we process the pdf and extract text
		//getTextAndTranspose(tempFileName, )
		// print each one of the files
	}
	fmt.Println("End Of loop")
	return fileNameList
}
func transposeAndJsonify(fileList []fileAndTranspose) []byte {
	resp := make(map[string]string)
	for _, file := range fileList {
		chords := getTextAndTranspose(file.fileName, file.tranpose)
		resp["text"] = chords
	}
	// resp["checker"] = "SOLI DEO GLORIA"
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		fmt.Printf("Error happened in JSON marshal. Err: %s", err)
	}
	return jsonResp
}

// need to refactor code into smaller function
func pdfFileUpload(res http.ResponseWriter, r *http.Request) {
	fmt.Println("File upload endpoint")
	if r.Method == "GET" {
		fileByte, _ := content.ReadFile("index.html")
		res.Write(fileByte)
		return
	}
	if r.Method == "POST" {
		//data := tester{name: "Soli Deo Gloria"}
		fmt.Println("POST")
		// theFiles := multipleFiles(r)
		res.Header().Set("Content-Type", "application/json")
		res.WriteHeader(http.StatusOK)
		// jsonData := []byte(`{"text":"SOLI DEO GLORIA! 777"}`)
		files := multipleFiles(r)
		fmt.Println("Herer")
		jsonByte := transposeAndJsonify(files)
		res.Write(jsonByte)

		// json := transposeAndJsonify(theFiles)
		fmt.Println("END OF POST")
		// fmt.Println(jsonByte)
		return
	}
}

func createAndWriteFile(theFileName string, file multipart.File) {
	// fmt.Println(theFileName, "FileName not ABS")
	absPath := getFullPath(theFileName)
	fmt.Println(absPath)
	f, err := os.Create("/app/temp/"+theFileName)
	if err != nil {
		fmt.Println(err)
		fmt.Println("TEMPFILE CREATION ERROR")
	}
	//Reading the file into byte Array
	defer file.Close()
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println("There was an error reading file into fileByes")
		fmt.Print(err)
	}
	defer f.Close()
	_, err = f.Write(fileBytes)
	if err != nil {
		fmt.Println("There was an error writing fileBytes to temp file")
		log.Fatalln(err)
	}
	//Write the file into temp from byte array

	fmt.Println("Successfully saved file")
}

func hostOS() string {
	theOS := runtime.GOOS
	switch theOS{
	case "darwin":
		return "MacOS"
	case "windows":
		return "Microsoft Windows"
	case "linux":
		return "Linux"
	}
	return theOS
}
func getTextAndTranspose(filePath string, transpose string) string {
	thePath := getFullPath("/app/temp/"+filePath)
	command := exec.Command("python3", "/app/transpose.py", thePath, transpose)
	// fmt.Println(command,"Command Struct")
	output, err := command.CombinedOutput()
	if err != nil {
		fmt.Println(err, "Error with calling python script")
	}

	fmt.Println("Output: ", string(output))
	// fmt.Println(string(output))
	return string(output)
}

func getFullPath(path string) string {
	thePath, err := filepath.Abs(path)
	if err != nil {
		log.Fatalln(err)
	}
	return thePath
}

func main() {
	getTextAndTranspose("he_who_is_mighty-a-guitar.pdf", "3")
	port := ":3001"
	os := hostOS()
	fmt.Printf("Starting Server on %s %s \n", os, port)

	http.Handle("/", http.FileServer(getFileSystem()))
	http.HandleFunc("/upload", pdfFileUpload)
	http.ListenAndServe(port, nil)
}