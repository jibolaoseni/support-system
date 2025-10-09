import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, FileText, Video, Globe, ThumbsUp, ThumbsDown, Star } from "lucide-react";

interface KnowledgeBaseProps {
  onNavigate: (screen: string) => void;
}

export function KnowledgeBase({ onNavigate }: KnowledgeBaseProps) {
  const articles = [
    {
      id: 1,
      title: "Resolving Login Failure in Finance Module",
      summary: "Step-by-step guide to fix authentication issues in the Finance module including token refresh and cache clearing.",
      category: "Authentication",
      type: "article",
      rating: 4.8,
      views: 1243
    },
    {
      id: 2,
      title: "Updating Authentication Token",
      summary: "Video walkthrough showing how to manually update authentication tokens when automatic refresh fails.",
      category: "Authentication",
      type: "video",
      rating: 4.6,
      views: 892
    },
    {
      id: 3,
      title: "Common Credential Errors",
      summary: "Wiki documentation covering the most frequent credential-related errors and their solutions.",
      category: "Troubleshooting",
      type: "wiki",
      rating: 4.9,
      views: 2156
    }
  ];

  const recommended = [
    "Session Timeout Configuration",
    "Password Reset Best Practices",
    "Multi-Factor Authentication Setup"
  ];

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
              className="pl-12 h-12 rounded-xl"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="documents" className="flex-1 flex flex-col">
          <TabsList className="mb-6">
            <TabsTrigger value="documents">
              <FileText className="w-4 h-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="wiki">
              <Globe className="w-4 h-4 mr-2" />
              Wiki
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="flex-1 space-y-4">
            {articles.map((article) => (
              <Card key={article.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3>{article.title}</h3>
                      {article.id === 1 && (
                        <Badge className="bg-blue-500">AI Recommended</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">{article.summary}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{article.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{article.views} views</span>
                      <span>•</span>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                  </div>
                  <Button className="rounded-full">Open Article</Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="videos" className="flex-1">
            <Card className="p-6">
              <p className="text-muted-foreground">Video tutorials will appear here...</p>
            </Card>
          </TabsContent>

          <TabsContent value="wiki" className="flex-1">
            <Card className="p-6">
              <p className="text-muted-foreground">Wiki articles will appear here...</p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Feedback Section */}
        <Card className="p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4>Did this solve your problem?</h4>
              <p className="text-muted-foreground">Your feedback helps us improve</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Yes
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full"
                onClick={() => onNavigate('ticket')}
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                No, Create Ticket
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="w-80">
        <Card className="p-4">
          <h4 className="mb-4">AI Recommended Articles</h4>
          <div className="space-y-3">
            {recommended.map((title, idx) => (
              <div 
                key={idx}
                className="p-3 bg-gray-50 rounded-lg border border-border hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{title}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
