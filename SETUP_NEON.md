# Configuração do Banco de Dados Neon

Este projeto está configurado para usar PostgreSQL via Neon em produção.

## Passos para Configurar

### 1. Criar Conta no Neon
- Acesse [neon.tech](https://neon.tech)
- Crie uma conta (grátis)
- Crie um novo projeto PostgreSQL

### 2. Obter a Connection String
- No dashboard do Neon, copie a **Connection String** (NEON_DATABASE_URL)
- Escolha a opção "Prisma" para obter a string formatada corretamente

### 3. Configurar Variáveis de Ambiente

#### Para Desenvolvimento Local:
\`\`\`bash
# .env.local
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
\`\`\`

#### Para Produção (Vercel):
1. Acesse seu projeto no Vercel
2. Vá para **Settings > Environment Variables**
3. Adicione uma variável chamada `DATABASE_URL` com o valor da connection string do Neon

### 4. Rodar Migrações

\`\`\`bash
# Gerar cliente Prisma
npm run prisma:generate

# Criar tabelas no banco
npm run prisma:migrate

# Popular com dados iniciais (lista de presentes)
npm run prisma:seed
\`\`\`

### 5. Verificar Conexão

Execute:
\`\`\`bash
npm run dev
\`\`\`

Acesse http://localhost:3000 e verifique se os presentes são carregados do banco.

## Dados Iniciais

O script de seed (`prisma/seed.ts`) popula automaticamente a base com **28 itens** da lista de chá de cozinha:
- Cozinha (panelas, utensílios, etc)
- Banheiro (toalhas, tapetes, etc)
- Limpeza (lixeiras, panos, etc)
- Louça (pratos, xícaras, copos, etc)
- Têxteis (toalhas de rosto e banho)

## Troubleshooting

### Erro: "ENOENT: no such file or directory"
Certifique-se de que a variável `DATABASE_URL` está configurada em `.env.local`

### Erro: "P1000: Authentication failed"
Verifique se a connection string está correta no Neon

### Erro na migração
Execute:
\`\`\`bash
npm run prisma:generate
npm run prisma:migrate -- --name init
\`\`\`

## Suporte
Para mais informações sobre Neon, visite: https://neon.tech/docs
