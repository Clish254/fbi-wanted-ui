"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertTriangle,
  ExternalLink,
  Calendar,
  MapPin,
  User,
  Eye,
  Palette,
  Weight,
  Ruler,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
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

interface PersonDetailModalProps {
  person: WantedPerson
  onClose: () => void
}

export function PersonDetailModal({ person, onClose }: PersonDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const publicationDate = new Date(person.publication).toLocaleDateString()

  const nextImage = () => {
    if (person.images && person.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % person.images.length)
    }
  }

  const prevImage = () => {
    if (person.images && person.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + person.images.length) % person.images.length)
    }
  }

  const currentImage = person.images?.[currentImageIndex]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden !bg-white dark:!bg-gray-900 border border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">{person.title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 p-1">
            {/* Image Gallery */}
            {person.images && person.images.length > 0 && (
              <div className="relative">
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={currentImage?.original || "/placeholder.svg?height=300&width=400"}
                    alt={person.title}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                  {person.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
                {person.images.length > 1 && (
                  <div className="flex justify-center mt-2 space-x-1">
                    {person.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Alerts and Warnings */}
            <div className="space-y-3">
              {person.warning_message && (
                <div className="flex items-start gap-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-800 dark:text-red-200 font-medium">{person.warning_message}</p>
                </div>
              )}

              {person.reward_text && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-green-800 dark:text-green-200 font-medium">{person.reward_text}</p>
                </div>
              )}

              {person.caution && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div
                    className="text-yellow-800 dark:text-yellow-200 font-medium"
                    dangerouslySetInnerHTML={{ __html: person.caution }}
                  />
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                <User className="h-5 w-5" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {person.description && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{person.description}</p>
                  </div>
                )}
                {person.sex && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sex</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{person.sex}</p>
                  </div>
                )}
                {person.race && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Race</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{person.race}</p>
                  </div>
                )}
                {person.nationality && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Nationality</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{person.nationality}</p>
                  </div>
                )}
                {person.place_of_birth && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Place of Birth</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{person.place_of_birth}</p>
                  </div>
                )}
                {(person.age_min || person.age_max) && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Age</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {person.age_min && person.age_max
                        ? `${person.age_min} - ${person.age_max}`
                        : person.age_min || person.age_max}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Physical Description */}
            {(person.hair ||
              person.eyes ||
              person.height_min ||
              person.height_max ||
              person.weight_min ||
              person.weight_max) && (
              <>
                <Separator className="bg-gray-200 dark:bg-gray-700" />
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Eye className="h-5 w-5" />
                    Physical Description
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {person.hair && (
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hair</p>
                          <p className="text-sm text-gray-900 dark:text-gray-100">{person.hair}</p>
                        </div>
                      </div>
                    )}
                    {person.eyes && (
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Eyes</p>
                          <p className="text-sm text-gray-900 dark:text-gray-100">{person.eyes}</p>
                        </div>
                      </div>
                    )}
                    {(person.height_min || person.height_max) && (
                      <div className="flex items-center gap-2">
                        <Ruler className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Height</p>
                          <p className="text-sm text-gray-900 dark:text-gray-100">
                            {person.height_min && person.height_max
                              ? `${person.height_min}" - ${person.height_max}"`
                              : `${person.height_min || person.height_max}"`}
                          </p>
                        </div>
                      </div>
                    )}
                    {(person.weight_min || person.weight_max) && (
                      <div className="flex items-center gap-2">
                        <Weight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Weight</p>
                          <p className="text-sm text-gray-900 dark:text-gray-100">
                            {person.weight_min && person.weight_max
                              ? `${person.weight_min} - ${person.weight_max} lbs`
                              : `${person.weight_min || person.weight_max} lbs`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Additional Details */}
            {(person.aliases || person.occupations || person.scars_and_marks || person.dates_of_birth_used) && (
              <>
                <Separator className="bg-gray-200 dark:bg-gray-700" />
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Additional Details</h3>
                  <div className="space-y-3">
                    {person.aliases && person.aliases.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Aliases</p>
                        <div className="flex flex-wrap gap-1">
                          {person.aliases.map((alias, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {alias}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {person.occupations && person.occupations.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Occupations</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100">{person.occupations.join(", ")}</p>
                      </div>
                    )}
                    {person.scars_and_marks && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Scars and Marks</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100">{person.scars_and_marks}</p>
                      </div>
                    )}
                    {person.dates_of_birth_used && person.dates_of_birth_used.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Dates of Birth Used</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          {person.dates_of_birth_used.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Details and Additional Information */}
            {(person.details || person.additional_information) && (
              <>
                <Separator className="bg-gray-200 dark:bg-gray-700" />
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                    <FileText className="h-5 w-5" />
                    Details
                  </h3>
                  {person.details && (
                    <div
                      className="text-sm mb-3 prose prose-sm dark:prose-invert max-w-none text-gray-900 dark:text-gray-100"
                      dangerouslySetInnerHTML={{ __html: person.details }}
                    />
                  )}
                  {person.additional_information && (
                    <div
                      className="text-sm prose prose-sm dark:prose-invert max-w-none text-gray-900 dark:text-gray-100"
                      dangerouslySetInnerHTML={{ __html: person.additional_information }}
                    />
                  )}
                </div>
              </>
            )}

            {/* Categories and Location */}
            <Separator className="bg-gray-200 dark:bg-gray-700" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {person.subjects && person.subjects.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Categories</p>
                  <div className="flex flex-wrap gap-1">
                    {person.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-secondary text-secondary-foreground">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {person.field_offices && person.field_offices.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Field Offices
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {person.field_offices.map((office, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {office.charAt(0).toUpperCase() + office.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Files and External Links */}
            {person.files && person.files.length > 0 && (
              <>
                <Separator className="bg-gray-200 dark:bg-gray-700" />
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Additional Information</h3>
                  <div className="space-y-2">
                    {person.files.map((file, index) => (
                      <Button key={index} variant="outline" asChild className="w-full justify-start bg-transparent">
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          {file.name}
                          <ExternalLink className="h-4 w-4 ml-auto" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Footer */}
            <Separator className="bg-gray-200 dark:bg-gray-700" />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                Published: <ClientDate date={person.publication} />
              </div>
              <Button asChild>
                <a href={person.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  View on FBI.gov
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
