const Wordscomp = ({ word, color, colorright, solved, onClick }) => {
  const bgcolor = solved ? colorright : color
  return (
      <div className="words-d" onClick={onClick} style={{ backgroundColor: bgcolor} }>
        <p>{word}</p>
      </div>
    );
  };
  
  export default Wordscomp;