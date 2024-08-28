import Toolbar from './components/Toolbar';
import NotesList from './components/NotesList';
import React from 'react';

function App() {
  let [highlightedTextArray, setHighlightedTextArray] = React.useState(() => {
    chrome.storage.local.get("highlightedTextArray", (result) => {
      if (result.highlightedTextArray) {
        setHighlightedTextArray(result.highlightedTextArray);
      }
    });
  });

  function handleHighlight() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "highlight" }, (response) => {
        if (response && response.status === "success") {
          console.log(response.text);
          setHighlightedTextArray((prevArray) => [...prevArray, response.text]);
        } else {
          console.log(response.error || "Highlight action failed.");
        }
      });
    });
  }

  function removeHighlights() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "removeHighlights" }, (response) => {
        if (response && response.status === "highlights removed") {
          console.log("removed highlights");
          setHighlightedTextArray([]);
        } else {
          console.log(response.error || "Highlight action failed.");
        }
      });
    });
  }

  React.useEffect(() => {
    console.log("Updated highlightedTextArray:", highlightedTextArray);
    
    chrome.storage.local.set({ highlightedTextArray }, () => {
      console.log("Saved text to storage.");
    });
  }, [highlightedTextArray]);

  return (
    <div style={{ width: '400px', height: '300px' }}>
      <Toolbar highlightFunction={handleHighlight} removeHighlightsFunction={removeHighlights} />
      <NotesList notesArray={highlightedTextArray} />
    </div>
  );
}

export default App;
