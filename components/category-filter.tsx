"use client"

import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  categories: string[]
  selected: string
  onChange: (category: string) => void
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onChange(category)}
          variant={selected === category ? "default" : "outline"}
          className={
            selected === category
              ? "bg-amber-600 hover:bg-amber-700 text-white"
              : "border-amber-200 text-amber-700 hover:bg-amber-50"
          }
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
