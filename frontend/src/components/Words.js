const Wordscomp = ({ word, category, color, onClick }) => {
    return (
      <div className="words-d" onClick={onClick} style={{ backgroundColor: color }}>
        <p>{word}</p>
      </div>
    );
  };
  
  export default Wordscomp;