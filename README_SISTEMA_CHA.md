# Sistema de Reserva de Presentes - Chá de Cozinha

Um sistema elegante e intuitivo para gerenciar a reserva de presentes para eventos de chá de cozinha.

## Características

✨ **Interface Moderna**
- Design responsivo e acessível
- Tema quente com paleta de cores aconchegantes (âmbar/laranja)
- Suporte a filtros por categoria

🎁 **Gerenciamento de Presentes**
- Lista de 28 itens pré-configurados
- Categorias: Cozinha, Banheiro, Limpeza, Louça, Têxteis
- Status de disponibilidade em tempo real

📋 **Sistema de Reservas**
- Convidados podem reservar presentes
- Captura de informações: Nome, Email e Telefone
- Validação de dados em tempo real
- Presentes reservados saem da lista de disponíveis

💾 **Banco de Dados**
- PostgreSQL via Neon
- Schema Prisma com ORM integrado
- Transações seguras para operações críticas

## Stack Tecnológico

- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Backend**: Next.js 16 API Routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **UI**: shadcn/ui components

## Instalação

1. Clone o repositório
2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure o Neon (veja `SETUP_NEON.md`)

4. Rode as migrações:
   \`\`\`bash
   npm run prisma:migrate
   npm run prisma:seed
   \`\`\`

5. Inicie o servidor:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Acesse http://localhost:3000

## Como Usar

### Para Convidados
1. Acesse o site do chá de cozinha
2. Navegue pela lista de presentes
3. Use os filtros para encontrar itens por categoria
4. Clique em "Reservar Presente"
5. Preencha seu nome, email e telefone
6. Confirme a reserva

### Para Administrador (Futuro)
- Dashboard com estatísticas
- Visualizar todas as reservas
- Gerar relatórios
- Editar presentes

## Estrutura do Projeto

\`\`\`
├── app/
│   ├── api/
│   │   ├── gifts/
│   │   │   └── route.ts        # API para listar presentes
│   │   └── reservas/
│   │       └── route.ts        # API para criar reservas
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx                # Página principal
├── components/
│   ├── gift-card.tsx           # Card individual de presente
│   ├── reserva-modal.tsx       # Modal de reserva
│   ├── header.tsx              # Cabeçalho
│   ├── category-filter.tsx     # Filtro de categorias
│   └── ui/                     # Componentes shadcn/ui
├── lib/
│   ├── prisma.ts               # Cliente Prisma
│   └── utils.ts
├── prisma/
│   ├── schema.prisma           # Schema do banco
│   └── seed.ts                 # Script de população inicial
└── public/                     # Imagens e assets estáticos
\`\`\`

## API Endpoints

### GET /api/gifts
Retorna lista de todos os presentes com status de reserva

**Response:**
\`\`\`json
[
  {
    "id": "cuid123",
    "name": "Balança de alimentos",
    "description": "Balança digital para cozinha",
    "category": "Cozinha",
    "available": true,
    "imageUrl": null,
    "reserva": null
  }
]
\`\`\`

### POST /api/reservas
Cria uma nova reserva para um presente

**Request:**
\`\`\`json
{
  "giftId": "cuid123",
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "cuid456",
  "giftId": "cuid123",
  "userId": "cuid789",
  "status": "reservado",
  "createdAt": "2024-01-15T10:30:00Z"
}
\`\`\`

## Próximos Passos

- [ ] Dashboard administrativo
- [ ] Edição de presentes
- [ ] Cancelamento de reservas
- [ ] Notificações por email
- [ ] Relatórios em PDF
- [ ] Autenticação de admin

## Deploy

### Para Vercel
1. Push o código para GitHub
2. Conecte o repositório no Vercel
3. Configure a variável `NEON_DATABASE_URL` no Vercel
4. Deploy automático ativado

## Licença

MIT
