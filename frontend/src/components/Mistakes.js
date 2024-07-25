const MisComp = ({ mistake }) => {

    const circles = [];

    for (let i = 0; i < mistake; i++) {
      circles.push(<div key={i} className="circle"></div>);
    }

    return (
      <div className="mistakes-d">
        <p>Mistakes:</p>
        {circles}
      </div>
    );
  };
  
  export default MisComp;