
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [veiculos, setVeiculos] = useState([]);
  const [novoVeiculo, setNovoVeiculo] = useState({
    placa: '',
    montadora: '',
    modelo: '',
    ano: '',
  });
  useEffect(() => {
    fetchVeiculos();
  }, []);
  const fetchVeiculos = async () => {
    try {
      const response = await axios.get('http://localhost:8090/veiculos');
      setVeiculos(response.data);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoVeiculo((prevVeiculo) => ({
      ...prevVeiculo,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/veiculos', novoVeiculo);
      fetchVeiculos();
      setNovoVeiculo({
        placa: '',
        montadora: '',
        modelo: '',
        ano: '',
      });
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/veiculos/${id}`);
      fetchVeiculos();
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
    }
  };
  const handleUpdate = async (id, veiculoAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/veiculos/${id}`, veiculoAtualizado);
      fetchVeiculos();
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
    }
  };






  return (
    <div>

      <h1>Gerenciamento de Veículos.</h1>


      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="placa"
          placeholder="Placa"
          value={novoVeiculo.placa}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="montadora"
          placeholder="Montadora"
          value={novoVeiculo.montadora}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={novoVeiculo.modelo}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name="ano"
          placeholder="Ano"
          value={novoVeiculo.ano}
          onChange={handleInputChange}
        />

        <button type="submit">Adicionar Veículo</button>
      </form>


      <ul>

        {veiculos.map((veiculo) => (
          <li key={veiculo.id}>

            {veiculo.placa} - {veiculo.montadora} {veiculo.modelo} ({veiculo.ano})


            <button onClick={() => handleDelete(veiculo.id)}>Excluir</button>


            <button
              onClick={() =>
                handleUpdate(veiculo.id, {
                  ...veiculo,
                  modelo: 'Novo Modelo Atualizado',
                })
              }
            >
              Atualizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App
