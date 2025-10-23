
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  Image as ImageIcon,
  Bot,
  Send
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface ConsultantViewProps {
  onNavigate: (screen: string) => void;
}

// --- START: Unified StatCard --- //
const colorStyles = {
  blue: { iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  green: { iconBg: 'bg-green-100', iconColor: 'text-green-600' },
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
// --- END: Unified StatCard --- //

export function ConsultantView({ onNavigate }: ConsultantViewProps) {
  const assignedTickets = [
    {
      id: "#4587",
      issue: "Login Failure - Finance Module",
      priority: "Medium",
      status: "Closed",
      time: "2 hours ago",
      user: "John Smith"
    },
    {
      id: "#4593",
      issue: "Permission Denied - HR Module",
      priority: "High",
      status: "Open",
      time: "30 mins ago",
      user: "Sarah Johnson"
    },
    {
      id: "#4595",
      issue: "Slow Report Generation",
      priority: "Low",
      status: "Pending Review",
      time: "5 hours ago",
      user: "Mike Chen"
    }
  ];

  const stats = [
    { title: "Open Tickets", value: "3", icon: Clock, color: "blue" },
    { title: "Resolved Today", value: "8", icon: CheckCircle2, color: "green" },
    { title: "Avg Response", value: "1.8 hrs", icon: AlertCircle, color: "orange" },
    { title: "AI Assists", value: "15", icon: Bot, color: "purple" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Consultant Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your assigned tickets and collaborate with AI
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold">Consultant A</p>
            <p className="text-xs text-muted-foreground">Active since 8:00 AM</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
            CA
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col md:flex-row gap-4">
        {stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Tickets List */}
        <Card className="col-span-2 p-6">
          <Tabs defaultValue="open">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">My Tickets</h3>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="pending">Pending Review</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="open" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.issue}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={`font-semibold ${
                            ticket.priority === 'High' ? 'border-red-500 text-red-600 bg-red-50' :
                            ticket.priority === 'Medium' ? 'border-orange-500 text-orange-600 bg-orange-50' :
                            'border-gray-300 text-gray-600 bg-gray-50'
                          }`}
                        >
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{ticket.user}</TableCell>
                      <TableCell className="text-muted-foreground">{ticket.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="all">
              <p className="text-muted-foreground py-8 text-center">All tickets view...</p>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Ticket Detail */}
        <Card className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold">Ticket #4593</h4>
              <Badge variant="outline" className="border-red-500 text-red-600 bg-red-50 font-semibold">High</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Permission Denied - HR Module</p>
          </div>

          {/* AI Notes */}
          <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-start gap-3 mb-2">
              <Bot className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-sm text-purple-800">AI Suggested Solution</p>
                <p className="text-sm text-purple-700 mt-1">
                  Similar incident resolved in ticket #4201. User role permissions need to be refreshed in the HR module.
                </p>
                <Button variant="link" size="sm" className="p-0 h-auto text-purple-600 mt-2">View Similar Cases</Button>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">User:</span>
              <span className="font-medium">Sarah Johnson</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Module:</span>
              <span className="font-medium">HR Module</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reported:</span>
              <span className="font-medium">30 mins ago</span>
            </div>
          </div>

          {/* Attachments */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Attachments</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-gray-100 rounded border border-gray-200 cursor-pointer hover:bg-gray-200">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm flex-1 font-medium text-gray-800">screenshot.png</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-100 rounded border border-gray-200 cursor-pointer hover:bg-gray-200">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm flex-1 font-medium text-gray-800">error_log.txt</span>
              </div>
            </div>
          </div>

          {/* Resolution */}
          <div className="space-y-3 pt-2 border-t">
            <Label htmlFor="resolution-text" className="text-sm font-medium">Add Resolution</Label>
            <Textarea 
              id="resolution-text"
              placeholder="Describe the resolution steps..."
              rows={4}
            />
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Resolution
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Update Knowledge Base?</AlertDialogTitle>
                  <AlertDialogDescription>
                    The AI Agent suggests adding this resolution to the knowledge base to help resolve similar issues automatically in the future.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Edit First</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onNavigate('kb-management')}>
                    Confirm & Add to KB
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      </div>
    </div>
  );
}
