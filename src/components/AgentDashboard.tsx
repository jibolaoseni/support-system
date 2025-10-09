import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  Bot, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Activity,
  ArrowRight
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface AgentDashboardProps {
  onNavigate: (screen: string) => void;
}

export function AgentDashboard({ onNavigate }: AgentDashboardProps) {
  const tickets = [
    {
      id: "#4587",
      issue: "Login Failure - Finance Module",
      assignedTo: "Consultant A",
      status: "Closed",
      aiFollowUp: "complete",
      resolvedTime: "1.5 hrs"
    },
    {
      id: "#4592",
      issue: "Report Timeout - Analytics",
      assignedTo: "AI Agent",
      status: "In Progress",
      aiFollowUp: "monitoring",
      resolvedTime: "-"
    },
    {
      id: "#4593",
      issue: "Permission Denied - HR Module",
      assignedTo: "Consultant B",
      status: "Pending Review",
      aiFollowUp: "waiting",
      resolvedTime: "-"
    },
    {
      id: "#4594",
      issue: "Data Export Failed",
      assignedTo: "AI Agent",
      status: "Auto-Resolved",
      aiFollowUp: "complete",
      resolvedTime: "0.3 hrs"
    }
  ];

  const timeline = [
    { action: "AI created ticket #4592", time: "2 mins ago", type: "create" },
    { action: "AI routed ticket to Consultant A", time: "15 mins ago", type: "route" },
    { action: "Consultant added resolution", time: "1 hour ago", type: "resolve" },
    { action: "AI updated KB entry", time: "1 hour ago", type: "learn" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>AI Agent Dashboard</h2>
        <p className="text-muted-foreground">
          Real-time monitoring and intelligent ticket management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-green-700">Auto-Resolved</span>
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-md">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">78%</h2>
            <Progress value={78} className="h-2" />
            <p className="text-xs text-green-600">+12% from last month</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-700">Active Tickets</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-md">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <h2 className="text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">12</h2>
          <p className="text-xs text-blue-600 mt-2">3 assigned to consultants</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-orange-700">Avg Resolution Time</span>
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-md">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
          <h2 className="text-3xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">2.1 hrs</h2>
          <p className="text-xs text-orange-600 mt-2">-0.4 hrs improvement</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-purple-700">KB Updates</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shadow-md">
              <Activity className="w-5 h-5 text-white" />
            </div>
          </div>
          <h2 className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">24</h2>
          <p className="text-xs text-purple-600 mt-2">This week</p>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Tickets Table */}
        <Card className="col-span-2 p-6 shadow-lg border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Ticket Monitoring</h3>
            <Button variant="outline" size="sm" onClick={() => onNavigate('consultant')} className="hover:bg-indigo-50 hover:border-indigo-300">
              View Consultant Dashboard
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>AI Follow-up</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.issue}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {ticket.assignedTo.includes('AI') && (
                        <Bot className="w-4 h-4 text-blue-500" />
                      )}
                      <span>{ticket.assignedTo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={ticket.status === 'Closed' || ticket.status === 'Auto-Resolved' ? 'default' : 'secondary'}
                      className={
                        ticket.status === 'Closed' || ticket.status === 'Auto-Resolved' 
                          ? 'bg-green-500' 
                          : ticket.status === 'In Progress' 
                          ? 'bg-blue-500' 
                          : ''
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {ticket.aiFollowUp === 'complete' && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    {ticket.aiFollowUp === 'monitoring' && (
                      <Activity className="w-5 h-5 text-blue-500 animate-pulse" />
                    )}
                    {ticket.aiFollowUp === 'waiting' && (
                      <Clock className="w-5 h-5 text-orange-500" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Timeline & Learning */}
        <div className="space-y-6">
          {/* AI Activity Timeline */}
          <Card className="p-6 shadow-lg border-slate-200">
            <h4 className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Agent Activity</h4>
            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.type === 'create' ? 'bg-blue-100' :
                      item.type === 'route' ? 'bg-purple-100' :
                      item.type === 'resolve' ? 'bg-green-100' :
                      'bg-orange-100'
                    }`}>
                      <Bot className={`w-4 h-4 ${
                        item.type === 'create' ? 'text-blue-600' :
                        item.type === 'route' ? 'text-purple-600' :
                        item.type === 'resolve' ? 'text-green-600' :
                        'text-orange-600'
                      }`} />
                    </div>
                    {idx < timeline.length - 1 && (
                      <div className="absolute top-8 left-4 w-px h-6 bg-border"></div>
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm">{item.action}</p>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Learning Curve */}
          <Card className="p-6 shadow-lg border-slate-200 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
            <h4 className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Learning Curve</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Auto-Resolution Accuracy</span>
                  <span className="text-sm">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Routing Precision</span>
                  <span className="text-sm">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">KB Match Quality</span>
                  <span className="text-sm">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2"
                onClick={() => onNavigate('kb-management')}
              >
                View KB Updates
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
