import highlighter from '../assets/highlighter.svg';
import trash from '../assets/trash-delete-bin.svg';

function Toolbar(props) {
  return (
    <div className="tool-container">
      <button className="tool-button" onClick={props.highlightFunction}>
        <img className="tool-icon" src={highlighter} alt="highlighter" />
      </button>
      <button className="tool-button" onClick={props.removeHighlightsFunction}>
        <img className="tool-icon" src={trash} alt="clear all highlights" />
      </button>
    </div>
  );
}

export default Toolbar;