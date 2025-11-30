import React, { useState } from 'react';

const FormularioAluno = ({ onAlunoAdicionado }) => {
  const [nome, setNome] = useState('');
  const [notas, setNotas] = useState(['', '', '', '', '']);
  const [frequencia, setFrequencia] = useState('');

  // Função para mudança nas notas
  const handleNotaChange = (index, value) => {
    const newNotas = [...notas];
    newNotas[index] = value;
    setNotas(newNotas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cria o objeto de dados para envio
    const dadosAluno = {
      nome,
      notas: notas.map(n => parseFloat(n) || 0),
      frequencia: parseFloat(frequencia) || 0,
    };

    try {
      const response = await fetch('http://localhost:5000/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAluno),
      });

      if (response.ok) {
        alert('Dados do aluno salvos/atualizados com sucesso!');
        // Chama a função passada pelo pai para recarregar o dashboard
        onAlunoAdicionado(); 
      } else {
        const errorData = await response.json();
        alert(`Erro ao salvar dados: ${errorData.erro || response.statusText}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Não foi possível conectar ao servidor Python.');
    }
  };

  return (
    <div className="form-container">
      <h3>Adicionar/Atualizar Aluno</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Aluno:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>

        <div className="notas-input">
          <label>Notas (0-10):</label>
          {notas.map((nota, index) => (
            <input
              key={index}
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={nota}
              onChange={(e) => handleNotaChange(index, e.target.value)}
              placeholder={`Disciplina ${index + 1}`}
              required
            />
          ))}
        </div>

        <div>
          <label>Frequência (0-100%):</label>
          <input 
            type="number" 
            min="0"
            max="100"
            value={frequencia} 
            onChange={(e) => setFrequencia(e.target.value)} 
            required 
          />
        </div>

        <button type="submit">Salvar Dados</button>
      </form>
    </div>
  );
};

export default FormularioAluno;