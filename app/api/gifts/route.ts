import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const gifts = await prisma.gift.findMany({
      include: {
        reserva: {
          include: {
            user: true, // 🔹 importante para trazer o usuário
          },
        },
      },
    })

    const giftsWithAvailability = gifts.map((gift) => ({
      ...gift,
      available: !gift.reserva, // se não tem reserva, está disponível
    }))

    return NextResponse.json(giftsWithAvailability)
  } catch (error) {
    console.error("Erro ao buscar presentes:", error)
    return NextResponse.json([], { status: 500 })
  }
}
