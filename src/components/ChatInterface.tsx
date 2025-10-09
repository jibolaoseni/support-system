import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Bot,
  User,
  Send,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { Progress } from "./ui/progress";

interface ChatInterfaceProps {
  onNavigate: (screen: string) => void;
}

type ConversationStep =
  | "initial"
  | "screenshot"
  | "module"
  | "description"
  | "complete";

interface Message {
  type: "user" | "ai";
  text: string;
  time: string;
  component?: React.ReactNode;
}

interface CollectedData {
  screenshot: File | null;
  screenshotPreview: string | null;
  module: string;
  description: string;
}

export function ChatInterface({
  onNavigate,
}: ChatInterfaceProps) {
  const [currentStep, setCurrentStep] =
    useState<ConversationStep>("initial");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "ai",
      text: "👋 Hello! I'm your AI Support Assistant. I'm here to help you resolve any issues you're experiencing. To get started, could you please upload a screenshot of the problem?",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [collectedData, setCollectedData] =
    useState<CollectedData>({
      screenshot: null,
      screenshotPreview: null,
      module: "",
      description: "",
    });
  const [inputValue, setInputValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const addMessage = (
    type: "user" | "ai",
    text: string,
    component?: React.ReactNode,
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        type,
        text,
        time: getCurrentTime(),
        component,
      },
    ]);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCollectedData((prev) => ({
          ...prev,
          screenshot: file,
          screenshotPreview: reader.result as string,
        }));

        // Add user message
        addMessage(
          "user",
          `📎 Uploaded screenshot: ${file.name}`,
        );

        // AI response after a short delay
        setTimeout(() => {
          addMessage(
            "ai",
            "Perfect! I've received your screenshot. Now, which module are you experiencing issues with?",
          );
          setCurrentStep("module");
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModuleSelect = (module: string) => {
    setCollectedData((prev) => ({ ...prev, module }));
    addMessage("user", `Module: ${module}`);

    setTimeout(() => {
      addMessage(
        "ai",
        `Got it! You're having issues with the ${module}. Could you please describe the problem in detail? What were you trying to do, and what happened instead?`,
      );
      setCurrentStep("description");
    }, 800);
  };

  const handleDescriptionSubmit = () => {
    if (!inputValue.trim()) return;

    setCollectedData((prev) => ({
      ...prev,
      description: inputValue,
    }));
    addMessage("user", inputValue);
    setInputValue("");

    setTimeout(() => {
      addMessage(
        "ai",
        "Thank you for providing all the details! Let me analyze this information and search our knowledge base for similar issues...",
      );

      setTimeout(() => {
        addMessage(
          "ai",
          "I found some relevant articles that might help. Would you like to review them, or shall I create a support ticket for you?",
        );
        setCurrentStep("complete");
      }, 1500);
    }, 800);
  };

  const handleSendMessage = () => {
    if (currentStep === "description") {
      handleDescriptionSubmit();
    }
  };

  const getProgressPercentage = () => {
    switch (currentStep) {
      case "initial":
      case "screenshot":
        return 25;
      case "module":
        return 50;
      case "description":
        return 75;
      case "complete":
        return 100;
      default:
        return 0;
    }
  };

  const modules = [
    "Finance Module",
    "HR Management",
    "Inventory System",
    "Sales Dashboard",
    "Customer Portal",
    "Reporting Tools",
    "User Administration",
    "Analytics Platform",
  ];

  return (
    <div className="flex h-full gap-6">
      {/* Chat Panel */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg">
                  AI Support Assistant
                </h3>
                <p className="text-sm text-muted-foreground">
                  Always here to help • Online
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white">
              {currentStep === "complete"
                ? "Ready"
                : "Collecting Info"}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">
                Progress
              </span>
              <span className="text-xs bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {getProgressPercentage()}%
              </span>
            </div>
            <Progress
              value={getProgressPercentage()}
              className="h-1.5"
            />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-4 overflow-auto">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "user"
                    ? "bg-gradient-to-br from-slate-200 to-slate-300"
                    : "bg-gradient-to-br from-indigo-100 to-purple-100"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-4 h-4 text-slate-600" />
                ) : (
                  <Bot className="w-4 h-4 text-indigo-600" />
                )}
              </div>
              <div
                className={`flex-1 ${message.type === "user" ? "flex justify-end" : ""}`}
              >
                <div
                  className={`max-w-md ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl rounded-tr-sm shadow-md"
                      : "bg-slate-50 text-foreground rounded-2xl rounded-tl-sm border border-slate-200"
                  } p-4`}
                >
                  <p className="whitespace-pre-wrap">
                    {message.text}
                  </p>
                  {message.component && (
                    <div className="mt-3">
                      {message.component}
                    </div>
                  )}
                  <span
                    className={`text-xs mt-2 block ${
                      message.type === "user"
                        ? "text-white/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.time}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Action Buttons - Only show when complete */}
          {currentStep === "complete" && (
            <div className="flex gap-3 justify-center pt-4">
              <Button
                onClick={() => onNavigate("knowledge")}
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Solutions
              </Button>
              <Button
                onClick={() => onNavigate("ticket")}
                variant="outline"
                className="rounded-full border-indigo-300 hover:bg-indigo-50"
              >
                Create Ticket
              </Button>
            </div>
          )}
        </div>

        {/* Input Area - Changes based on step */}
        <div className="p-4 border-t border-border bg-slate-50">
          {currentStep === "initial" ||
          currentStep === "screenshot" ? (
            <div className="flex flex-col gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg h-12"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Screenshot
              </Button>
              {collectedData.screenshotPreview && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-green-200">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-700">
                    Screenshot uploaded successfully
                  </span>
                </div>
              )}
            </div>
          ) : currentStep === "module" ? (
            <div className="space-y-3">
              <Select onValueChange={handleModuleSelect}>
                <SelectTrigger className="w-full h-12 rounded-full bg-white border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100">
                  <SelectValue placeholder="Select the affected module..." />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((module) => (
                    <SelectItem key={module} value={module}>
                      {module}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : currentStep === "description" ||
            currentStep === "complete" ? (
            <div className="flex gap-2">
              <Input
                placeholder={
                  currentStep === "complete"
                    ? "Ask a follow-up question..."
                    : "Describe the issue in detail..."
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage()
                }
                className="flex-1 rounded-full bg-white border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                disabled={currentStep === "complete"}
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={
                  currentStep === "complete" ||
                  !inputValue.trim()
                }
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Info Panel */}
      <div className="w-80 space-y-4">
        {/* Collection Status */}
        <Card className="p-6 shadow-lg border-slate-200">
          <h4 className="mb-4 flex items-center gap-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Information Collected
            </span>
          </h4>
          <div className="space-y-3">
            <div
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                collectedData.screenshot
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              {collectedData.screenshot ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <ImageIcon className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm mb-0.5">Screenshot</p>
                {collectedData.screenshot ? (
                  <>
                    <p className="text-xs text-muted-foreground truncate">
                      {collectedData.screenshot.name}
                    </p>
                    {collectedData.screenshotPreview && (
                      <img
                        src={collectedData.screenshotPreview}
                        alt="Screenshot preview"
                        className="mt-2 w-full h-24 object-cover rounded-lg border border-green-200"
                      />
                    )}
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Pending upload
                  </p>
                )}
              </div>
            </div>

            <div
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                collectedData.module
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              {collectedData.module ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm mb-0.5">Module</p>
                <p className="text-xs text-muted-foreground">
                  {collectedData.module || "Not selected"}
                </p>
              </div>
            </div>

            <div
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                collectedData.description
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              {collectedData.description ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <FileText className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm mb-0.5">Description</p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {collectedData.description || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Tips */}
        <Card className="p-6 shadow-lg border-slate-200 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <h4 className="mb-3 text-amber-900">
            💡 Tips for Better Support
          </h4>
          <ul className="space-y-2 text-xs text-amber-800">
            <li className="flex gap-2">
              <span>•</span>
              <span>
                Include error messages in your screenshot
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Describe what you were trying to do</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>
                Mention any recent changes to your system
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}