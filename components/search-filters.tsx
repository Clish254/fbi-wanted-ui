"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  "Additional Violent Crimes",
  "Seeking Information",
  "Ten Most Wanted Fugitives",
  "Case of the Week",
  "Kidnappings and Missing Persons",
  "Indian Country",
  "Law Enforcement Assistance",
  "Cyber's Most Wanted",
  "Violent Crimes - Murders",
  "Violent Crime - Murders",
  "ViCAP Missing Persons",
];

const FIELD_OFFICES = [
  "miami",
  "lasvegas",
  "dallas",
  "albuquerque",
  "phoenix",
  "neworleans",
  "losangeles",
  "atlanta",
  "springfield",
  "philadelphia",
  "newark",
  "sanfrancisco",
  "portland",
  "indianapolis",
  "chicago",
];

const HAIR = ["black", "brown", "blond"];

const EYES = ["brown", "hazel", "black", "blue"];

const RACE = ["black", "hispanic", "native", "white"];

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [fieldOffice, setFieldOffice] = useState(
    searchParams.get("field_offices") || "all",
  );
  const [category, setCategory] = useState(
    searchParams.get("subject") || "all",
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [hairColor, setHairColor] = useState(searchParams.get("hair") || "all");
  const [eyeColor, setEyeColor] = useState(searchParams.get("eyes") || "all");
  const [race, setRace] = useState(searchParams.get("race") || "all");

  const updateFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove page when filters change
    params.delete("page");

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }

    if (fieldOffice !== "all") {
      params.set("field_offices", fieldOffice);
    } else {
      params.delete("field_offices");
    }

    if (category !== "all") {
      params.set("subject", category);
    } else {
      params.delete("subject");
    }

    if (hairColor !== "all") {
      params.set("hair", hairColor);
    } else {
      params.delete("hair");
    }

    if (eyeColor !== "all") {
      params.set("eyes", eyeColor);
    } else {
      params.delete("eyes");
    }

    if (race !== "all") {
      params.set("race", race);
    } else {
      params.delete("race");
    }

    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    setFieldOffice("all");
    setCategory("all");
    setSearchQuery("");
    setHairColor("all");
    setEyeColor("all");
    setRace("all");
    router.push("/");
  };

  const hasActiveFilters =
    fieldOffice !== "all" ||
    category !== "all" ||
    searchQuery.trim() !== "" ||
    hairColor !== "all" ||
    eyeColor !== "all" ||
    race !== "all";

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Search</label>
          <Input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">
              Field Office
            </label>
            <Select value={fieldOffice} onValueChange={setFieldOffice}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All field offices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All field offices</SelectItem>
                {FIELD_OFFICES.map((office) => (
                  <SelectItem key={office} value={office}>
                    {office.charAt(0).toUpperCase() + office.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Hair Color</label>
            <Select value={hairColor} onValueChange={setHairColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All hair colors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All hair colors</SelectItem>
                {HAIR.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Eye Color</label>
            <Select value={eyeColor} onValueChange={setEyeColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All eye colors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All eye colors</SelectItem>
                {EYES.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Race</label>
            <Select value={race} onValueChange={setRace}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All races" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All races</SelectItem>
                {RACE.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 md:items-end md:pb-0 pb-0">
          <Button
            onClick={updateFilters}
            className="flex items-center mt-2 gap-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600"
          >
            <Search className="h-4 w-4" />
            Apply Filters
          </Button>

          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center gap-2 bg-transparent"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
