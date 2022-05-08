package main

import "runtime"

func hostOS() string{
	theOS := runtime.GOOS	
	return theOS
}