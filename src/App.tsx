import { useState } from "react";
import { ChatInterface } from "./components/ChatInterface";
import { KnowledgeBase } from "./components/KnowledgeBase";
import { TicketForm } from "./components/TicketForm";
import { AgentDashboard } from "./components/AgentDashboard";
import { ConsultantView } from "./components/ConsultantView";
import { KnowledgeBaseManagement } from "./components/KnowledgeBaseManagement";
import { Layout } from "./components/Layout";

type Screen = 'chat' | 'knowledge' | 'ticket' | 'dashboard' | 'consultant' | 'kb-management';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('chat');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'chat':
        return <ChatInterface onNavigate={setCurrentScreen} />;
      case 'knowledge':
        return <KnowledgeBase onNavigate={setCurrentScreen} />;
      case 'ticket':
        return <TicketForm onNavigate={setCurrentScreen} />;
      case 'dashboard':
        return <AgentDashboard onNavigate={setCurrentScreen} />;
      case 'consultant':
        return <ConsultantView onNavigate={setCurrentScreen} />;
      case 'kb-management':
        return <KnowledgeBaseManagement onNavigate={setCurrentScreen} />;
      default:
        return <ChatInterface onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <Layout currentScreen={currentScreen} onNavigate={setCurrentScreen}>
      {renderScreen()}
    </Layout>
  );
}
