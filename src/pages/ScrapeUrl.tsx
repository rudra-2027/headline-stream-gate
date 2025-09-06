import { UrlScrapeForm } from "@/components/UrlScrapeForm";

const ScrapeUrl = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-card-foreground">URL Scraping</h1>
        <p className="text-muted-foreground">
          Add and manage websites for headline scraping
        </p>
      </div>
      
      <UrlScrapeForm />
    </div>
  );
};

export default ScrapeUrl;