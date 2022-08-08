package main


// "encoding/json"
// "fmt"
// "time"
// "os/exec"
const (
	Major = ""
	Major7 = "maj7"
	Minor = "m"
	Minor7 = "m7"
	Seven = "7"
	Diminished = "dim"
	HalfDiminished = "m7b5"
	Augmented = "aug"
	PowerChord = "5"
)
const (
	Sharps int = iota
	Flats  
)
var(
	notesSharps = []string{"A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"}
	notesflats =  []string{"A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"}
)

type Chord struct {
	Root string `json:"root"`
	ChordType string `json:"chord"`
}

func (c Chord) newChord(root string, chord string) Chord {
	//have some verification here to make sure the chord is valid as well as the root note
	return Chord{Root: root, ChordType: chord}
}

func (c Chord) Transpose(interval int){
	
}

func containsInArray[T comparable](chord T, array []T) bool {
	//verify the chord is valid
	for _, note := range array {
		if note == chord {
			return true
		}
	}
	return false
}

func isNoteValid(chord string) bool {
	if containsInArray(chord, notesSharps) || containsInArray(chord, notesflats) {
		return true
	}
	return false
}

func sharpsToFlat(root string) string {
	for i, note := range notesSharps {
		if note == root {
			return notesflats[i]
		}
	}
	return ""
}

func FlatsToSharps(root string) string {
	for i, note := range notesflats {
		if note == root {
			return notesSharps[i]
		}
	}
	return ""
}

func Map[T any](array []T, fun func(T) T) []T{
	newList := []T{}
	for _, item := range array {
		temp := fun(item)
		newList = append(newList, temp)
	}
	return newList
}

func Filter[T any](array []T, fun func(T) bool) []T{
	newList := []T{}
	for _, item := range array {
		if fun(item) {
			newList = append(newList, item)
		}
	}
	return newList
}