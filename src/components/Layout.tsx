import { ReactNode } from "react";
import { 
  MessageSquare, 
  BookOpen, 
  FileText, 
  LayoutDashboard, 
  Users, 
  Database,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { cn } from "./ui/utils";

type Screen = 'chat' | 'knowledge' | 'ticket' | 'dashboard' | 'consultant' | 'kb-management';

interface LayoutProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  children: ReactNode;
}

export function Layout({ currentScreen, onNavigate, children }: LayoutProps) {
  const navItems = [
    { id: 'chat' as Screen, name: 'AI Chat', icon: MessageSquare, description: 'Get instant AI assistance' },
    { id: 'knowledge' as Screen, name: 'Knowledge Base', icon: BookOpen, description: 'Search solutions' },
    { id: 'ticket' as Screen, name: 'Create Ticket', icon: FileText, description: 'Submit support ticket' },
    { id: 'dashboard' as Screen, name: 'AI Dashboard', icon: LayoutDashboard, description: 'Monitor AI activity' },
    { id: 'consultant' as Screen, name: 'Consultant View', icon: Users, description: 'Manage tickets' },
    { id: 'kb-management' as Screen, name: 'KB Management', icon: Database, description: 'Admin panel' }
  ];

  const flowPath: Screen[] = ['chat', 'knowledge', 'ticket', 'dashboard', 'consultant', 'kb-management'];
  const currentIndex = flowPath.indexOf(currentScreen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-border shadow-xl z-50">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg">AI Support</h2>
              <p className="text-xs text-muted-foreground">Smart Assistant</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item, idx) => {
            const isActive = currentScreen === item.id;
            const isCompleted = idx < currentIndex;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30" 
                    : "hover:bg-slate-50 text-foreground"
                )}
              >
                {/* Completion indicator */}
                {isCompleted && !isActive && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full" />
                )}
                
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                  isActive 
                    ? "bg-white/20" 
                    : "bg-slate-100 group-hover:bg-slate-200"
                )}>
                  <item.icon className={cn(
                    "w-5 h-5",
                    isActive ? "text-white" : "text-slate-600"
                  )} />
                </div>
                
                <div className="flex-1 text-left">
                  <div className={cn(
                    "text-sm mb-0.5",
                    isActive ? "text-white" : "text-foreground"
                  )}>
                    {item.name}
                  </div>
                  <div className={cn(
                    "text-xs",
                    isActive ? "text-white/80" : "text-muted-foreground"
                  )}>
                    {item.description}
                  </div>
                </div>

                {isActive && (
                  <ChevronRight className="w-4 h-4 text-white" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Flow Progress */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-gradient-to-t from-slate-50">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Flow Progress</span>
              <span className="text-indigo-600">{currentIndex + 1} / {flowPath.length}</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full"
                style={{ width: `${((currentIndex + 1) / flowPath.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {navItems.find(n => n.id === currentScreen)?.description}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 min-h-screen">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 backdrop-blur-lg bg-white/70 border-b border-border/50 shadow-sm">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {navItems.find(n => n.id === currentScreen)?.name}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {navItems.find(n => n.id === currentScreen)?.description}
                </p>
              </div>
              
              {/* Stage Indicator */}
              <div className="flex items-center gap-2">
                {flowPath.map((screen, idx) => (
                  <div key={screen} className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate(screen)}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all",
                        idx <= currentIndex
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                          : "bg-slate-200 text-slate-400"
                      )}
                    >
                      {idx + 1}
                    </button>
                    {idx < flowPath.length - 1 && (
                      <div className={cn(
                        "w-8 h-0.5 rounded-full transition-all",
                        idx < currentIndex 
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                          : "bg-slate-200"
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
