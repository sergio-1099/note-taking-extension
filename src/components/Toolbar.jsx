import highlighter from '../assets/highlighter.svg';

function Toolbar() {
  function handleHighlight() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "highlight" }, (response) => {
        console.log(response.status);
      });
    });
  }

  return (
    <div className="tool-container">
      <button className="tool-button" onClick={handleHighlight}>
        <img className="tool-icon" src={highlighter} alt="highlighter" />
      </button>
    </div>
  );
}

export default Toolbar;