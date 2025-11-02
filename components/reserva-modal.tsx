"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Gift {
  id: string
  name: string
  category: string
  price?: number
  available: boolean
}

interface ReservaModalProps {
  gift: Gift
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function ReservaModal({ gift, open, onOpenChange, onSuccess }: ReservaModalProps) {
  const [formData, setFormData] = useState({
    name: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name.trim()) {
      setError("Por favor, preencha o nome.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          giftId: gift.id,
          name: formData.name,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao reservar presente")
      }

      setFormData({ name: "" })
      onOpenChange(false)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-amber-200">
        <DialogHeader>
          <DialogTitle className="text-amber-900">Reservar Presente</DialogTitle>
          <DialogDescription className="text-amber-700">{gift.name}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="">
            <Label htmlFor="name" className=" text-amber-900">
              Nome Completo *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-4 border-amber-200 focus:border-amber-400"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded border border-red-200">{error}</div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
              {loading ? "Reservando..." : "Confirmar Reserva"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
