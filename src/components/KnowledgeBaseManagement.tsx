
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
  PlusCircle,
  ShieldCheck
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { knowledgeBase as initialKb, KBArticle } from "../data/knowledge-base";

interface KnowledgeBaseManagementProps {
  onNavigate: (screen: string) => void;
}

// --- START: Unified StatCard --- //
const colorStyles = {
  blue: { iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  purple: { iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  green: { iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  orange: { iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
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

const KBTableRow = ({ entry, onAction }: { entry: KBArticle, onAction: (action: string, id: number) => void}) => (
    <TableRow key={entry.id} className="hover:bg-slate-50">
        <TableCell className="font-medium">{entry.title}</TableCell>
        <TableCell><Badge variant="outline">{entry.module}</Badge></TableCell>
        <TableCell>
            <div className="flex items-center gap-2">
                {entry.addedBy === 'AI Agent' ? (
                    <Bot className="w-4 h-4 text-purple-500" />
                ) : (
                    <User className="w-4 h-4 text-blue-500" />
                )}
                <span className="text-sm">{entry.addedBy}</span>
            </div>
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">{entry.lastUpdated}</TableCell>
        <TableCell>
            {entry.verified ? (
                <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs">Verified</span>
                </div>
            ) : (
                <div className="flex items-center gap-1 text-orange-600">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs">Pending</span>
                </div>
            )}
        </TableCell>
        <TableCell className="text-right">
            <Button variant="ghost" size="icon" onClick={() => onAction('Edit', entry.id)}>
                <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onAction('Delete', entry.id)}>
                <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
        </TableCell>
  </TableRow>
)

export function KnowledgeBaseManagement({ onNavigate }: KnowledgeBaseManagementProps) {
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [kbEntries, setKbEntries] = useState<KBArticle[]>(initialKb);

  const stats = [
    { title: "Total Entries", value: kbEntries.length, icon: FileText, color: "blue" },
    { title: "AI Contributions", value: kbEntries.filter(e => e.addedBy === 'AI Agent').length, icon: Bot, color: "purple" },
    { title: "Verified Articles", value: kbEntries.filter(e => e.verified).length, icon: CheckCircle2, color: "green" },
    { title: "Pending Review", value: kbEntries.filter(e => !e.verified).length, icon: ShieldCheck, color: "orange" }
  ];

  const handleAction = (action: string, articleId: number) => {
    const article = kbEntries.find(a => a.id === articleId)?.title || "this article";
    alert(`${action} action triggered for "${article}".`);
    
    if (action === 'Delete') {
      if (confirm(`Are you sure you want to delete "${article}"?`)) {
        setKbEntries(prev => prev.filter(a => a.id !== articleId));
      }
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Article saved! This would normally update the central data source.");
    setIsAddingArticle(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Knowledge Base Management</h2>
          <Button onClick={() => onNavigate('dashboard')}>Back to Dashboard</Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        {stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
      </div>

      <Card className="p-6 bg-white shadow-sm">
        {isAddingArticle ? (
          <div>
            <h3 className="text-xl font-semibold mb-6">Add New Article</h3>
            <form onSubmit={handleSaveArticle} className="space-y-4">
                <Input id="title" placeholder="Enter the article title" />
                <div className="grid grid-cols-2 gap-4">
                    <Select><SelectTrigger><SelectValue placeholder="Select a module" /></SelectTrigger><SelectContent>{[...new Set(kbEntries.map(e => e.module))].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select>
                    <Select><SelectTrigger><SelectValue placeholder="Select a content type" /></SelectTrigger><SelectContent><SelectItem value="article">Article</SelectItem><SelectItem value="video">Video</SelectItem><SelectItem value="wiki">Wiki</SelectItem></SelectContent></Select>
                </div>
                <Textarea id="content" placeholder="Enter the article content, description, or video link..." rows={8} />
                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" type="button" onClick={() => setIsAddingArticle(false)}>Cancel</Button>
                    <Button type="submit">Save Article</Button>
                </div>
            </form>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold">Knowledge Base Entries</h3>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search by title or module..." className="pl-10" />
                    </div>
                </div>
              <TabsList>
                <TabsTrigger value="all">All Entries</TabsTrigger>
                <TabsTrigger value="ai">AI-Sourced</TabsTrigger>
                <TabsTrigger value="manual">Manual</TabsTrigger>
              </TabsList>
            </div>

             <div className="flex items-center justify-end mb-6">
              <Button onClick={() => setIsAddingArticle(true)}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add New Article
              </Button>
            </div>

            <TabsContent value="all">
                <Table>
                    <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Module</TableHead><TableHead>Source</TableHead><TableHead>Last Updated</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>{kbEntries.map((entry) => <KBTableRow key={entry.id} entry={entry} onAction={handleAction} />)}</TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="ai">
                <Table>
                    <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Module</TableHead><TableHead>Source</TableHead><TableHead>Last Updated</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>{kbEntries.filter(e => e.addedBy === 'AI Agent').map((entry) => <KBTableRow key={entry.id} entry={entry} onAction={handleAction} />)}</TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="manual">
                <Table>
                    <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Module</TableHead><TableHead>Source</TableHead><TableHead>Last Updated</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>{kbEntries.filter(e => e.addedBy !== 'AI Agent').map((entry) => <KBTableRow key={entry.id} entry={entry} onAction={handleAction} />)}</TableBody>
                </Table>
            </TabsContent>
          </Tabs>
        )}
      </Card>
    </div>
  );
}
