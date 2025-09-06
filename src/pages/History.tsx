import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { History as HistoryIcon, Clock, CheckCircle, XCircle, Search, RefreshCw } from "lucide-react";

const History = () => {
  const scrapeHistory = [
    {
      id: 1,
      url: "https://techcrunch.com",
      status: "success",
      headlines: 25,
      timestamp: "2024-01-15T10:30:00Z",
      duration: "2.3s"
    },
    {
      id: 2,
      url: "https://reuters.com",
      status: "success",
      headlines: 18,
      timestamp: "2024-01-15T10:25:00Z",
      duration: "1.8s"
    },
    {
      id: 3,
      url: "https://bloomberg.com",
      status: "failed",
      headlines: 0,
      timestamp: "2024-01-15T10:20:00Z",
      duration: "timeout",
      error: "Request timeout after 30s"
    },
    {
      id: 4,
      url: "https://cnn.com",
      status: "success",
      headlines: 32,
      timestamp: "2024-01-15T10:15:00Z",
      duration: "3.1s"
    },
    {
      id: 5,
      url: "https://bbc.com",
      status: "success",
      headlines: 22,
      timestamp: "2024-01-15T10:10:00Z",
      duration: "2.7s"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-card-foreground">Scraping History</h1>
          <p className="text-muted-foreground">
            Track all your scraping activities and performance
          </p>
        </div>
        
        <Button className="bg-gradient-primary border-0">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 bg-card/50 backdrop-blur-glass border border-border/50">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by URL or status..."
              className="pl-10"
            />
          </div>
          <select className="px-3 py-2 bg-background border border-border rounded-md text-sm">
            <option>All Status</option>
            <option>Success</option>
            <option>Failed</option>
          </select>
          <select className="px-3 py-2 bg-background border border-border rounded-md text-sm">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      </Card>

      {/* History List */}
      <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <HistoryIcon className="h-5 w-5 text-primary" />
            Recent Activity
          </h3>
          
          <div className="space-y-3">
            {scrapeHistory.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 bg-accent/20 rounded-lg border border-border/30 hover:bg-accent/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(item.status)}
                  <div>
                    <p className="font-medium text-card-foreground">{item.url}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(item.timestamp)}
                      </span>
                      {item.status === "success" && (
                        <span>{item.headlines} headlines found</span>
                      )}
                      <span>Duration: {item.duration}</span>
                    </div>
                    {item.error && (
                      <p className="text-sm text-red-500 mt-1">{item.error}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className={`capitalize ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </Badge>
                  
                  {item.status === "failed" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-primary/10"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-center pt-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <span className="px-4 py-2 text-sm text-muted-foreground">
                Page 1 of 5
              </span>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default History;