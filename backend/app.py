from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

alunos_data = []

# 1. Rota POST: Adicionar ou Atualizar Alunos
@app.route('/alunos', methods=['POST'])
def adicionar_aluno():
    data = request.get_json()
    
    # Extrai e converte os dados
    nome = data['nome']
    notas = [float(n) for n in data['notas']]
    frequencia = float(data['frequencia'])

    novo_aluno = {
        'nome': nome,
        'notas': notas,
        'frequencia': frequencia
    }

    # Busca e atualiza/adiciona
    aluno_existente = next((a for a in alunos_data if a['nome'] == nome), None)
    
    if aluno_existente:
        aluno_existente.update(novo_aluno)
    else:
        alunos_data.append(novo_aluno)

    return jsonify({"mensagem": "Dados processados com sucesso."}), 201


# 2. Rota GET: Calcular e Retornar o Resumo
@app.route('/resumo', methods=['GET'])
def calcular_resumo():
    num_alunos = len(alunos_data)
    
    if num_alunos == 0:
        return jsonify({"alunos_resumo": [], "medias_disciplinas": [], "atencao_media": [], "atencao_frequencia": []})

    somas_disciplinas = [0] * 5
    soma_medias_alunos = 0.0
    alunos_resumo = []

    for aluno in alunos_data:
        media_aluno = sum(aluno['notas']) / 5
        soma_medias_alunos += media_aluno

        for i in range(5):
            somas_disciplinas[i] += aluno['notas'][i]

        alunos_resumo.append({
            'nome': aluno['nome'],
            'media': round(media_aluno, 2),
            'frequencia': aluno['frequencia']
        })

    
    medias_disciplinas = [round(soma / num_alunos, 2) for soma in somas_disciplinas]
    
    media_geral_turma = soma_medias_alunos / num_alunos
    
    atencao_media = []
    atencao_frequencia = []

    for aluno in alunos_resumo:
        # Atenção por Média (ACIMA da média geral da turma)
        if aluno['media'] > media_geral_turma:
            atencao_media.append(aluno['nome'])

        # Atenção por Frequência (ABAIXO de 75%)
        if aluno['frequencia'] < 75:
            atencao_frequencia.append(aluno['nome'])

    return jsonify({
        "alunos_resumo": alunos_resumo, 
        "medias_disciplinas": medias_disciplinas,
        "atencao_media": atencao_media, 
        "atencao_frequencia": atencao_frequencia 
    })

# 3. Execução do Servidor
if __name__ == '__main__':
    app.run(debug=True, port=5000)