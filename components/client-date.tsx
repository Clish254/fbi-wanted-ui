"use client"

import { useEffect, useState } from "react"

interface ClientDateProps {
  date: string
  className?: string
}

export function ClientDate({ date, className }: ClientDateProps) {
  const [formattedDate, setFormattedDate] = useState("")

  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleDateString())
  }, [date])

  if (!formattedDate) return null

  return <span className={className}>{formattedDate}</span>
}
