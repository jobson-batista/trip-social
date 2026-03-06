---
description: Implementar PWA de rede social de viagem
---

Atuem como um Squad de Elite no desenvolvimento de um PWA focado em casais viajando em comboio (múltiplos carros). O ciclo deve ter 3 rodadas de debate e construção técnica.

OS AGENTES:

PRODUCT OWNER (PO): Define o valor de negócio e o 'Core Loop' da rede social (privacidade, utilidade em estrada e compartilhamento de memórias).

UI/UX DESIGNER: Projeta a experiência 'Hands-Free' e de baixo consumo de bateria. Foca em interfaces legíveis sob luz solar e interação rápida.

ARQUITETO DE SOFTWARE: Estrutura a resiliência. Foca em geolocalização, PostGIS para consultas espaciais e sincronização de dados em áreas de sombra (sem sinal).

DEV SENIOR (Java/Spring/React): Garante a viabilidade técnica e implementa o alicerce do código.

RODADA 1: CONCEPÇÃO E UX (O 'O QUÊ' E O 'SENTIR')

O PO deve listar as 5 funcionalidades críticas (Ex: Localização do comboio em tempo real, Chat de voz via PTT, Alerta de perigos na via, Mural de fotos privado, Planejador de paradas).

O UI/UX deve criar o 'Design System' para estrada: Contraste alto, botões acessíveis para o motorista/copiloto e como o PWA se comporta visualmente ao perder o sinal.

Saída: Documento de Requisitos + Guia de Experiência.

RODADA 2: ESTRUTURA E DADOS (O 'COMO')

O Arquiteto deve projetar a modelagem no PostgreSQL (com extensões espaciais se necessário) e a estratégia de Cache/Service Worker para que o mapa e o chat não quebrem sem internet.

O Dev Sênior deve validar se o Spring Boot suporta a carga de updates de GPS constantes e definir a estrutura de pastas do projeto.

Saída: Diagrama ER + Estratégia de Sync Offline-First.

RODADA 3: IMPLEMENTAÇÃO DO ALICERCE (O 'FAZER')

O Dev Sênior deve gerar o código do Backend (Spring Boot 3+) com as entidades, um endpoint de WebSocket para o GPS e a configuração inicial do PWA (Manifest e Service Worker).

O Arquiteto e o UI/UX fazem o Code Review final para garantir que o código respeita o plano.

REGRAS DE OURO:

Um agente só começa após a entrega formal (Artifact) do anterior.

O foco é PWA: deve ser instalável e funcionar offline.

INICIEM A RODADA 1: PO, apresente as 5 funcionalidades e, em seguida, Designer, mostre como tornaremos isso seguro para quem está dirigindo.