import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  gradient?: boolean;
}

export const StatCard = ({ title, value, description, icon: Icon, gradient = false }: StatCardProps) => {
  return (
    <Card className={`p-6 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 border border-border/50 ${
      gradient ? 'bg-gradient-primary text-primary-foreground' : 'bg-card/50 backdrop-blur-glass'
    }`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className={`text-sm font-medium ${gradient ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {title}
          </p>
          <p className="text-3xl font-bold">{value}</p>
          {description && (
            <p className={`text-sm ${gradient ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
              {description}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${gradient ? 'bg-white/10' : 'bg-primary/10'}`}>
          <Icon className={`h-6 w-6 ${gradient ? 'text-white' : 'text-primary'}`} />
        </div>
      </div>
    </Card>
  );
};