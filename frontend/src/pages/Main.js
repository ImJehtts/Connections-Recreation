import { useEffect, useState } from "react"
require('dotenv').config()

const Main = () => {

  useEffect(()=>{
    const [wordbanks, setWordbank] = useState(null)
    const fetchWordbank = async () =>{
      const response = await fetch(`${process.env.REACT_URL}/api/wb`)
      const json = await response.json()

      if (response.ok){
        setWordbank(json)
      }
    }
    fetchWordbank()
  }, [])
  return (
      <div className="main">
        <div className="wordbank">
          {wordbanks && wordbanks.map((wordbank) => (
            <p key = {wordbank._id}>{wordbank.category}</p>
          ))}
        </div>
      </div>
    )
  }
  
  export default Main