import { Suspense } from "react";
import { WantedPersonsList } from "@/components/wanted-persons-list";
import { SearchFilters } from "@/components/search-filters";
import { ModeToggle } from "@/components/mode-toggle";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchParams {
  page?: string;
  field_offices?: string;
  subject?: string;
  search?: string;
  hair?: string;
  eyes?: string;
  race?: string;
}

export default async function HomePage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              FBI Most Wanted
            </h1>
            <p className="text-muted-foreground">
              Search and browse the FBI&apos;s most wanted individuals
            </p>
          </div>
          <ModeToggle />
        </div>

        <SearchFilters />

        <Suspense fallback={<LoadingSkeleton />}>
          <WantedPersonsList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-64 w-fill" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
