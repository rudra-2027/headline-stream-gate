import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Globe, Play, Plus, X, Clock, CheckCircle, AlertCircle } from "lucide-react";

export const UrlScrapeForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedUrls, setSavedUrls] = useState([
    { id: 1, url: "https://techcrunch.com", status: "active", lastScrape: "2 mins ago" },
    { id: 2, url: "https://reuters.com", status: "active", lastScrape: "5 mins ago" },
    { id: 3, url: "https://bloomberg.com", status: "paused", lastScrape: "1 hour ago" },
  ]);

  const handleSubmitUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUrl = {
        id: Date.now(),
        url: url,
        status: "active" as const,
        lastScrape: "Just now"
      };
      
      setSavedUrls([newUrl, ...savedUrls]);
      setUrl("");
      
      toast({
        title: "URL Added Successfully",
        description: `Started scraping ${url}`,
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const handleRemoveUrl = (id: number) => {
    setSavedUrls(savedUrls.filter(item => item.id !== id));
    toast({
      title: "URL Removed",
      description: "Stopped scraping this URL",
    });
  };

  const toggleUrlStatus = (id: number) => {
    setSavedUrls(savedUrls.map(item => 
      item.id === id 
        ? { ...item, status: item.status === "active" ? "paused" as const : "active" as const }
        : item
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "paused":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "paused":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New URL Form */}
      <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-card-foreground">Add New Scraping URL</h2>
              <p className="text-sm text-muted-foreground">Enter a website URL to start scraping headlines</p>
            </div>
          </div>

          <form onSubmit={handleSubmitUrl} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <div className="flex gap-3">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !url}
                  className="bg-gradient-primary border-0 min-w-[100px]"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add URL
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>

      {/* Saved URLs List */}
      <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground">Active Scraping URLs</h3>
          
          {savedUrls.length === 0 ? (
            <div className="text-center py-8">
              <Globe className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No URLs added yet</p>
              <p className="text-sm text-muted-foreground">Add a URL above to start scraping</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedUrls.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-accent/20 rounded-lg border border-border/30 hover:bg-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <p className="font-medium text-card-foreground">{item.url}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        Last scraped: {item.lastScrape}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`capitalize ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </Badge>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleUrlStatus(item.id)}
                      className="hover:bg-primary/10"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveUrl(item.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};