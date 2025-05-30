"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface BackButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
}

export function BackButton({ className, ...props }: BackButtonProps) {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className={`group hover:bg-hotel-50 ${className}`}
      {...props}
    >
      <ArrowLeft className="mr-2 h-4 w-4 text-hotel-600 group-hover:translate-x-[-2px] transition-transform" />
      <span className="text-hotel-700">Back</span>
    </Button>
  )
}
