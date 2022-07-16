import { useState } from 'react';
import {FiSearch} from 'react-icons/fi'

import api from './services/api';

import './styles.css'

function App() {
  const [input, setInput] = useState('')
  const [info, setInfo] = useState({})

  async function handlingSearch(){
    
    if(input === ''){
      alert('Preencha com algum CEP!')
      return
    }

    try {
      const response = await api.get(`${input}/json`);
      setInfo(response.data)
      setInput("")
      
      
    } catch (error) {
      alert("Erro ao buscar o CEP...");
      setInput('');
    }


  }

  return (
    <div className="container">
      <h1 className="title">Busque o CEP</h1>

      <div className="inputContent">
        <input 
        type="text"
        placeholder="Coloque o CEP..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />

        <button className="searchBtn" onClick={handlingSearch}>
          <FiSearch size={25} color="#000"/>
        </button>
      </div>


      {Object.keys(info).length > 1 &&(
      <main className='main'>
        <h2>CEP: {info.cep}</h2>

        <span>Rua: {info.logradouro}</span>
        <span>Bairro: {info.bairro}</span>
        <span>{info.localidade} - {info.uf}</span>

      </main>

      )}
    </div>
  );
}

export default App;
