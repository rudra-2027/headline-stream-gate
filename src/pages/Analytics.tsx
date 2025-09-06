import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { getStats } from "@/lib/mockData";
import { TrendingUp, Globe, Clock, Newspaper, Activity, Target } from "lucide-react";

const Analytics = () => {
  const stats = getStats();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-card-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights into your scraping performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Headlines"
          value={stats.totalHeadlines}
          description="All time scraped"
          icon={Newspaper}
          gradient={true}
        />
        <StatCard
          title="Success Rate"
          value="98.5%"
          description="Scraping efficiency"
          icon={Target}
        />
        <StatCard
          title="Avg Response Time"
          value="1.2s"
          description="Per scrape request"
          icon={Clock}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Scraping Trends
            </h3>
            <div className="h-64 flex items-center justify-center bg-accent/20 rounded-lg">
              <p className="text-muted-foreground">Chart will be implemented with real data</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Source Distribution
            </h3>
            <div className="h-64 flex items-center justify-center bg-accent/20 rounded-lg">
              <p className="text-muted-foreground">Source breakdown chart</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Performance Overview
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-accent/20 rounded-lg">
              <p className="text-2xl font-bold text-card-foreground">247</p>
              <p className="text-sm text-muted-foreground">Headlines Today</p>
            </div>
            <div className="text-center p-4 bg-accent/20 rounded-lg">
              <p className="text-2xl font-bold text-card-foreground">1,834</p>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>
            <div className="text-center p-4 bg-accent/20 rounded-lg">
              <p className="text-2xl font-bold text-card-foreground">7,291</p>
              <p className="text-sm text-muted-foreground">This Month</p>
            </div>
            <div className="text-center p-4 bg-accent/20 rounded-lg">
              <p className="text-2xl font-bold text-card-foreground">23,847</p>
              <p className="text-sm text-muted-foreground">All Time</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;