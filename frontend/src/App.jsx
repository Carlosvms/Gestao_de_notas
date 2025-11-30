import React, { useState, useEffect, useCallback } from 'react';
import FormularioAluno from './FormularioAluno';
import TabelaResumo from './TabelaResumo';
import './App.css'; 

const App = () => {
  const [resumo, setResumo] = useState({
    alunos_resumo: [],
    medias_disciplinas: [],
    atencao_media: [],
    atencao_frequencia: [],
  });
  const [loading, setLoading] = useState(true);

  // Função para buscar o resumo do Backend
  const fetchResumo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/resumo');
      if (response.ok) {
        const data = await response.json();
        setResumo(data);
      } else {
        console.error('Erro ao buscar resumo:', response.statusText);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Recarrega os dados ao iniciar o componente
  useEffect(() => {
    fetchResumo();
  }, [fetchResumo]);

  return (
    <div className="App">
      <h1>Gestão de notas(Prof. Carlos)</h1> 
      <div className="content-wrapper">
        
        <FormularioAluno onAlunoAdicionado={fetchResumo} />

        <hr />
        
        {loading ? (
          <p>Carregando resumo...</p>
        ) : (
          <TabelaResumo resumo={resumo} />
        )}
      </div>
    </div>
  );
};

export default App;