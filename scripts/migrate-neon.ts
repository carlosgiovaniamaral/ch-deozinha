import { neon } from "@neondatabase/serverless"

const NEON_NEON_DATABASE_URL = process.env.NEON_DATABASE_URL

if (!NEON_DATABASE_URL) {
  console.error("DATABASE_URL não configurada!")
  process.exit(1)
}

async function migrate() {
  try {
    const sql = neon(NEON_DATABASE_URL)

    console.log("Criando tabelas no Neon...")

    // Criar tabelas
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS gifts (
        id TEXT NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        "imageUrl" TEXT,
        available BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS reservas (
        id TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "giftId" TEXT NOT NULL UNIQUE,
        status TEXT NOT NULL DEFAULT 'reservado',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY ("giftId") REFERENCES gifts(id) ON DELETE CASCADE
      )
    `

    console.log("✅ Tabelas criadas com sucesso!")

    // Verificar se já tem dados
    const existingGifts = await sql`SELECT COUNT(*) as count FROM gifts`
    const count = existingGifts[0].count

    if (count === 0) {
      console.log("Inserindo 28 presentes...")

      const gifts = [
        { name: "Jogo de Panelas", description: "Jogo completo de panelas inox 5 peças", category: "Cozinha" },
        { name: "Jogo de Facas", description: "Jogo de facas profissionais aço inox 6 peças", category: "Cozinha" },
        { name: "Tábua de Corte", description: "Tábua de corte em madeira maciça grande", category: "Cozinha" },
        { name: "Espremedor de Limão", description: "Espremedor manual de limão alumínio", category: "Cozinha" },
        { name: "Toalhas de Cozinha", description: "Kit 3 toalhas de cozinha 100% algodão", category: "Têxteis" },
        { name: "Cortina Elegante", description: "Cortina para cozinha cor creme", category: "Decoração" },
        { name: "Jogo de Copos", description: "Jogo 6 copos vidro cristal 300ml", category: "Cozinha" },
        { name: "Pratos Decorativos", description: "Kit 6 pratos de cerâmica coloridos", category: "Mesa" },
        { name: "Louça de Servir", description: "Jogo de louça para servir porcelana branca", category: "Mesa" },
        { name: "Talheres de Aço", description: "Jogo completo de talheres 24 peças", category: "Mesa" },
        { name: "Jarra de Vidro", description: "Jarra vidro 2 litros com tampa", category: "Cozinha" },
        { name: "Peneira de Açúcar", description: "Peneira de açúcar porcelana com cabo", category: "Cozinha" },
        {
          name: "Ralador Cilíndrico",
          description: "Ralador cilíndrico 4 lados inox profissional",
          category: "Cozinha",
        },
        { name: "Escorredor de Macarrão", description: "Escorredor inox com alça 2,5 litros", category: "Cozinha" },
        { name: "Tigela de Vidro", description: "Jogo 3 tigelas vidro resistente ao fogo", category: "Cozinha" },
        { name: "Assadeira Antiaderente", description: "Assadeira antiaderente tamanho grande", category: "Cozinha" },
        { name: "Forma de Bolo", description: "Forma de bolo redonda antiaderente", category: "Cozinha" },
        { name: "Formas de Pizza", description: "Jogo 2 formas de pizza alumínio", category: "Cozinha" },
        { name: "Pano de Prato", description: "Kit 5 panos de prato estampado", category: "Têxteis" },
        { name: "Tapete de Cozinha", description: "Tapete de cozinha antiderrapante 60x40", category: "Têxteis" },
        { name: "Cortador de Pizzas", description: "Cortador de pizza roda inox com cabo", category: "Cozinha" },
        { name: "Peneira Cilíndrica", description: "Peneira cilíndrica malha fina 150 mesh", category: "Cozinha" },
        { name: "Tigela de Cerâmica", description: "Jogo 3 tigelas cerâmica coloridas", category: "Mesa" },
        { name: "Jogo de Xícaras", description: "Jogo 6 xícaras de café porcelana com pires", category: "Mesa" },
        { name: "Jogo de Potes", description: "Jogo 5 potes vidro com tampa hermética", category: "Cozinha" },
        { name: "Tesoura de Cozinha", description: "Tesoura profissional aço inox", category: "Cozinha" },
        { name: "Abridor de Garrafas", description: "Abridor de garrafas saca-rolhas automático", category: "Cozinha" },
        { name: "Ventilador de Cozinha", description: "Ventilador de parede para cozinha 30cm", category: "Decoração" },
      ]

      for (const gift of gifts) {
        const id = `gift_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        await sql`
          INSERT INTO gifts (id, name, description, category, available, "createdAt", "updatedAt")
          VALUES (${id}, ${gift.name}, ${gift.description}, ${gift.category}, true, NOW(), NOW())
        `
      }

      console.log(`✅ ${gifts.length} presentes inseridos com sucesso!`)
    } else {
      console.log(`ℹ️  Banco já contém ${count} presentes, pulando seed`)
    }

    console.log("✅ Migração concluída com sucesso!")
  } catch (error) {
    console.error("❌ Erro na migração:", error)
    process.exit(1)
  }
}

migrate()
