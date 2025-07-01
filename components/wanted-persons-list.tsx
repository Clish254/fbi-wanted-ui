import { WantedPersonCard } from "./wanted-person-card";
import { PaginationControls } from "./pagination-controls";

interface WantedPerson {
  uid: string;
  title: string;
  description: string;
  images: Array<{
    thumb: string;
    original: string;
    large: string;
    caption: string | null;
  }>;
  warning_message: string | null;
  reward_text: string | null;
  caution: string | null;
  details: string | null;
  field_offices: string[];
  subjects: string[];
  publication: string;
  url: string;
  poster_classification: string;
}

interface ApiResponse {
  total: number;
  items: WantedPerson[];
  page: number;
}

interface SearchParams {
  page?: string;
  field_offices?: string;
  poster_classification?: string;
  search?: string;
  hair?: string;
  eyes?: string;
  race?: string;
}

async function fetchWantedPersons(
  searchParams: SearchParams,
): Promise<ApiResponse> {
  const params = new URLSearchParams();

  if (searchParams.page) {
    params.append("page", searchParams.page);
  }

  if (searchParams.field_offices) {
    params.append("field_offices", searchParams.field_offices);
  }

  if (searchParams.poster_classification) {
    params.append("poster_classification", searchParams.poster_classification);
  }

  if (searchParams.search) {
    params.append("title", searchParams.search);
  }

  if (searchParams.hair) {
    params.append("hair", searchParams.hair);
  }

  if (searchParams.eyes) {
    params.append("eyes", searchParams.eyes);
  }

  if (searchParams.race) {
    params.append("race", searchParams.race);
  }

  const url = `https://fbi-wanted-backend-production.up.railway.app/api/wanted${params.toString() ? `?${params.toString()}` : ""}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching wanted persons:", error);
    return { total: 0, items: [], page: 1 };
  }
}

export async function WantedPersonsList({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const data = await fetchWantedPersons(searchParams);
  const currentPage = Number.parseInt(searchParams.page || "1");

  if (data.items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No results found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {data.items.length} of {data.total} results
        </p>
        <p className="text-muted-foreground">Page {currentPage}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map((person) => (
          <WantedPersonCard key={person.uid} person={person} />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalResults={data.total}
        resultsPerPage={20} // FBI API default
      />
    </div>
  );
}
