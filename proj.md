📌 Planejamento – WhatsApp2
🔹 Escopo

O que o projeto vai ter:

    Aplicação desktop (via Electron)

    Frontend em React para interface

    Comunicação MQTT (enviar e receber mensagens dentro da rede)

    Histórico de mensagens em JSON local (simples armazenamento)

    Possibilidade de empacotar em .AppImage ou .exe para rodar direto

O que não vai ter (fora do escopo, para não complicar agora):

    Criptografia ponta a ponta avançada

    Servidor externo (a ideia inicial é rodar na rede local)

    App mobile

🔹 Ferramentas

    Linguagem: JavaScript

    Frameworks/Bibliotecas: React + Electron

    Comunicação: MQTT.js (client)

    Broker: Aedes (Node.js) rodando localmente

    Armazenamento local: JSON (simples)

    Controle de versão: GitHub (opcional, mas recomendado)

    Gestão: Trello/Notion ou até checklist no papel

🔹 Etapas do Projeto
1. Planejamento inicial

    Definir pastas do projeto (frontend, backend/broker). -OK

    Configurar Git (se quiser versionar). -OK

2. Configuração do ambiente

    Criar projeto React. -OK

    Integrar com Electron (abrir React dentro de janela desktop).

    Configurar broker MQTT (Node com Aedes). -OK

3. Funcionalidade básica

    Criar cliente MQTT no React. -OK

    Conectar ao broker e enviar mensagem simples. -OK

    Receber mensagem e mostrar na tela. -OK

4. Interface inicial

    Layout com lista de mensagens.

    Input para enviar mensagens.

    Exibição em tempo real (tipo chat básico).

5. Histórico

    Salvar mensagens em arquivo JSON local.

    Carregar mensagens do JSON quando abrir o app.

6. Empacotamento

    Gerar versão desktop com Electron Builder (.AppImage ou .exe).

7. Testes finais

    Testar envio/recebimento em 2 PCs na mesma rede.

    Ajustar bugs básicos.

🔹 Cronograma (só você, estimado)

    Semana 1: Configurar ambiente (React + Electron + Broker).

    Semana 2: Criar envio/recebimento de mensagens via MQTT.

    Semana 3: Criar interface simples + histórico em JSON.

    Semana 4: Empacotamento + testes em rede local.