"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationControlsProps {
  currentPage: number
  totalResults: number
  resultsPerPage: number
}

export function PaginationControls({ currentPage, totalResults, resultsPerPage }: PaginationControlsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(totalResults / resultsPerPage)

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", page.toString())
    }
    router.push(`/?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="sm" onClick={() => navigateToPage(1)} disabled={currentPage === 1}>
        <ChevronsLeft className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="sm" onClick={() => navigateToPage(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getVisiblePages().map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => typeof page === "number" && navigateToPage(page)}
          disabled={typeof page !== "number"}
          className="min-w-[40px]"
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
