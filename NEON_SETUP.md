# Configurar Neon para Produção

## 1. Variáveis de Ambiente Configuradas

O seu `.env.local` já possui:
\`\`\`
NEON_DATABASE_URL='postgresql://neondb_owner:npg_wyaes0pZOV8q@ep-twilight-morning-abz7xqyv-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require'
\`\`\`

## 2. Criar Tabelas no Neon

Execute um destes comandos:

### Opção A: Usando Prisma (Recomendado)
\`\`\`bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
\`\`\`

### Opção B: Usando Script de Migração
\`\`\`bash
npx ts-node scripts/migrate-neon.ts
\`\`\`

### Opção C: SQL Direto
Cole o conteúdo de `prisma/migrations/001_init.sql` no editor SQL do Neon Console.

## 3. Verificar Conexão

Acesse o Neon Console e verifique:
- Tabela `users` - deve existir vazia
- Tabela `gifts` - deve ter 28 presentes
- Tabela `reservas` - deve estar vazia

## 4. Testando a Aplicação

Após as migrações:
1. A API `/api/gifts` carregará dados do Neon
2. A API `/api/reservas` criará usuários e reservas no banco real
3. Os logs mostrarão "[v0] ... Neon"

## Troubleshooting

Se receber erro de conexão:
1. Verifique se `DATABASE_URL` está no painel Vars do v0
2. Confirme que a URL não tem espaços ou caracteres especiais
3. Teste a conexão no Neon Console

Se a migração falhar:
1. Limpe tabelas antigas: `DROP TABLE IF EXISTS reservas, gifts, users CASCADE;`
2. Tente novamente
