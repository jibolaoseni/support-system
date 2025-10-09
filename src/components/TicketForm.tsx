import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Upload, Lightbulb, CheckCircle2 } from "lucide-react";

interface TicketFormProps {
  onNavigate: (screen: string) => void;
}

export function TicketForm({ onNavigate }: TicketFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('dashboard');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 shadow-md">
        <h2 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Create Support Ticket</h2>
        <p className="text-muted-foreground">
          Our AI assistant will help standardize your ticket for faster resolution
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="col-span-2 space-y-6">
          <Card className="p-6 shadow-lg border-slate-200">
            <h3 className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Ticket Details</h3>
            
            <div className="space-y-4">
              {/* Auto-filled Section */}
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 shadow-sm">
                <div className="flex items-start gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm mb-2">Auto-filled by AI Assistant</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2">
                        <span className="text-muted-foreground min-w-24">Issue Summary:</span>
                        <span>Login Failure - Finance Module</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-muted-foreground min-w-24">System Module:</span>
                        <span>Finance</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-muted-foreground min-w-24">User ID:</span>
                        <span>USR-24891</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module Selection */}
              <div className="space-y-2">
                <Label>Affected Module</Label>
                <Select defaultValue="finance">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="finance">Finance Module</SelectItem>
                    <SelectItem value="hr">HR Module</SelectItem>
                    <SelectItem value="inventory">Inventory Module</SelectItem>
                    <SelectItem value="reporting">Reporting Module</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>What were you doing when the error occurred?</Label>
                <Textarea 
                  placeholder="Describe the steps that led to this issue..."
                  rows={4}
                  defaultValue="I was trying to access the monthly financial reports when the login screen appeared unexpectedly."
                />
              </div>

              {/* Steps Tried */}
              <div className="space-y-2">
                <Label>Steps Already Tried</Label>
                <Textarea 
                  placeholder="What have you already attempted to resolve this?"
                  rows={3}
                  defaultValue="Cleared browser cache, tried different browser, restarted computer"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label>Upload Screenshot (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG or PDF (max. 10MB)
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg">
              Submit Ticket
            </Button>
            <Button type="button" variant="outline" className="hover:bg-indigo-50">
              Save Draft
            </Button>
          </div>
        </form>

        {/* AI Insights Sidebar */}
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-lg">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                <Lightbulb className="w-5 h-5 text-white flex-shrink-0" />
              </div>
              <h4 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Insight</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="mb-1">Similar Incident Found:</p>
                <div className="p-3 bg-white rounded-lg">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ticket ID:</span>
                      <span>#4587</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resolved by:</span>
                      <span>Consultant A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resolution Time:</span>
                      <span>1.5 hrs</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2">Suggested Resolution:</p>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm">Reset user session token and clear application cache</p>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => onNavigate('knowledge')}
              >
                View Similar Cases
              </Button>
            </div>
          </Card>

          <Card className="p-6 shadow-lg border-slate-200">
            <h4 className="mb-3">Ticket Priority</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <span className="text-sm">Low</span>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 border border-blue-200">
                <span className="text-sm">Medium</span>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <span className="text-sm">High</span>
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
