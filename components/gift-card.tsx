"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Gift {
  id: string
  name: string
  description?: string
  category: string
  imageUrl?: string
  available: boolean
  reserva?: {
    user?: {
      name?: string
    }
  }
}

export function GiftCard({ gift, onReserve }: { gift: Gift; onReserve: (gift: Gift) => void }) {
  return (
    <div className="w-full bg-white rounded-lg border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Imagem: usa aspect ratio para não bagunçar o layout */}
      <div className="w-full aspect-[4/3] sm:aspect-square bg-amber-50 overflow-hidden">
        {gift.imageUrl ? (
          <img
            src={gift.imageUrl ?? "/placeholder.svg"}
            alt={gift.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-amber-100 to-orange-100">
            🎁
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-amber-900 text-sm line-clamp-2">{gift.name}</h3>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
            {gift.category}
          </Badge>
        </div>

        {gift.description && (
          <p className="text-xs text-amber-700 line-clamp-2">{gift.description}</p>
        )}

        <div className="mt-auto">
          {/* Status */}
          <div className="mb-2 text-xs">
            {gift.available ? (
              <div className="text-green-600 font-medium">✓ Disponível</div>
            ) : (
              <div className="text-green-700">
                Reservado por{" "}
                <span className="font-semibold">
                  {gift.reserva?.user?.name ?? "Usuário desconhecido"}
                </span>
              </div>
            )}
          </div>

          {/* Botão */}
          <Button
            onClick={() => onReserve(gift)}
            disabled={!gift.available}
            className={`w-full h-8 text-xs ${
              gift.available
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-red-400 text-black cursor-not-allowed"
            }`}
          >
            {gift.available ? "Reservar" : "Reservado"}
          </Button>
        </div>
      </div>
    </div>
  )
}
