import { prisma } from "@/lib/prisma"

async function main() {
  console.log("Iniciando seed do banco de dados...")

  // Criar presentes
  const gifts = await prisma.gift.createMany({
    data: [
      {
        name: "Jogo de Panelas em Aço Inox",
        description: "Conjunto completo com 5 peças antaderente",
        category: "Panelas",
        price: 350.0,
        available: true,
        imageUrl: "/jogo-de-panelas.jpg",
      },
      {
        name: "Mixer Elétrico",
        description: "Potência de 300W com 3 velocidades",
        category: "Eletrodomésticos",
        price: 180.0,
        available: true,
        imageUrl: "/mixer-eletrico.jpg",
      },
      {
        name: "Jogo de Facas de Cozinha",
        description: "Kit com 6 facas profissionais de aço",
        category: "Utensílios",
        price: 250.0,
        available: true,
        imageUrl: "/jogo-de-facas.jpg",
      },
      {
        name: "Jogo de Toalhas Elegantes",
        description: "5 toalhas premium em tons neutros",
        category: "Decoração",
        price: 120.0,
        available: true,
        imageUrl: "/toalhas-de-cozinha.jpg",
      },
      {
        name: "Tábua de Corte Profissional",
        description: "Madeira premium com pega ergonômica",
        category: "Utensílios",
        price: 95.0,
        available: true,
        imageUrl: "/tabua-de-corte.jpg",
      },
      {
        name: "Frigideira de Ferro Fundido",
        description: "Modelo clássico, vitalício",
        category: "Panelas",
        price: 145.0,
        available: true,
        imageUrl: "/frigideira-ferro-fundido.jpg",
      },
    ],
    skipDuplicates: true,
  })

  console.log(`${gifts.count} presentes criados com sucesso`)
  console.log("Seed concluído!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
