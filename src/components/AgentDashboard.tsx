
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  Bot, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Activity,
  ArrowRight,
  FileText,
  ShieldCheck,
  User
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { knowledgeBase } from "../data/knowledge-base";

interface AgentDashboardProps {
  onNavigate: (screen: string) => void;
}

// --- Unified StatCard Design ---
const colorStyles = {
  green: { iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  blue: { iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  orange: { iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  purple: { iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
};

const StatCard = ({ title, value, icon: Icon, color }) => {
    const styles = colorStyles[color];
    return (
        <Card className="p-4 flex-1 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${styles.iconColor}`} />
            </div>
            <div>
                <p className="text-muted-foreground text-sm">{title}</p>
                <h3 className="text-xl font-bold text-slate-800">{value}</h3>
            </div>
          </div>
        </Card>
    );
};

const mockTickets = [
    { id: "#4592", issue: "Report Timeout", module: "Analytics", assignedTo: "AI Agent", status: "In Progress", aiFollowUp: "monitoring" },
    { id: "#4593", issue: "Permission Denied", module: "HR Module", assignedTo: "Consultant B", status: "Pending", aiFollowUp: "waiting" },
    { id: "#4594", issue: "Data Export Failed", module: "Platform", assignedTo: "AI Agent", status: "Auto-Resolved", aiFollowUp: "complete" },
    { id: "#4587", issue: "Login Failure", module: "Finance", assignedTo: "Consultant A", status: "Closed", aiFollowUp: "complete" },
];

export function AgentDashboard({ onNavigate }: AgentDashboardProps) {
    const kbSize = knowledgeBase.length;
    const aiContributions = knowledgeBase.filter(a => a.addedBy === "AI Agent").length;
    const pendingVerification = knowledgeBase.filter(a => !a.verified).length;
    const resolutionRate = 82;

    const stats = [
        { title: "Auto-Resolution", value: `${resolutionRate}%`, icon: TrendingUp, color: "green" },
        { title: "KB Size", value: kbSize, icon: FileText, color: "blue" },
        { title: "Pending Review", value: pendingVerification, icon: ShieldCheck, color: "orange" },
        { title: "Avg. Resolution", value: "1.8h", icon: Clock, color: "purple" },
    ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-bold">AI Agent Dashboard</h2>
            <p className="text-muted-foreground">Real-time monitoring and intelligent ticket management</p>
        </div>
        <Button onClick={() => onNavigate('kb-management')}>Manage Knowledge Base</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
      </div>

      <div className="space-y-6">
        <Card className="p-6 shadow-sm border-border bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Recent Support Tickets</h3>
            <Button variant="outline" size="sm" onClick={() => alert("Navigating to ticket queue.")}>View All</Button>
          </div>
          <Table>
            <TableHeader><TableRow><TableHead>Ticket</TableHead><TableHead>Issue</TableHead><TableHead>Assigned To</TableHead><TableHead className="text-center">Status</TableHead><TableHead className="text-center">AI Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {mockTickets.map((ticket) => (
                <TableRow key={ticket.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell><div>{ticket.issue}<div className="text-xs text-muted-foreground">{ticket.module}</div></div></TableCell>
                  <TableCell><div className="flex items-center gap-2">{ticket.assignedTo.includes('AI') ? <Bot className="w-4 h-4 text-purple-500" /> : <User className="w-4 h-4 text-blue-500" />}<span>{ticket.assignedTo}</span></div></TableCell>
                  <TableCell className="text-center"><Badge className={ticket.status === 'Closed' || ticket.status === 'Auto-Resolved' ? 'bg-green-100 text-green-800' : ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}>{ticket.status}</Badge></TableCell>
                  <TableCell className="text-center">{ticket.aiFollowUp === 'complete' ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : ticket.aiFollowUp === 'monitoring' ? <Activity className="w-5 h-5 text-blue-500 mx-auto animate-pulse" /> : <Clock className="w-5 h-5 text-orange-500 mx-auto" />}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 shadow-sm border-border bg-white">
                <h4 className="font-semibold mb-4">Recent KB Additions</h4>
                <div className="space-y-3">
                {knowledgeBase.slice(0, 3).map((article) => (
                    <div key={article.id} className="p-3 rounded-lg border bg-slate-50 hover:bg-slate-100 cursor-pointer" onClick={() => alert(`Opening article: ${article.title}`)}>
                        <p className="font-medium text-sm text-slate-800">{article.title}</p>
                        <div className="flex items-center justify-between mt-1"><Badge variant="outline">{article.module}</Badge><span className="text-xs text-muted-foreground">{article.lastUpdated}</span></div>
                    </div>
                ))}
                </div>
            </Card>

            {/* --- START: Standardized AI Metrics Card --- */}
            <Card className="p-6 shadow-sm border-border bg-white">
                <h4 className="font-semibold mb-4">AI Learning & Performance</h4>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Resolution Accuracy</span>
                        <span className="font-medium">94%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Routing Precision</span>
                        <span className="font-medium">89%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">New KB Articles Created</span>
                        <span className="font-medium">{aiContributions}</span>
                    </div>
                    <div className="pt-2">
                        <Button variant="link" size="sm" className="p-0 h-auto text-indigo-600" onClick={() => onNavigate('analytics')}><ArrowRight className="w-4 h-4 mr-1" />View Detailed Analytics</Button>
                    </div>
                </div>
            </Card>
            {/* --- END: Standardized AI Metrics Card --- */}
        </div>
      </div>
    </div>
  );
}
