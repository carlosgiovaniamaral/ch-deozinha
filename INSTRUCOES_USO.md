# Sistema de Chá de Cozinha - Instruções de Uso

## Visão Geral

Sistema web para gerenciar reserva de presentes para um chá de cozinha. Os convidados podem visualizar a lista de 28 presentes disponíveis, filtrar por categoria e reservar itens clicando no botão "Reservar Presente".

## Funcionalidades

- **Lista de Presentes**: 28 itens organizados em categorias (Cozinha, Têxteis, Decoração, Mesa)
- **Filtro por Categoria**: Visualize presentes por tipo
- **Status em Tempo Real**: Veja quantos presentes estão disponíveis e reservados
- **Reserva Simples**: Preencha nome, email e telefone para reservar
- **Imagens dos Itens**: Cada presente tem uma imagem descritiva

## Como Usar Localmente

### 1. Instalação Inicial

\`\`\`bash
# Clone o repositório ou baixe os arquivos
# Instale as dependências
npm install

# Configure o banco de dados (veja seção Produção)
# ou use dados mock (padrão)

# Inicie o servidor
npm run dev
\`\`\`

Acesse: `http://localhost:3000`

### 2. Reservar um Presente

1. Navegue até o presente que deseja reservar
2. Clique no botão **"Reservar Presente"**
3. Preencha seus dados:
   - Nome completo (obrigatório)
   - Email (obrigatório)
   - Telefone (opcional)
4. Clique em **"Confirmar Reserva"**
5. O presente será marcado como não disponível

### 3. Filtrar por Categoria

Use os botões de filtro no topo para visualizar:
- **Todos**: Todos os 28 presentes
- **Cozinha**: Panelas, facas, utensílios, etc.
- **Mesa**: Copos, pratos, talheres, louças
- **Têxteis**: Toalhas e panos
- **Decoração**: Cortinas, ventiladores

## Produção com Neon

### 1. Configurar Banco de Dados Neon

1. Acesse [neon.tech](https://neon.tech) e crie uma conta
2. Crie um novo projeto PostgreSQL
3. Copie a string de conexão (`NEON_DATABASE_URL`)

### 2. Adicionar Variáveis de Ambiente

No v0:
- Abra a seção **Vars** no sidebar
- Adicione a variável `DATABASE_URL` com sua string do Neon

Ou localmente no `.env.local`:
\`\`\`
DATABASE_URL='postgresql://user:password@host/database?sslmode=require'
\`\`\`

### 3. Executar Migrações

\`\`\`bash
# Gerar cliente Prisma
npm run prisma:generate

# Executar migrações
npm run prisma:migrate

# Popular banco de dados com os 28 presentes
npm run prisma:seed
\`\`\`

### 4. Deploy

#### No Vercel:
\`\`\`bash
npm run build
vercel deploy
\`\`\`

#### Manualmente:
- Instale as dependências
- Configure `DATABASE_URL`
- Execute as migrações
- Inicie com `npm run start`

## Estrutura do Banco de Dados

### Tabelas

**Gift**
- `id`: ID único
- `name`: Nome do presente
- `description`: Descrição
- `category`: Categoria (Cozinha, Mesa, Têxteis, Decoração)
- `available`: Status de disponibilidade
- `imageUrl`: URL da imagem
- `createdAt`: Data de criação

**User**
- `id`: ID único
- `name`: Nome do convidado
- `email`: Email (único)
- `phone`: Telefone (opcional)
- `createdAt`: Data de criação

**Reserva**
- `id`: ID único
- `userId`: Referência do usuário
- `giftId`: Referência do presente
- `createdAt`: Data da reserva
- `updatedAt`: Última atualização

## Lista de 28 Presentes

### Cozinha (17 itens)
1. Jogo de Panelas
2. Jogo de Facas
3. Tábua de Corte
4. Espremedor de Limão
5. Jarra de Vidro
6. Peneira de Açúcar
7. Ralador Cilíndrico
8. Escorredor de Macarrão
9. Tigela de Vidro
10. Assadeira Antiaderente
11. Forma de Bolo
12. Formas de Pizza
13. Cortador de Pizzas
14. Peneira Cilíndrica
15. Jogo de Potes
16. Tesoura de Cozinha
17. Abridor de Garrafas

### Mesa (7 itens)
1. Jogo de Copos
2. Pratos Decorativos
3. Louça de Servir
4. Talheres de Aço
5. Tigela de Cerâmica
6. Jogo de Xícaras
7. -

### Têxteis (3 itens)
1. Toalhas de Cozinha
2. Pano de Prato
3. Tapete de Cozinha

### Decoração (2 itens)
1. Cortina Elegante
2. Ventilador de Cozinha

## Troubleshooting

### Erro: "Failed to execute 'json' on 'Response'"
- Verifique se a API está respondendo
- Cheque o console do navegador (F12)
- Reinicie o servidor

### Presents não carregam
- Verifique a conexão com o banco de dados
- Se usar Neon, confirme que `DATABASE_URL` está configurado
- O sistema usa dados mock se o banco não estiver disponível

### Reserva não funciona
- Verifique se o email é válido
- Verifique se o presente ainda está disponível
- Recarregue a página

## Dados Mock

Por padrão, o sistema funciona com dados mock em memória. Isso significa:
- As reservas não persistem após reiniciar o servidor
- Ideal para testes e desenvolvimento
- Para produção, configure o Neon

## Suporte

Se tiver problemas:
1. Verifique o console do navegador (F12)
2. Verifique os logs do servidor
3. Teste localmente antes de fazer deploy

---

**Criado em**: 2024
**Última atualização**: 2024
