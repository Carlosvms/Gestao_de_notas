import React from 'react';

const TabelaResumo = ({ resumo }) => {
  const { alunos_resumo, medias_disciplinas, atencao_media, atencao_frequencia } = resumo;

  return (
    <div className="resumo-container">
      <h2>Relatório de Notas e Frequência</h2>
      
      {alunos_resumo.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Média de notas</th>
                <th>Frequência(%)</th>
              </tr>
            </thead>
            <tbody>
              {alunos_resumo.map((aluno) => (
                <tr key={aluno.nome}>
                  <td>{aluno.nome}</td>
                  <td>{aluno.media}</td>
                  <td>{aluno.frequencia}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="medias-disciplinas">
            <h4>Média da turma por disciplina:</h4>
            <p>
              {medias_disciplinas.map((media, index) => (
                <span key={index}>
                  <strong>Disciplina {index + 1}:</strong> {media}
                  {index !== medias_disciplinas.length - 1 ? ' | ' : ''}
                </span>
              ))}
            </p>
          </div>
          <div className="listas-atencao">
            <h4>Alunos com média de notas acima da média da turma:</h4> 
            {atencao_media.length > 0 ? (
              <ul>
                {atencao_media.map(nome => <li key={nome}>{nome}</li>)}
              </ul>
            ) : (
              <p>Nenhum aluno com média acima da média da turma</p>
            )}
            <h4>Alunos com frequência abaixo de 75%:</h4> 
            {atencao_frequencia.length > 0 ? (
              <ul>
                {atencao_frequencia.map(nome => <li key={nome}>{nome}</li>)}
              </ul>
            ) : (
              <p>Nenhum aluno com frequência abaixo de 75%</p>
            )}
          </div>
        </>
      ) : (
        <p>Aguardando dados de alunos</p>
      )}
    </div>
  );
};

export default TabelaResumo;