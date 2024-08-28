console.log("Content Script is running.");

let highlights = [];

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "highlight") {
    try {
      selectedText = highlightText();
      sendResponse({ status: "success", text: selectedText });
    } catch (error) {
      console.log("Error in content script: ", error);
    }
  } else if (message.action === "removeHighlights") {
    removeHighlights();
    sendResponse({ status: "highlights removed" });
  } else {
    sendResponse({ status: "unknown action" });
  }
  return true;
});


function highlightText() {
  let selection = window.getSelection();
  let text = selection.toString();

  try {
    if (!selection.isCollapsed) {
      let range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.backgroundColor = "yellow";

      highlights.push(span);

      span.appendChild(range.extractContents());
      console.log(span);

      range.insertNode(span);

      selection.removeAllRanges();
    }
  } catch (error) {
    console.log("Error: ", error);
  }
  return text;
}

function removeHighlights() {
  highlights.forEach(span => {
    const parent = span.parentNode;
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
  });

  highlights = [];
}