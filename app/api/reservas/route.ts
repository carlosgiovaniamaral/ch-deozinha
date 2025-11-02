import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Simulação em memória para quando o banco não está disponível
const mockReservas: Map<string, any> = new Map()
const mockUsers: Map<string, any> = new Map()

export async function POST(request: Request) {
  try {
    const { giftId, name} = await request.json()

   
    if (!giftId || !name) {
      return NextResponse.json({ error: "Nome e giftId são obrigatórios" }, { status: 400 })
    }

    try {
      console.log("[v1] POST /api/reservas - Tentando conectar ao banco")

      const gift = await prisma.gift.findUnique({
        where: { id: giftId },
        include: { reserva: true },
      })

      if (!gift) {
        return NextResponse.json({ error: "Presente não encontrado" }, { status: 404 })
      }

      if (gift.reserva) {
        return NextResponse.json({ error: "Este presente já foi reservado" }, { status: 400 })
      }

      const user = await prisma.user.create({
        data: {
          name
        },
      })

      const reserva = await prisma.reserva.create({
        data: {
          userId: user.id,
          giftId: gift.id,
        },
        include: {
          user: true,
        },
      })

      console.log("[v1] Reserva criada:", reserva.id)
      return NextResponse.json(reserva, { status: 201 })

    } catch (dbError) {
      console.warn("[v1] Banco de dados não disponível, usando mock:", dbError)

      // Simulação em memória
      const userId = `user_${name.replace(/\s+/g, "_").toLowerCase()}`
      const reservaId = `reserva_${giftId}_${Date.now()}`

      if (!mockUsers.has(userId)) {
        mockUsers.set(userId, {
          id: userId,
          name,
        })
      }

      const user = mockUsers.get(userId)

      const reserva = {
        id: reservaId,
        userId,
        giftId,
        status: "reservado",
        createdAt: new Date(),
        updatedAt: new Date(),
        user,
      }

      mockReservas.set(reservaId, reserva)
      return NextResponse.json(reserva, { status: 201 })
    }
  } catch (error) {
    console.error("[v1] Erro ao criar reserva:", error)
    return NextResponse.json({ error: "Erro ao criar reserva" }, { status: 500 })
  }
}
