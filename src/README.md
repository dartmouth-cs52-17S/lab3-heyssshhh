## LAB 3 - REACT NOTES

## Extra Credit
* Undo button
* resize editing window
* Dragged note always on top
* Press enter and title changes will be saved, exits editing mode

### Limitations
* All extra credits worked perfectly without firebase. With firebase, sometimes you have to click a note from a previous session for you to drag your current note over it. This is because after refreshing the page the current session's highest zindex may be lower than the last sessions and I have not figured out a way to access the highest historical zindex. 
* I wanted to press enter and exit editing note content but I realized it was inconvenient because people might want a new line, hence I only gave the title the option to exit by pressing enter