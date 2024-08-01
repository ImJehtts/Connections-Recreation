const Wordscomp = ({word, category, color, colorright, solved, onClick }) => {
  const bgcolor = solved ? colorright : color
  const handleClick = solved ? null : onClick

  return (
      <div className="words-d" onClick={handleClick} style={{ backgroundColor: bgcolor}}>
        <p>{word} -{">"} {solved ? category : '?'}</p>
      </div>
    );
  };
  
  export default Wordscomp;