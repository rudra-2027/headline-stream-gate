import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, RefreshCw, Settings } from "lucide-react";
import bannerImage from "@/assets/dashboard-banner.jpg";

export const DashboardHeader = () => {
  return (
    <Card className="relative overflow-hidden bg-gradient-primary border-0 shadow-elegant">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="relative p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary-foreground">
              Static Stream Gateway
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Real-time headline scraping and analysis dashboard
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2 text-primary-foreground/70">
          <Activity className="h-4 w-4" />
          <span className="text-sm">System operational • Last update: 2 minutes ago</span>
        </div>
      </div>
    </Card>
  );
};