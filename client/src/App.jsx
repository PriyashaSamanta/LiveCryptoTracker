import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [crypto, setCrypto] = useState('bitcoin');
  const[Price,setPrice]=useState(null);
  useEffect(()=>{
    const fetchPrice=async()=>{
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`
        );
        setPrice(res.data[crypto].usd);
      } catch (error) {
        console.error("Error fetching price:", error);
      }
      
    }
    fetchPrice();
    const intervalId= setInterval(() => {
      fetchPrice()

      
    }, 30000);

    return(clearInterval(intervalId));

    }

  ,[crypto])
  return (
    <>
     <h1>" Live Cryptocurrency Price "</h1>
     <select className="dropdown" value={crypto}
     onChange={(e)=>setCrypto(e.target.value)}
     >
      <option value="bitcoin">Bitcoin</option>
      <option value="ethereum">Ethereum</option>
      <option value="dogecoin">Dogecoin</option>
     </select>

     <h2>
      { Price!==null ?`Currenct price is $${Price}`:`fetching the price .....` }
     </h2>
   
        
    </>
  )
}

export default App
