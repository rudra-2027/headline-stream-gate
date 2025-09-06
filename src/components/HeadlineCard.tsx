import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock } from "lucide-react";
import { Headline } from "@/lib/mockData";

interface HeadlineCardProps {
  headline: Headline;
}

export const HeadlineCard = ({ headline }: HeadlineCardProps) => {
  const timeAgo = (date: string) => {
    const now = new Date();
    const scraped = new Date(date);
    const diffInHours = Math.floor((now.getTime() - scraped.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours === 1) return "1 hour ago";
    return `${diffInHours} hours ago`;
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50 transition-all duration-300 hover:shadow-card hover:-translate-y-1 group">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold leading-tight text-card-foreground group-hover:text-primary transition-colors">
            {headline.text}
          </h3>
          <Badge variant="secondary" className="shrink-0">
            {headline.source_domain}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{timeAgo(headline.scraped_at)}</span>
          </div>
          <a 
            href={headline.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Source</span>
          </a>
        </div>
      </div>
    </Card>
  );
};