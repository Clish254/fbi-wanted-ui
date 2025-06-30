"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ExternalLink, Calendar, MapPin } from "lucide-react"
import { useState } from "react"
import { PersonDetailModal } from "./person-detail-modal"
import { ClientDate } from "./client-date"

interface WantedPerson {
  uid: string
  title: string
  description: string
  images: Array<{
    thumb: string
    original: string
    large: string
    caption: string | null
  }>
  warning_message: string | null
  reward_text: string | null
  caution: string | null
  details: string | null
  field_offices: string[]
  subjects: string[]
  publication: string
  url: string
  poster_classification: string
  hair?: string
  eyes?: string
  race?: string
  sex?: string
  age_min?: number
  age_max?: number
  height_min?: number
  height_max?: number
  weight_min?: number
  weight_max?: number
  scars_and_marks?: string
  aliases?: string[]
  occupations?: string[]
  nationality?: string
  place_of_birth?: string
  dates_of_birth_used?: string[]
  additional_information?: string
  files?: Array<{
    name: string
    url: string
  }>
}

export function WantedPersonCard({ person }: { person: WantedPerson }) {
  const primaryImage = person.images?.[0]
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <Card
        className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <CardHeader className="pb-4">
          {primaryImage && (
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src={primaryImage.original || "/placeholder.svg?height=200&width=300"}
                alt={person.title}
                fill
                className="object-cover"
                crossOrigin="anonymous"
              />
            </div>
          )}

          <CardTitle className="text-lg font-bold line-clamp-2">{person.title}</CardTitle>

          {person.description && <p className="text-sm text-muted-foreground line-clamp-2">{person.description}</p>}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4">
          {person.warning_message && (
            <div className="flex items-start gap-2 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">{person.warning_message}</p>
            </div>
          )}

          {person.reward_text && (
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="text-sm text-green-700 dark:text-green-400 font-medium">{person.reward_text}</p>
            </div>
          )}

          <div className="space-y-3">
            {person.subjects && person.subjects.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">CATEGORIES</p>
                <div className="flex flex-wrap gap-1">
                  {person.subjects.slice(0, 3).map((subject, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-secondary text-secondary-foreground">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {person.field_offices && person.field_offices.length > 0 && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  {person.field_offices.slice(0, 2).join(", ")}
                  {person.field_offices.length > 2 && ` +${person.field_offices.length - 2} more`}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                Published: <ClientDate date={person.publication} />
              </p>
            </div>
          </div>

          <div className="mt-auto pt-4">
            <Button
              asChild
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <a href={person.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                View Details
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {showDetails && <PersonDetailModal person={person} onClose={() => setShowDetails(false)} />}
    </>
  )
}
