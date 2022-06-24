package main

import (
	// "encoding/json"
	// "fmt"
	// "time"
	// "os/exec"
)

type Chords interface{
	tranpose(string) string
	swapSharpAndFlats(string) string
}