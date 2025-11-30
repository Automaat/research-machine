package main

import (
	"fmt"
	"os"
)

// Test file with common Go mistakes for skill testing

// Missing documentation on exported function (#15)
func ProcessData(filename string) error {
	// Using filename instead of io.Reader (#46)
	file, err := os.Open(filename)
	if err != nil {
		// Not wrapping error with context (#49)
		return err
	}
	// Not closing resource (#79)

	data := make([]byte, 1024)
	_, err = file.Read(data)
	if err != nil {
		return err
	}

	// Unnecessary nesting (#2)
	if len(data) > 0 {
		if data[0] == 'A' {
			fmt.Println("Starts with A")
		}
	}

	return nil
}

// Unnecessary nested code (#2)
func CheckValue(val int) string {
	if val > 0 {
		if val < 100 {
			return "small"
		} else {
			return "large"
		}
	}
	return "invalid"
}

// Goroutine without stop mechanism (#62)
func StartBackground() {
	go func() {
		for {
			// Infinite loop with no exit
			fmt.Println("running")
		}
	}()
}

// Ignored error (#53)
func IgnoreError() {
	file, _ := os.Open("test.txt")
	defer file.Close()
}

func main() {
	_ = ProcessData("test.txt")
}
