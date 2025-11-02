import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Dados mock completos com todos os 28 itens (fallback se banco não funcionar)
const MOCK_GIFTS = [
  {
    id: "1",
    name: "Jogo de Panelas",
    description: "Jogo completo de panelas inox 5 peças",
    category: "Cozinha",
    available: true,
    imageUrl: "/jogo-de-panelas.jpg",
  },
  {
    id: "2",
    name: "Jogo de Facas",
    description: "Jogo de facas profissionais aço inox 6 peças",
    category: "Cozinha",
    available: true,
    imageUrl: "/jogo-de-facas.jpg",
  },
  {
    id: "3",
    name: "Tábua de Corte",
    description: "Tábua de corte em madeira maciça grande",
    category: "Cozinha",
    available: true,
    imageUrl: "/tabua-de-corte.jpg",
  },
  {
    id: "4",
    name: "Espremedor de Limão",
    description: "Espremedor manual de limão alumínio",
    category: "Cozinha",
    available: true,
    imageUrl: "/espremedor-de-limao.jpg",
  },
  {
    id: "5",
    name: "Toalhas de Cozinha",
    description: "Kit 3 toalhas de cozinha 100% algodão",
    category: "Têxteis",
    available: true,
    imageUrl: "/toalhas-de-cozinha.jpg",
  },
  {
    id: "6",
    name: "Cortina Elegante",
    description: "Cortina para cozinha cor creme",
    category: "Decoração",
    available: true,
    imageUrl: "/cortina-elegante.jpg",
  },
  {
    id: "7",
    name: "Jogo de Copos",
    description: "Jogo 6 copos vidro cristal 300ml",
    category: "Cozinha",
    available: true,
    imageUrl: "/jogo-de-copos.jpg",
  },
  {
    id: "8",
    name: "Pratos Decorativos",
    description: "Kit 6 pratos de cerâmica coloridos",
    category: "Mesa",
    available: true,
    imageUrl: "/pratos-decorativos.jpg",
  },
  {
    id: "9",
    name: "Louça de Servir",
    description: "Jogo de louça para servir porcelana branca",
    category: "Mesa",
    available: true,
    imageUrl: "/lou-a-servir.jpg",
  },
  {
    id: "10",
    name: "Talheres de Aço",
    description: "Jogo completo de talheres 24 peças",
    category: "Mesa",
    available: true,
    imageUrl: "/talheres.jpg",
  },
  {
    id: "11",
    name: "Jarra de Vidro",
    description: "Jarra vidro 2 litros com tampa",
    category: "Cozinha",
    available: true,
    imageUrl: "/jarra-vidro.jpg",
  },
  {
    id: "12",
    name: "Peneira de Açúcar",
    description: "Peneira de açúcar porcelana com cabo",
    category: "Cozinha",
    available: true,
    imageUrl: "/peneira.jpg",
  },
  {
    id: "13",
    name: "Ralador Cilíndrico",
    description: "Ralador cilíndrico 4 lados inox profissional",
    category: "Cozinha",
    available: true,
    imageUrl: "/ralador.jpg",
  },
  {
    id: "14",
    name: "Escorredor de Macarrão",
    description: "Escorredor inox com alça 2,5 litros",
    category: "Cozinha",
    available: true,
    imageUrl: "/escorredor.jpg",
  },
  {
    id: "15",
    name: "Tigela de Vidro",
    description: "Jogo 3 tigelas vidro resistente ao fogo",
    category: "Cozinha",
    available: true,
    imageUrl: "/tigela.jpg",
  },
  {
    id: "16",
    name: "Assadeira Antiaderente",
    description: "Assadeira antiaderente tamanho grande",
    category: "Cozinha",
    available: true,
    imageUrl: "/assadeira.jpg",
  },
  {
    id: "17",
    name: "Forma de Bolo",
    description: "Forma de bolo redonda antiaderente",
    category: "Cozinha",
    available: true,
    imageUrl: "/forma-bolo.jpg",
  },
  {
    id: "18",
    name: "Formas de Pizza",
    description: "Jogo 2 formas de pizza alumínio",
    category: "Cozinha",
    available: true,
    imageUrl: "/forma-pizza.jpg",
  },
  {
    id: "19",
    name: "Pano de Prato",
    description: "Kit 5 panos de prato estampado",
    category: "Têxteis",
    available: true,
    imageUrl: "/pano-prato.jpg",
  },
  {
    id: "20",
    name: "Tapete de Cozinha",
    description: "Tapete de cozinha antiderrapante 60x40",
    category: "Têxteis",
    available: true,
    imageUrl: "/tapete.jpg",
  },
  {
    id: "21",
    name: "Cortador de Pizzas",
    description: "Cortador de pizza roda inox com cabo",
    category: "Cozinha",
    available: true,
    imageUrl: "/cortador-pizza.jpg",
  },
  {
    id: "22",
    name: "Peneira Cilíndrica",
    description: "Peneira cilíndrica malha fina 150 mesh",
    category: "Cozinha",
    available: true,
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "23",
    name: "Tigela de Cerâmica",
    description: "Jogo 3 tigelas cerâmica coloridas",
    category: "Mesa",
    available: true,
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "24",
    name: "Jogo de Xícaras",
    description: "Jogo 6 xícaras de café porcelana com pires",
    category: "Mesa",
    available: true,
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "25",
    name: "Jogo de Potes",
    description: "Jogo 5 potes vidro com tampa hermética",
    category: "Cozinha",
    available: true,
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "26",
    name: "Tesoura de Cozinha",
    description: "Tesoura profissional aço inox",
    category: "Cozinha",
    available: true,
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "27",
    name: "Abridor de Garrafas",
    description: "Abridor de garrafas saca-rolhas automático",
    category: "Cozinha",
    available: true,
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "28",
    name: "Ventilador de Cozinha",
    description: "Ventilador de parede para cozinha 30cm",
    category: "Decoração",
    available: true,
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
]

export async function GET() {
  try {
    console.log("[v0] GET /api/gifts - Tentando conectar ao Neon")

    const gifts = await prisma.gift.findMany({
      include: {
        reserva: {
          include: {
            user: true,
          },
        },
      },
    })

    console.log("[v0] Presentes carregados do Neon:", gifts.length)

    return NextResponse.json(
      gifts.map((gift) => ({
        id: gift.id,
        name: gift.name,
        description: gift.description,
        category: gift.category,
        available: !gift.reserva,
        imageUrl: gift.imageUrl,
        reserva: gift.reserva
          ? {
              user: {
                name: gift.reserva.user.name,
              },
            }
          : undefined,
      })),
    )
  } catch (error) {
    console.error("[v0] Erro ao conectar Neon, usando dados mock:", error)

    // Fallback para dados mock se banco não funcionar
    return NextResponse.json(MOCK_GIFTS)
  }
}
