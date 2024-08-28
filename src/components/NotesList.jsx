import NoteEntry from "./NoteEntry";

function NotesList({ notesArray }) {
  let highlightedNotesArray = <p>No Notes Yet!</p>

  if (notesArray && notesArray.length > 0) {
    console.log(notesArray);
    highlightedNotesArray = notesArray.map((note, index) => {
      return (
        <NoteEntry id={index} note={note} />
      );
    })
  }

  return (
    <>
      <h1>Notes List</h1>
      <div>
        {highlightedNotesArray}
      </div>
    </>
  );
}

export default NotesList;