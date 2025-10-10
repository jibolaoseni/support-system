
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, FileText, Video, Globe, ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { knowledgeBase, KBArticle } from "../data/knowledge-base"; // Using the central data source

interface KnowledgeBaseProps {
  onNavigate: (screen: string) => void;
}

const ArticleCard = ({ article, onOpen }: { article: KBArticle, onOpen: (title: string) => void }) => (
  <Card className="p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-semibold">{article.title}</h3>
          {/* Example of a badge, can be driven by data later */}
          {article.tags.includes("AI Recommended") && (
            <Badge className="bg-blue-500">AI Recommended</Badge>
          )}
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-2">{article.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {/* Dummy data for now, can be added to KB */}
            <span>{4.8}</span> 
          </div>
          <span>•</span>
          <span>{article.views || 0} views</span>
          <span>•</span>
          <Badge variant="outline">{article.module}</Badge>
        </div>
      </div>
      <Button className="rounded-full" onClick={() => onOpen(article.title)}>Open</Button>
    </div>
  </Card>
);

export function KnowledgeBase({ onNavigate }: KnowledgeBaseProps) {

  // Filter articles based on their type from the central knowledge base
  const documents = knowledgeBase.filter(a => a.type === 'article');
  const videos = knowledgeBase.filter(a => a.type === 'video');
  const wikis = knowledgeBase.filter(a => a.type === 'wiki');

  // Use some articles as recommended for demonstration
  const recommended = knowledgeBase.slice(0, 3);

  const handleOpenArticle = (title: string) => {
    alert(`Navigating to article: "${title}"`);
    // In a real app, you would navigate to a detailed view:
    // onNavigate('article-detail', { articleTitle: title });
  };

  return (
    <div className="flex h-full gap-6">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search knowledge base with AI-powered suggestions..." 
              className="pl-12 h-12 rounded-xl bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="documents" className="flex-1 flex flex-col">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="documents">
              <FileText className="w-4 h-4 mr-2" />
              Documents ({documents.length})
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="w-4 h-4 mr-2" />
              Videos ({videos.length})
            </TabsTrigger>
            <TabsTrigger value="wiki">
              <Globe className="w-4 h-4 mr-2" />
              Wiki ({wikis.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="flex-1 space-y-4">
            {documents.length > 0 ? (
              documents.map((article) => (
                <ArticleCard key={article.id} article={article} onOpen={handleOpenArticle} />
              ))
            ) : (
              <Card className="p-6 text-center text-muted-foreground">No documents found.</Card>
            )}
          </TabsContent>

          <TabsContent value="videos" className="flex-1 space-y-4">
            {videos.length > 0 ? (
              videos.map((article) => (
                <ArticleCard key={article.id} article={article} onOpen={handleOpenArticle} />
              ))
            ) : (
              <Card className="p-6 text-center text-muted-foreground">No videos found.</Card>
            )}
          </TabsContent>

          <TabsContent value="wiki" className="flex-1 space-y-4">
            {wikis.length > 0 ? (
              wikis.map((article) => (
                <ArticleCard key={article.id} article={article} onOpen={handleOpenArticle} />
              ))
            ) : (
              <Card className="p-6 text-center text-muted-foreground">No wiki entries found.</Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Feedback Section */}
        <Card className="p-6 mt-6 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Did this solve your problem?</h4>
              <p className="text-sm text-muted-foreground">Your feedback helps us improve our support.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full bg-white hover:bg-slate-50">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Yes
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full bg-white hover:bg-slate-50"
                onClick={() => onNavigate('ticket')} // Navigate to ticket creation
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                No, Create Ticket
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="w-80 flex-shrink-0">
        <Card className="p-4 bg-white shadow-sm">
          <h4 className="mb-4 font-semibold px-2">AI Recommended</h4>
          <div className="space-y-2">
            {recommended.map((rec) => (
              <div 
                key={rec.id}
                className="p-3 rounded-lg border border-transparent hover:border-border hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => handleOpenArticle(rec.title)}
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-slate-800">{rec.title}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
