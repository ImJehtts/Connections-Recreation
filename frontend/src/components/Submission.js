const Subcomp = ({onClickSub, onClickNewGame, gamedone_now}) => {

  //This makes sure only one of the two buttons between submit or new game are pressable
  const handleClicknewGame = gamedone_now ? onClickNewGame : null
  const handleClickSub = gamedone_now ? null : onClickSub
  
    return (
      <div>
      <div className="submission-d" onClick={handleClickSub}  style={{
          cursor: gamedone_now ? 'not-allowed' : 'pointer'}}>
        <p>Submit</p>
      </div>
      <div className="newgame-d" onClick={handleClicknewGame} style={{
          cursor: gamedone_now ? 'pointer' : 'not-allowed'}}>
        <p>Newgame</p>
      </div>
      </div>
    )
  }
  
  export default Subcomp;