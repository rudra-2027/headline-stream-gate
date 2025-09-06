import { HeadlinesTable } from "@/components/HeadlinesTable";
import { mockHeadlines } from "@/lib/mockData";

const Headlines = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-card-foreground">All Headlines</h1>
        <p className="text-muted-foreground">
          View and search through all scraped headlines
        </p>
      </div>
      
      <HeadlinesTable headlines={mockHeadlines} />
    </div>
  );
};

export default Headlines;