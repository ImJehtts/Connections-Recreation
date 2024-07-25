import { useEffect, useState } from "react"
import Wordscomp from '../components/Words'
import Subcomp from '../components/Submission'
import MisComp from '../components/Mistakes'

//Colours for later when dealing with solving 
const colorMap = ["yellow", "green", "lightblue", "plum"]

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}


const Main = () => {
  const [words, setWords] = useState([])
  const [selectedWords, setSelectedWords] = useState([])
  const [solvedWords, setSolvedWords] = useState([])
  const [mistakes, setMistakes] = useState(0)
  const [correct, setCorrect] = useState(0)

  useEffect(()=>{
    const fetchWordbank = async () =>{
      const response = await fetch(`/api/wb`)
      const json = await response.json()

      if (response.ok){
        const transformedData = []
        Object.entries(json).forEach(([category, wordsArray]) => {
          wordsArray.forEach(word => {
            transformedData.push({ category, word })
          })
        })

        transformedData.forEach((item, index) => {
          for (let i = 15; i > 0; i--) {
            item.colorright = colorMap[Math.floor(index/4)]
          }
      })

        shuffleArray(transformedData)

        setWords(transformedData)

      }
    }

    const fetchGameStats = async () => {
      const response = await fetch(`/api/game`)
      const json = await response.json()

      if (response.ok && json.length > 0) {
        setMistakes(json[0].mistakes)
        setCorrect(json[0].correct)
      }
    }

    fetchWordbank()
    fetchGameStats()
  }, [])

  const handleWordClick = (word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(selectedWord => selectedWord !== word))
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word])
    }
  }

  const handleSubmitClick= async (selectedWords) =>{
    if (selectedWords.length < 4){
      console.log("cant submit. Need 4 words")
    }
    else{
      console.log(selectedWords)
      try{
        const response = await fetch('/api/game/answer', {
          method: 'POST',
          body: JSON.stringify({answerString: selectedWords}),
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        if (response.ok){
          const result = await response.json()
          const message = result.message
          if (message === "answer correct"){
            setSolvedWords(prevSolvedWords => [...prevSolvedWords, ...selectedWords])
            setSelectedWords([])
          }
          else{
            console.log("wrong")
          }
        }
        else{
          console.error('Error:', response.statusText)
        }
      }
      catch (error){
        console.error('Try Error:', error)
      }
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
            color={selectedWords.includes(item.word) ? "gray" : "white"}
            colorright = {item.colorright}
            solved={solvedWords.includes(item.word) ? true : false}
            onClick={() => handleWordClick(item.word)} 
          />
        ))}
        </div>
        <div className="mistakes">
          <MisComp mistake={mistakes} />
        </div>
        <div className="sub">
          <Subcomp onClick={() => handleSubmitClick(selectedWords)} />
        </div>
      </div>
    )
  }
  
  export default Main