## LAB 3 - REACT NOTES

I made a noteboard webapp where users can update their notes real time with others. Users can add a note to the board by clicking add, and undo changes by clicking the undo button. They can also give the note a title, and alter the title, content and size of the note. I mainly used React and Firebase.

## Extra Credit
* Undo button
* resizable notes
* Dragged note always on top
* Press enter and title changes will be saved, exits editing mode

### Limitations & Things that didn't work
* The undo button worked perfectly without firebase. With firebase, after undoing you have to do some new action for it to push the new state of the board up to firebase otherwise it wont save at the undone point. This is because I used an Immutable stack. The undo button works perfectly within the same session.
* I wanted the note to exit editng mode when the user pressed "Enter" key. I realized it was inconvenient because people might want a new line, hence I only gave the title the option to exit by pressing enter
* Resizing notes works in the same session, but if you refresh they go back to the original size
