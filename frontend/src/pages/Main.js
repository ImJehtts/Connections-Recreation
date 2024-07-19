import { useEffect, useState } from "react"
import Wordscomp from '../components/Words'
import Subcomp from '../components/Submission'

//Colours for later when dealing with solving 
const colorMap = ["yellow", "green", "blue", "purple"]

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}


const Main = () => {
  const [words, setWords] = useState([])
  const [selectedWords, setSelectedWords] = useState([])

  useEffect(()=>{
    const fetchWordbank = async () =>{
      const response = await fetch(`/api/wb`)
      const json = await response.json()

      if (response.ok){
        const transformedData = [];
        Object.entries(json).forEach(([category, wordsArray]) => {
          wordsArray.forEach(word => {
            transformedData.push({ category, word });
          });
        });

        transformedData.forEach((item, index) => {
          item.color = colorMap[index % colorMap.length]; 
      });

        shuffleArray(transformedData);

        setWords(transformedData);

      }
    }

    fetchWordbank()
  }, [])

  const handleWordClick = (word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(selectedWord => selectedWord !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  }

  const handleSubmitClick= () =>{
    if (selectedWords.length < 4){
      console.log("cant submit. Need 4 words")
    }
    else{
      console.log(selectedWords)
    }
  }
  
  return (
      <div className="main">
        <div className="instructions">
          <h2>Create groups of four!</h2>
        </div>
        <div className="words">
        {words.map((item, index) => (
          <Wordscomp 
            key={index} 
            word={item.word} 
            category={item.category} 
            color={selectedWords.includes(item.word) ? "gray" : "white"}
            onClick={() => handleWordClick(item.word)} 
          />
        ))}
        </div>
        <div className="sub">
          <Subcomp onClick={() => handleSubmitClick()} />
        </div>
      </div>
    )
  }
  
  export default Main

