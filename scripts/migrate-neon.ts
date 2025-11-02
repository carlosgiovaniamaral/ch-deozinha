import { neon } from "@neondatabase/serverless"

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error("DATABASE_URL não configurada!")
  process.exit(1)
}

async function migrate() {
  try {
    const sql = neon(DATABASE_URL!)

    console.log("Criando tabelas no Neon...")

    // ... restante do seu código de criação de tabelas e seed
  } catch (error) {
    console.error("❌ Erro na migração:", error)
    process.exit(1)
  }
}

migrate()
