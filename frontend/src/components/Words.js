const Wordscomp = ({word, category, color, colorright, solved, onClick }) => {
  
  //Sets background of word card. Either white or gray if not solved, or category color if solved
  const bgcolor = solved ? colorright : color

  //If solved, word can not be clicked
  const handleClick = solved ? null : onClick

  return (
      <div className="words-d" onClick={handleClick} style={{ backgroundColor: bgcolor}}>
        <p>{word} -{">"} {solved ? category : '?'}</p>
      </div>
    );
  };
  
  export default Wordscomp;