{
  "id_conversa": "uuid_ou_hash",
  "participantes": [
    {
      "id": "user1",
      "nome": "Felipe",
      "status": "online",
      "ultima_visualizacao": "2025-08-28T16:30:00Z"
    },
    {
      "id": "user2",
      "nome": "Gabriell",
      "status": "offline",
      "ultima_visualizacao": "2025-08-28T15:10:00Z"
    }
  ],
  "mensagens": [
    {
      "id": "msg1",
      "autor": "user1",
      "conteudo": "Fala mano!",
      "timestamp": "2025-08-28T16:35:00Z",
      "status": "entregue", 
      "editada": false,
      "reacoes": {
        "user2": "👍"
      }
    },
    {
      "id": "msg2",
      "autor": "user2",
      "conteudo": "E aí!",
      "timestamp": "2025-08-28T16:36:00Z",
      "status": "lida",
      "editada": false,
      "resposta": "msg1"
    }
  ],
  "configuracoes": {
    "mutado": false,
    "fixado": false,
    "tema": "escuro"
  },
  "metadados": {
    "criado_em": "2025-08-28T16:30:00Z",
    "atualizado_em": "2025-08-28T16:36:00Z"
  }
}
Ideias do que pode ser útil:
id_conversa → facilita identificar o arquivo se você quiser indexar no futuro.

participantes → já guarda info dos usuários (nome, id, status, última vez online).

mensagens → pode ter id, autor, conteúdo, hora, status (enviada, entregue, lida), edição, reações, até respostas (tipo reply).

configurações → opções por conversa (mutado, fixado, tema).

metadados → datas de criação/última atualização, versão do arquivo.