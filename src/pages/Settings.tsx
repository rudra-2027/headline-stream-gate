import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Save, Bell, Shield, Database } from "lucide-react";

const Settings = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-card-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Configure your scraping preferences and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scraping Settings */}
        <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              Scraping Configuration
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scrape-interval">Scrape Interval (minutes)</Label>
                <Input
                  id="scrape-interval"
                  type="number"
                  defaultValue="30"
                  min="1"
                  max="1440"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-headlines">Max Headlines per Site</Label>
                <Input
                  id="max-headlines"
                  type="number"
                  defaultValue="50"
                  min="1"
                  max="500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-retry Failed Scrapes</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically retry when scraping fails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email alerts for scraping status
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Failed Scrape Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when scraping fails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Summary</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily report of scraping activity
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Enter current password"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
              
              <Button variant="outline" className="w-full">
                Update Password
              </Button>
            </div>
          </div>
        </Card>

        {/* Database Settings */}
        <Card className="p-6 bg-card/50 backdrop-blur-glass border border-border/50">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Data Management
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-cleanup Old Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Remove headlines older than 90 days
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <select 
                  id="backup-frequency"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              
              <Button variant="outline" className="w-full">
                Export All Data
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-gradient-primary border-0">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;