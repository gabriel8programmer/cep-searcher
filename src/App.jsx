
import "./App.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import api from "./services/api";

function App() {

  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleClick(){

    if (input === ""){
      alert("Digite algum cep!");
      return;
    }

    //try to do requestion in the extern api
    try {
      
      // const response = await api.get(`${input}/json`);
      const response = await fetch(`https://viacep.com.br/ws/${input}/json/`);
      const data = await response.json();
      setCep(data);

    } catch(error){
      console.log("error!");

    } finally{
      setInput("");
    }

  }

  return (
    <>
      <main className="App">
        <h1>Buscador de Cep</h1>

        <div className="Searcher">
            <input type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleClick}>
                <span>
                    <FaSearch />
                </span>
            </button>
        </div> 
        
        { 
        
          (Object.keys(cep).length == 0) ||

            <div className="Results">
                <h3>{cep.cep}</h3>
                <span>{cep.logradouro}</span>
                <span>Complemento: {cep.complemento}</span>
                <span>Bairro: {cep.bairro}</span>
                <span>{cep.localidade}, {cep.uf}</span>
            </div>
          
        }

      </main>
    </>
  );
}

export default App
