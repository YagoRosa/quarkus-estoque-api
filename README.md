# CQP System - Control of Quantity and Production

O **CQP System** é uma solução robusta e moderna desenvolvida para o gerenciamento de estoques de matérias-primas e planejamento de linhas de produção em Pequenas e Médias Empresas (PMEs). 

> [!NOTE]
> Este projeto foi desenvolvido como um **teste prático** para demonstrar proficiência em desenvolvimento Full-Stack, arquitetura de sistemas modernos e entrega de interfaces de alta qualidade (UI/UX).

---

## 🚀 Tecnologias Utilizadas

### **Backend**
- **Java 21 / Quarkus 3.3x**: Framework de alto desempenho para aplicações Java nativas em nuvem.
- **Hibernate ORM com Panache**: Para persistência de dados de forma simplificada e eficiente.
- **REST / Jackson**: Para criação de APIs JSON rápidas e seguras.
- **MySQL 8**: Banco de dados relacional robusto.

### **Frontend**
- **React 19**: Biblioteca moderna para construção de interfaces de usuário reativas.
- **Vite**: Build tool extremamente rápida para desenvolvimento web.
- **Axios**: Cliente HTTP para integração com a API.
- **Vanilla CSS**: Estilização premium com foco em performance, utilizando variáveis CSS e efeitos modernos.

---

## ✨ Funcionalidades Principais

- **Dashboard Inteligente**: Visualização em tempo real de itens fora de estoque, alertas de baixo estoque e oportunidades de produção baseadas no lucro potencial.
- **Gestão de Inventário (Materiais)**: CRUD completo de matérias-primas com acompanhamento de quantidade em estoque.
- **Motor de Receitas**: Vinculação granular entre produtos e materiais. Define exatamente quanto de cada material é necessário para produzir uma unidade de produto.
- **Cálculo de Capacidade (RF008)**: O sistema calcula automaticamente quantos produtos podem ser fabricados com base no estoque atual de matérias-primas.
- **Interface Premium**: 
  - Layout em **Bento Grid** na página "About".
  - **Glassmorphism** e notificações **Toast** customizadas para uma experiência sem interrupções (substituindo alerts nativos).
  - **ConfirmModals** personalizados para ações críticas.

---

## 🛠️ Como Executar o Projeto

### **Pré-requisitos**
- Java 21 ou superior.
- Maven 3.8+.
- Node.js 18+.
- MySQL 8 instalado e rodando.

### **1. Configuração do Banco de Dados**
Certifique-se de que o MySQL está rodando e crie o schema:
```sql
CREATE DATABASE MeuBancoTeste;
```
As credenciais padrão estão em `src/main/resources/application.properties`:
- **DB**: MeuBancoTeste
- **User**: dev_user
- **Password**: dev123

### **2. Executando o Backend**
Na raiz do projeto, execute:
```bash
./mvnw quarkus:dev
```
A API estará disponível em `http://localhost:8080`.

### **3. Executando o Frontend**
Navegue até a pasta frontend:
```bash
cd frontend
npm install
npm run dev
```
O sistema estará disponível em `http://localhost:5173`.

---

## 👨‍💻 Desenvolvedor

**Yago Rosa**
*Focado em criar soluções que unem lógica de backend sólida com experiências de frontend surpreendentes.*

---
*CQP System v1.0.0 - Control of Quantity and Production*
