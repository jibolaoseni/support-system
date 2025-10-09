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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Consultant Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your assigned tickets and collaborate with AI
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm">Consultant A</p>
            <p className="text-xs text-muted-foreground">Active since 8:00 AM</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            CA
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Open Tickets</p>
              <h3>3</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Resolved Today</p>
              <h3>8</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Avg Response</p>
              <h3>1.8 hrs</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">AI Assists</p>
              <h3>15</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Tickets List */}
        <Card className="col-span-2 p-6">
          <Tabs defaultValue="open">
            <div className="flex items-center justify-between mb-4">
              <h3>My Tickets</h3>
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
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.issue}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={
                            ticket.priority === 'High' ? 'border-red-500 text-red-600' :
                            ticket.priority === 'Medium' ? 'border-orange-500 text-orange-600' :
                            'border-green-500 text-green-600'
                          }
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
              <h4>Ticket #4593</h4>
              <Badge variant="outline" className="border-red-500 text-red-600">High</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Permission Denied - HR Module</p>
          </div>

          {/* AI Notes */}
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2 mb-2">
              <Bot className="w-4 h-4 text-blue-600 mt-0.5" />
              <p className="text-sm">AI Notes</p>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Similar incident resolved in ticket #4201. User role permissions need to be refreshed in the HR module.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Similar Cases
            </Button>
          </div>

          {/* User Info */}
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">User:</span>
              <span>Sarah Johnson</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Module:</span>
              <span>HR Module</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reported:</span>
              <span>30 mins ago</span>
            </div>
          </div>

          {/* Attachments */}
          <div className="mb-4">
            <p className="text-sm mb-2">Attachments</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-border">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm flex-1">screenshot.png</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-border">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm flex-1">error_log.txt</span>
              </div>
            </div>
          </div>

          {/* Resolution */}
          <div className="space-y-3">
            <p className="text-sm">Add Resolution</p>
            <Textarea 
              placeholder="Describe the resolution steps..."
              rows={4}
            />
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full">
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
