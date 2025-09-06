import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, Filter } from "lucide-react";
import { Headline } from "@/lib/mockData";

interface HeadlinesTableProps {
  headlines: Headline[];
}

export const HeadlinesTable = ({ headlines }: HeadlinesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState<string>("");

  const filteredHeadlines = headlines.filter(headline => {
    const matchesSearch = headline.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         headline.source_domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = !selectedSource || headline.source_domain === selectedSource;
    return matchesSearch && matchesSource;
  });

  const uniqueSources = [...new Set(headlines.map(h => h.source_domain))];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Headlines</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search headlines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2 text-sm"
              >
                <option value="">All Sources</option>
                {uniqueSources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Headline</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Source</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Scraped</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHeadlines.map((headline) => (
                <tr key={headline.id} className="border-b border-border/30 hover:bg-accent/20 transition-colors">
                  <td className="py-4 px-2">
                    <p className="font-medium text-card-foreground leading-tight">
                      {headline.text}
                    </p>
                  </td>
                  <td className="py-4 px-2">
                    <Badge variant="outline" className="text-xs">
                      {headline.source_domain}
                    </Badge>
                  </td>
                  <td className="py-4 px-2 text-sm text-muted-foreground">
                    {formatDate(headline.scraped_at)}
                  </td>
                  <td className="py-4 px-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="hover:bg-primary/10"
                    >
                      <a
                        href={headline.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHeadlines.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No headlines found matching your criteria.</p>
          </div>
        )}
      </div>
    </Card>
  );
};