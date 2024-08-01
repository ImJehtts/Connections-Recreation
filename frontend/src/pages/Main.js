import { useEffect, useState, } from "react"
import {useWbContext} from '../hooks/useWordbankContext'
import Wordscomp from '../components/Words'
import Subcomp from '../components/Submission'
import MisComp from '../components/Mistakes'


const colorMap = ["yellow", "green", "lightblue", "plum"]

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}


const Main = () => {
  const {words, dispatch} = useWbContext()
  const [selectedWords, setSelectedWords] = useState([])
  const [mistakes, setMistakes] = useState(0)
  const [correct, setCorrect] = useState(0)
  
    const fetchWordbank = async () =>{
      const response = await fetch(`/api/wb`)
      const json = await response.json()

      if (response.ok){
        const transformedData = []
        Object.entries(json).forEach(([category, {words, solved}]) => {
          words.forEach(word => {
            transformedData.push({category, word, solved})
          })
        })

        const solved_words = transformedData.filter(item => item.solved)
        const unsolved_words = transformedData.filter(item => !item.solved)

        transformedData.forEach((item, index) => {
          for (let i = 15; i > 0; i--) {
            item.colorright = colorMap[Math.floor(index/4)]
          }
      })

        shuffleArray(unsolved_words)
        dispatch({ type: 'SET_WORDS', payload: solved_words.concat(unsolved_words) })

      }
    }

    useEffect(() => {
      fetchWordbank()
  
      const fetchGameStats = async () => {
        const response = await fetch(`/api/game`)
        const json = await response.json()
  
        if (response.ok && json.length > 0) {
          setMistakes(json[0].mistakes)
          setCorrect(json[0].correct)
        }
      }
  
      fetchGameStats()
    }, [dispatch])

  const newGame = async () =>{
    try {
      const [gameResponse, wbResponse] = await Promise.all([
        fetch('/api/game', { method: 'DELETE' }),
        fetch('/api/wb', { method: 'DELETE' })
      ])
  
      if (!gameResponse.ok || !wbResponse.ok) {
        console.error('Error during DELETE requests:', 
          `Game response: ${gameResponse.statusText}, ` +
          `Word bank response: ${wbResponse.statusText}`
        )
        return
      }
  
      const [createwbResponse, creategameResponse] = await Promise.all([
        fetch('/api/wb', { method: 'POST' }),
        fetch('/api/game', { method: 'POST' })
      ])
  
      if (!createwbResponse.ok || !creategameResponse.ok) {
        console.error('Error during POST requests:', 
          `Word bank response: ${createwbResponse.statusText}, ` +
          `Game response: ${creategameResponse.statusText}`
        )
        return
      }
  
      console.log('Both POST requests succeeded')
      fetchWordbank()
      await fetchGameStats()
    } catch (error) {
      console.error('Error during requests:', error)
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
          if (message !== "answer correct"){
            //telling user they are wrong 
          }
          setSelectedWords([])
          fetchWordbank()
          await fetchGameStats()
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
        {(words || []).map((item, index) => (
          <Wordscomp 
            key={index} 
            word={item.word}
            category = {item.category} 
            color={selectedWords.includes(item.word) ? "gray" : "white"}
            colorright = {item.colorright}
            solved={mistakes === 0 ? true : item.solved}
            onClick={() => handleWordClick(item.word)} 
          />
        ))}
        </div>
        <div className="mistakes">
          <MisComp mistake={mistakes} />
        </div>
        <div className="sub">
          <Subcomp 
          onClickSub={() => handleSubmitClick(selectedWords)} 
          onClickNewGame={() => newGame()}
          gamedone_now = {correct === 4 || mistakes === 0}
          />
        </div>
      </div>
    )
  }
  
  export default Main