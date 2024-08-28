console.log("Content Script is running.");

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "highlight") {
    try {
      selectedText = highlightText();
      sendResponse({ status: "success", selectedText: selectedText });
    } catch (error) {
      console.log("Error in content script: ", error);
    }
  } else {
    sendResponse({ status: "unknown action" });
  }
  return true;
});


function highlightText() {
  let selection = window.getSelection();
  console.log(selection.toString());

  try {
    if (!selection.isCollapsed) {
      let range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.backgroundColor = "yellow";
      console.log(span);

      span.appendChild(range.extractContents());
      console.log(span);

      range.insertNode(span);

      selection.removeAllRanges();
      return selection.toString();
    }
  } catch (error) {
    console.log("Error: ", error);
  }
  
  return null;
}