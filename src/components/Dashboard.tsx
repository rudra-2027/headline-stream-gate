import { DashboardHeader } from "@/components/DashboardHeader";
import { StatCard } from "@/components/StatCard";
import { HeadlineCard } from "@/components/HeadlineCard";
import { HeadlinesTable } from "@/components/HeadlinesTable";
import { mockHeadlines, getRecentHeadlines, getStats } from "@/lib/mockData";
import { Newspaper, Globe, TrendingUp, Clock } from "lucide-react";

export const Dashboard = () => {
  const recentHeadlines = getRecentHeadlines(4);
  const stats = getStats();

  return (
    <div className="space-y-8">
        <DashboardHeader />
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Headlines"
            value={stats.totalHeadlines}
            description="Scraped articles"
            icon={Newspaper}
            gradient={true}
          />
          <StatCard
            title="Active Sources"
            value={stats.uniqueSources}
            description="Monitored websites"
            icon={Globe}
          />
          <StatCard
            title="Recent Activity"
            value={stats.recentHeadlines}
            description="Last 24 hours"
            icon={TrendingUp}
          />
          <StatCard
            title="Avg per Hour"
            value={stats.avgPerHour}
            description="Headlines scraped"
            icon={Clock}
          />
        </div>

        {/* Recent Headlines */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Recent Headlines</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentHeadlines.map((headline) => (
              <HeadlineCard key={headline.id} headline={headline} />
            ))}
          </div>
        </div>

        {/* Full Headlines Table */}
        <HeadlinesTable headlines={mockHeadlines} />
    </div>
  );
};