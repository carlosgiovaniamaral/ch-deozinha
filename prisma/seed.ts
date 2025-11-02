import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Limpar dados antigos
  await prisma.reserva.deleteMany()
  await prisma.gift.deleteMany()
  await prisma.user.deleteMany()

  const gifts = [
    {
      name: "Balança de alimentos",
      description: "Balança digital para cozinha",
      category: "Cozinha",
    },
    {
      name: "Porta detergente e protetor de panela",
      description: "Preto ou bege",
      category: "Cozinha",
    },
    {
      name: "Escada de 4 degraus",
      description: "Escada alta",
      category: "Utensílios",
    },
    {
      name: "Sanduicheira",
      description: "Sanduicheira elétrica",
      category: "Cozinha",
    },
    {
      name: "Prato raso e prato fundo",
      description: "Jogo de pratos",
      category: "Louça",
    },
    {
      name: "Ferro",
      description: "Ferro elétrico",
      category: "Utensílios",
    },
    {
      name: "Rodinho de pia e porta frio",
      description: "Acessórios de cozinha",
      category: "Cozinha",
    },
    {
      name: "Kit 7 Utensílios para Cozinha",
      description: "Espátula, Concha, Escumadeira, Colher, Pegador de Massa, Garfo Trinchante",
      category: "Utensílios",
    },
    {
      name: "2 Baldes e prendedor",
      description: "Baldes com prendedor",
      category: "Limpeza",
    },
    {
      name: "Suporte para botijão",
      description: "Suporte para cilindro de gás",
      category: "Cozinha",
    },
    {
      name: "Cesto de roupa",
      description: "Cesto para organização",
      category: "Banheiro",
    },
    {
      name: "Lixo para cozinha pequeno e lixo para banheiro",
      description: "Conjunto de lixeiras",
      category: "Limpeza",
    },
    {
      name: "2 Conjunto de copos",
      description: "Jogo de copos",
      category: "Louça",
    },
    {
      name: "Peneira, abridor de lata e escorredor de arroz",
      description: "Utensílios para cozinha",
      category: "Utensílios",
    },
    {
      name: "Prato de sobremesa e escorredor de macarrão",
      description: "Acessórios culinários",
      category: "Louça",
    },
    {
      name: "Conjunto de assadeiras",
      description: "Jogo de assadeiras",
      category: "Cozinha",
    },
    {
      name: "Escorredor de louça e pá de lixo",
      description: "Acessórios para limpeza",
      category: "Limpeza",
    },
    {
      name: "Tábua de carne e escova vaso sanitário",
      description: "Itens para cozinha e banheiro",
      category: "Utensílios",
    },
    {
      name: "3 Tapetes para banheiro de pano",
      description: "Tapetes absorventes",
      category: "Banheiro",
    },
    {
      name: "Saleiro",
      description: "Saleiro para cozinha",
      category: "Cozinha",
    },
    {
      name: "Conjunto de sobremesa",
      description: "Jogo de louça para sobremesa",
      category: "Louça",
    },
    {
      name: "Conjunto de xícaras média",
      description: "Jogo de xícaras",
      category: "Louça",
    },
    {
      name: "Conjunto de canecas",
      description: "Jogo de canecas",
      category: "Louça",
    },
    {
      name: "Lixo grande para cozinha",
      description: "Lixeira de maior capacidade",
      category: "Limpeza",
    },
    {
      name: "Guardanapos e kit pote açúcar/arroz",
      description: "Potes para armazenamento",
      category: "Cozinha",
    },
    {
      name: "5 Toalha de rosto",
      description: "Toalhas de rosto",
      category: "Têxteis",
    },
    {
      name: "2 Toalha de banho",
      description: "Toalhas de banho",
      category: "Têxteis",
    },
    {
      name: "Kit conjunto potes",
      description: "Jogo de potes para armazenamento",
      category: "Cozinha",
    },
  ]

  // Criar presentes
  for (const gift of gifts) {
    await prisma.gift.create({
      data: {
        name: gift.name,
        description: gift.description,
        category: gift.category,
        available: true,
      },
    })
  }

  console.log(`✅ ${gifts.length} presentes criados com sucesso!`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
