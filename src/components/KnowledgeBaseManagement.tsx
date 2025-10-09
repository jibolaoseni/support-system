
import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Bot, 
  User, 
  CheckCircle2, 
  Edit, 
  Trash2,
  Search,
  TrendingUp,
  FileText,
  Filter,
  PlusCircle
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";

interface KnowledgeBaseManagementProps {
  onNavigate: (screen: string) => void;
}

export function KnowledgeBaseManagement({ onNavigate }: KnowledgeBaseManagementProps) {
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const kbEntries = [
    {
      id: 1,
      title: "Report Timeout Resolution - Analytics Module",
      lastUpdated: "2 hours ago",
      addedBy: "AI Agent",
      category: "Performance",
      verified: true,
      isNew: true,
      views: 12
    },
    {
      id: 2,
      title: "Resolving Login Failure in Finance Module",
      lastUpdated: "1 day ago",
      addedBy: "Consultant A",
      category: "Authentication",
      verified: true,
      isNew: false,
      views: 1243
    },
    {
      id: 3,
      title: "Permission Denied - HR Module Fix",
      lastUpdated: "3 hours ago",
      addedBy: "Consultant B",
      category: "Authorization",
      verified: false,
      isNew: true,
      views: 8
    },
    {
      id: 4,
      title: "Data Export Optimization Steps",
      lastUpdated: "2 days ago",
      addedBy: "AI Agent",
      category: "Data Management",
      verified: true,
      isNew: false,
      views: 456
    },
    {
      id: 5,
      title: "Session Timeout Configuration Guide",
      lastUpdated: "5 days ago",
      addedBy: "Admin",
      category: "Configuration",
      verified: true,
      isNew: false,
      views: 892
    }
  ];

  const stats = [
    { label: "Total Entries", value: "247", change: "+24 this week", icon: FileText, color: "blue" },
    { label: "AI Contributions", value: "156", change: "63% of total", icon: Bot, color: "purple" },
    { label: "Auto-Resolved Issues", value: "78%", change: "+12% this month", icon: TrendingUp, color: "green" },
    { label: "Pending Review", value: "3", change: "Needs verification", icon: CheckCircle2, color: "orange" }
  ];

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle the form submission here, 
    // sending the data to a backend or updating your state management.
    console.log("Article saved!");
    setIsAddingArticle(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Knowledge Base Management</h2>
          <p className="text-muted-foreground">
            AI-powered knowledge management and continuous learning system
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button onClick={() => onNavigate('chat')}>
            Back to Chat
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <h2>{stat.value}</h2>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2 p-6">
          {isAddingArticle ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Add New Knowledge Base Article</h3>
              <form onSubmit={handleSaveArticle} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter the article title" />
                </div>
                <div>
                  <Label htmlFor="module">Module</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a module" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance Module</SelectItem>
                      <SelectItem value="hr">HR Management</SelectItem>
                      <SelectItem value="inventory">Inventory System</SelectItem>
                      <SelectItem value="sales">Sales Dashboard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="docx">DOCX</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" placeholder="Enter the article content" rows={10} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingArticle(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Article</Button>
                </div>
              </form>
            </div>
          ) : (
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between mb-6">
                <h3>Knowledge Base Entries</h3>
                <Button onClick={() => setIsAddingArticle(true)}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add New Article
                </Button>
              </div>

              {/* Search and Tabs */}
              <div className="flex justify-between mb-6">
                <div className="relative w-1/2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search knowledge base entries..." 
                    className="pl-10"
                  />
                </div>
                <TabsList>
                  <TabsTrigger value="all">All Entries</TabsTrigger>
                  <TabsTrigger value="ai">AI Updates</TabsTrigger>
                  <TabsTrigger value="manual">Manual Updates</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Issue Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Added By</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kbEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {entry.isNew && (
                              <Badge className="bg-green-500">New</Badge>
                            )}
                            <span>{entry.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{entry.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {entry.addedBy.includes('AI') ? (
                              <Bot className="w-4 h-4 text-purple-500" />
                            ) : (
                              <User className="w-4 h-4 text-blue-500" />
                            )}
                            <span className="text-sm">{entry.addedBy}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {entry.lastUpdated}
                        </TableCell>
                        <TableCell>
                          {entry.verified ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-xs">Verified</span>
                            </div>
                          ) : (
                            <Badge variant="outline" className="border-orange-500 text-orange-600">
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="ai">
                <div className="p-8 text-center text-muted-foreground">
                  Showing AI-generated entries only...
                </div>
              </TabsContent>

              <TabsContent value="manual">
                <div className="p-8 text-center text-muted-foreground">
                  Showing manually created entries only...
                </div>
              </TabsContent>
            </Tabs>
          )}
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Latest AI Update Highlight */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4>Latest AI Update</h4>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm mb-2">New Entry Added:</p>
                <p className="text-sm">
                  <strong>Report Timeout Resolution</strong>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Analytics Module - Performance
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Source Ticket:</span>
                  <span>#4592</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resolution By:</span>
                  <span>AI Agent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confidence:</span>
                  <span className="text-green-600">95%</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Approve Entry
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Edit First
                </Button>
              </div>
            </div>
          </Card>

          {/* KB Growth Chart */}
          <Card className="p-6">
            <h4 className="mb-4">KB Growth Over Time</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">This Week</span>
                  <span>+24 entries</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Week</span>
                  <span>+18 entries</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">2 Weeks Ago</span>
                  <span>+15 entries</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-300" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card className="p-6">
            <h4 className="mb-4">Performance Metrics</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Most Common Query:</span>
                <span>Login Issues</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Top Category:</span>
                <span>Authentication</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. Views/Entry:</span>
                <span>342</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Success Rate:</span>
                <span className="text-green-600">94%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
