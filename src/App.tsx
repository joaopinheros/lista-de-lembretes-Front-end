import React, { useState } from 'react';
import './App.css';
import { Form } from './components/form/form';
import { LembreteData } from './interface/LembreteData';
import ReminderList from './components/list/list'; 

function App() {

  // Estado para armazenar os dados dos lembretes
  const [data, setData] = useState<LembreteData[]>([]);
  // Estado para controlar a visibilidade do botão de adicionar lembrete
  const [mostrarBotao, setMostrarBotao] = useState(true); 
  // Estado para controlar a visibilidade dos títulos
  const [mostrarTitulos, setMostrarTitulos] = useState(false); 

  // Função para adicionar um novo lembrete aos dados
  const adicionarLembrete = (novoLembrete: LembreteData) => {
    setData([...data, novoLembrete]);
    // Oculta o botão após adicionar o primeiro lembrete
    setMostrarBotao(false); 
    // Mostra os títulos após adicionar o primeiro lembrete
    setMostrarTitulos(true); 
  };

  return (
    <div className="container">
      {mostrarTitulos && <h1>Novo Lembrete</h1>}
      {mostrarBotao && (
        <div className="container-botao">
          <p className="frase-inicial">Clique aqui para adicionar um lembrete
            <br className="efeito-frase-inicial"/>ou para visualizar a lista de lembretes
          </p>
          <button className="adicionar-lembrete" onClick={() => adicionarLembrete({
            name: '',
            date: '',
            description: ''
          })}>Adicionar Lembrete</button>
        </div>
      )}

      <div className="form-grid">
        {/* Renderizar o formulário apenas se houver dados */}
        {data.length > 0 && data.map((lembreteData, index) => (
          <Form
            key={index}
            name={lembreteData.name}
            date={lembreteData.date}
            description={lembreteData.description}
          />
        ))}
        
      </div>
      {mostrarTitulos && (
      <div className="list-container">
        <div className="list-grid">
          <h2 className="lembretes-adicionados">Lembretes Adicionados</h2>
          <ReminderList data={data} />
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
