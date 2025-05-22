# 🚀 Projeto DimDim App

Este repositório contém um ambiente Docker com dois containers:

-   🟢 **db**: PostgreSQL com volume nomeado para persistência de dados.
-   🔵 **app**: API Node.js com Express e PostgreSQL, rodando como usuário não-root.

---

## 🎯 Requisitos

-   Docker e Docker Compose instalados.
-   Acesso a um terminal (Linux, macOS, Windows WSL).

---

## 📋 Passo a passo com imagens

### ✅ 1. Clonar o repositório

```bash
git clone https://github.com/viniciusdurce/cp3devops.git
cd cp3devops
```

### 🚧 2. Build e subida dos containers

Execute no diretório raiz:

```bash
docker compose up -d --build
```

Você irá receber um output como esse no final:

![Containers subindo](documentacao/passo_1.png)

Isto irá criar e iniciar dois containers:

-   `dimdim-db` (PostgreSQL)
-   `dimdim-app` (API Node.js)

Vamos verificar com:

```bash
docker ps
```

![Containers em execução](documentacao/passo_2.png)

---

### 🧪 3. Testando a API

#### Rotas disponíveis

| Método | Endpoint     | Descrição               |
| ------ | ------------ | ----------------------- |
| GET    | `/`          | Health check            |
| GET    | `/users`     | Lista todos os usuários |
| POST   | `/users`     | Cria um usuário         |
| PUT    | `/users/:id` | Atualiza usuário por ID |
| DELETE | `/users/:id` | Deleta usuário por ID   |

#### 👩‍💻 Health check

```bash
http://localhost:3000/ # Utilize o metodo GET
```

![Health Check](documentacao/api_get.png)

> Retorno esperado: **DimDim App OK**

#### 🚀 CRUD na rota `/users`

-   **Criar** (_POST_): Vamos testar a api de fato. Estaremos criando um usuário com o nome Vinicius:

    ```bash
    http://localhost:3000/users
    {
      "name": "Vinicius"
    }
    ```

    ![Criar usuário](documentacao/api_post.png)

-   **Listar** (_GET_): Agora que criamos podemos listar ele

    ```bash
    curl http://localhost:3000/users
    ```

    ![Listar usuários](documentacao/api_get_users.png)

-   **Atualizar** (_PUT_): Vamos atualizar o nome dele adicionando o sobrenome

    ```bash
    http://localhost:3000/users/1 \
    {
      "name": "Vinicius Durce"
    }
    ```

    ![Atualizar usuário](documentacao/api_put.png)

    > Deve retornar status 200 OK

-   **Deletar** (_DELETE_):

    ```bash
     http://localhost:3000/users/1
    ```

    ![Deletar usuário](documentacao/api_delete.png)

*   Após deletar, liste novamente (_GET_) para confirmar exclusão(adicionei alguns usuários só pra não ficar vazio)

    ![Confirmação exclusão](documentacao/api_get_users_2.png)

    > Podemos ver que o usuário com id 1 (Vinicius Durce) foi excluído com sucesso!

---

### 🔄 4. Validando persistência de dados

##### Primeiro vamos consultar os registros presentes no banco

1. Acesse o psql:

    ```bash
    docker exec -it dimdim-db psql -U dimdim_user -d dimdim
    ```

2. Liste as tabelas:

    ```sql
    \dt
    ```

3. Consulte os registros:

    ```sql
    SELECT * FROM users;
    ```

4. Resultado esperado:

    ![Dados no banco](documentacao/persistencia_banco.png)

##### Agora vamos testar a persistência dos dados de fato

5. Saia do psql:

    ```sql
    \q
    ```

6. Reinicie containers (mantendo volume):

    ```bash
    docker-compose down
    docker-compose up -d
    ```

7. Reentre no psql e confirme que os dados persistem:

    ![Persistência após restart](documentacao/persistencia_banco_3.png)

---

### 🔍 5. Inspeção dos containers

#### 5.1 Container da aplicação (app)

```bash
docker exec -it dimdim-app sh  # já entra como appuser
whoami  # → appuser
pwd     # → /usr/src/app
ls      # lista arquivos da API
```

![Container App](documentacao/container_app.png)

#### 5.2 Container do banco (db)

```bash
docker exec -it dimdim-db sh
whoami  # → root
ls      # → bin  etc  var …
pwd     # → /
```

![Container DB](documentacao/container_banco.png)

> O serviço PostgreSQL roda internamente como `postgres`, garantindo segurança.

---

## 🤝 Grupo

<table>
  <tr>
    <td align="center">
    <p>RM550989<p>
      <a href="https://github.com/nichol6s">
        <img src="https://avatars.githubusercontent.com/u/126689414?v=4" width="115px;" alt="Foto do Igor no GitHub"/><br>
        <sub>
          <strong>Igor Ribeiro</strong>
        </sub>
      </a>
    </td>
    <td align="center">
      <p>RM550427<p>
      <a href="https://github.com/VitorKubica">
        <img src="https://avatars.githubusercontent.com/u/127512951?v=4" width="115px;" alt="Foto do Durce"/><br>
        <sub>
          <strong>Vinicius Durce</strong>
        </sub>
      </a>
    </td>
   <tr>
</table>
