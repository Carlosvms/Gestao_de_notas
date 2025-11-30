## Meu Projeto de Notas (Estágio Dev)

Olá! Aqui está o código do projeto que desenvolvi para o processo seletivo. É um sistema simples para ajudar o Professor Carlos a gerenciar as notas e a frequência dos alunos.

Usei **React** para o Front-end e **Python(Flask)** para os cálculos(Back-end).

---

### Como Rodar o Sistema

Você precisa ter **Python** e **Node.js** instalados na sua máquina.

#### 1. Iniciar o Back-end (Python)

1.  Vá para a pasta `backend`.
    ```bash
    cd backend
    ```

2.  Instale o Flask:
    ```bash
    pip install Flask flask-cors
    ```

3.  Rode o servidor:
    ```bash
    python app.py
    ```
    O servidor estará rodando na porta **`5000`**.

#### 2. Iniciar o Front-end (React)

1.  Abra outro terminal e vá para a pasta `frontend`.
    ```bash
    cd frontend
    ```

2.  Instale as dependências:
    ```bash
    npm install
    # ou yarn install
    ```

3.  Rode o aplicativo:
    ```bash
    npm run dev
    # ou yarn dev
    ```
    O sistema abrirá no seu navegador.

---

### Premissas e Decisões Simples

Tomei algumas decisões para manter o projeto o mais simples possível:

| Ponto | Decisão/Premissa | O que significa |
| :--- | :--- | :--- |
| **Persistência** | Dados guardados **só na memória**. | Se você fechar o `app.py`, os dados de alunos somem. |
| **Tecnologias** | Usei **Flask** e **React** sem bibliotecas extras. | Foco total no código central do teste. |
| **Lógica** | O Python (`app.py`) faz **todos os cálculos**. | O Front-end só manda os dados e mostra o resultado. |
| **Alunos** | O **nome** é a chave única. | Se você inserir um nome já existente, os dados antigos serão atualizados. |

---

### Funcionalidades Chave

O sistema faz o que foi pedido no desafio:

1.  Permite inserir o nome, 5 notas (0-10) e a frequência (0-100%).
2.  Calcula a média de notas e a frequência geral de cada aluno.
3.  Calcula a média da turma em cada uma das 5 disciplinas.
4.  Identifica alunos que precisam de atenção:
    * Média de notas **acima** da média da turma.
    * Frequência **abaixo de 75%**.

---