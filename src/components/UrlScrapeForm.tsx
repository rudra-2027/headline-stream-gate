import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Globe, Play, Plus, X, Clock, CheckCircle, AlertCircle, Search, Key, Eye, EyeOff } from "lucide-react";
import { FirecrawlService } from "@/utils/FirecrawlService";

export const UrlScrapeForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [apiKey, setApiKey] = useState(FirecrawlService.getApiKey() || "");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<any>(null);
  const [savedUrls, setSavedUrls] = useState([
    { id: 1, url: "https://techcrunch.com", status: "active", lastScrape: "2 mins ago", data: null },
    { id: 2, url: "https://reuters.com", status: "active", lastScrape: "5 mins ago", data: null },
    { id: 3, url: "https://bloomberg.com", status: "paused", lastScrape: "1 hour ago", data: null },
  ]);

  // Filter URLs based on search term
  const filteredUrls = savedUrls.filter(item =>
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Firecrawl API key first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Test and save API key if not already saved
      if (!FirecrawlService.getApiKey()) {
        const isValidKey = await FirecrawlService.testApiKey(apiKey);
        if (!isValidKey) {
          toast({
            title: "Invalid API Key",
            description: "Please check your Firecrawl API key",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        FirecrawlService.saveApiKey(apiKey);
      }

      // Scrape the URL
      const result = await FirecrawlService.scrapeUrl(url);
      
      if (result.success) {
        const newUrl = {
          id: Date.now(),
          url: url,
          status: "active" as const,
          lastScrape: "Just now",
          data: result.data
        };
        
        setSavedUrls([newUrl, ...savedUrls]);
        setScrapedData(result.data);
        setUrl("");
        
        toast({
          title: "URL Scraped Successfully",
          description: `Successfully scraped data from ${url}`,
        });
      } else {
        toast({
          title: "Scraping Failed",
          description: result.error || "Failed to scrape the URL",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

  const viewScrapedData = (item: any) => {
    setScrapedData(item.data);
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
      {/* API Key Setup */}
      <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Key className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-card-foreground">Firecrawl API Configuration</h2>
              <p className="text-sm text-muted-foreground">Enter your Firecrawl API key to enable web scraping</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  placeholder="fc-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button 
                type="button"
                variant="outline"
                onClick={() => FirecrawlService.saveApiKey(apiKey)}
                disabled={!apiKey}
              >
                Save Key
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your API key from <a href="https://firecrawl.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">firecrawl.dev</a>
            </p>
          </div>
        </div>
      </Card>

      {/* Add New URL Form */}
      <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-card-foreground">Scrape Website URL</h2>
              <p className="text-sm text-muted-foreground">Enter a website URL to scrape all its content</p>
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
                  disabled={isLoading || !url || !apiKey}
                  className="bg-gradient-primary border-0 min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Scraping...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Scrape URL
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
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-card-foreground">Active Scraping URLs</h3>
            <div className="text-sm text-muted-foreground">
              {filteredUrls.length} of {savedUrls.length} URLs
            </div>
          </div>
          
          {/* Search Input */}
          {savedUrls.length > 0 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search URLs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
          
          {savedUrls.length === 0 ? (
            <div className="text-center py-8">
              <Globe className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No URLs added yet</p>
              <p className="text-sm text-muted-foreground">Add a URL above to start scraping</p>
            </div>
          ) : filteredUrls.length === 0 ? (
            <div className="text-center py-8">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No URLs found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search term</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredUrls.map((item) => (
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
                      onClick={() => viewScrapedData(item)}
                      className="hover:bg-primary/10"
                      disabled={!item.data}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
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

      {/* Scraped Data Display */}
      {scrapedData && (
        <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-card-foreground">Scraped Content</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setScrapedData(null)}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scrapedData.title && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Title</Label>
                  <p className="text-sm bg-accent/20 p-3 rounded-lg">{scrapedData.title}</p>
                </div>
              )}
              
              {scrapedData.description && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm bg-accent/20 p-3 rounded-lg">{scrapedData.description}</p>
                </div>
              )}
            </div>

            {scrapedData.markdown && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Content (Markdown)</Label>
                <Textarea
                  value={scrapedData.markdown}
                  readOnly
                  className="min-h-[300px] font-mono text-xs bg-accent/20"
                />
              </div>
            )}

            {scrapedData.html && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Raw HTML</Label>
                <Textarea
                  value={scrapedData.html}
                  readOnly
                  className="min-h-[200px] font-mono text-xs bg-accent/20"
                />
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};