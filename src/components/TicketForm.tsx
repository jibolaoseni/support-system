
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Upload, Lightbulb, CheckCircle2, X, File as FileIcon } from "lucide-react";

interface TicketFormProps {
  onNavigate: (screen: string) => void;
}

export function TicketForm({ onNavigate }: TicketFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(prev => [...prev, ...Array.from(event.target.files as FileList)]);
    }
  };

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFiles([]);
      formRef.current?.reset();
      onNavigate('dashboard');
    }, 3000);
  };

  if (isSubmitted) {
    return (
        <div className="max-w-2xl mx-auto text-center py-20">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-2">Ticket Submitted Successfully!</h2>
            <p className="text-muted-foreground mb-6">You will be redirected to the dashboard shortly.</p>
            <Button onClick={() => onNavigate('dashboard')}>Go to Dashboard</Button>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create Support Ticket</h2>
        <p className="text-muted-foreground mt-2">
          Our AI assistant will help standardize your ticket for faster resolution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form ref={formRef} onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
            <Card className="p-6 shadow-sm border-border">
                <h3 className="text-xl font-semibold mb-6">Ticket Details</h3>
                <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="user-id">User ID</Label>
                            <Input id="user-id" defaultValue="USR-24891" readOnly className="bg-slate-100" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="module">Affected Module</Label>
                            <Select defaultValue="finance">
                                <SelectTrigger id="module"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="finance">Finance Module</SelectItem>
                                    <SelectItem value="hr">HR Module</SelectItem>
                                    <SelectItem value="inventory">Inventory Module</SelectItem>
                                    <SelectItem value="reporting">Reporting Module</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="summary">Issue Summary</Label>
                        <Input id="summary" defaultValue="Login Failure - Finance Module" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">What were you doing when the error occurred?</Label>
                        <Textarea id="description" placeholder="Describe the steps that led to this issue..." rows={4} defaultValue="I was trying to access the monthly financial reports when the login screen appeared unexpectedly."/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="steps">Steps Already Tried</Label>
                        <Textarea id="steps" placeholder="What have you already attempted to resolve this?" rows={3} defaultValue="Cleared browser cache, tried different browser, restarted computer" />
                    </div>
                    <div className="space-y-2">
                        <Label>Upload Attachments</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm font-medium">Click to upload or drag and drop</p>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG or PDF (max. 10MB)</p>
                        </div>
                        <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
                        {files.length > 0 && (
                            <div className="pt-2 space-y-2">
                                {files.map((file, i) => (
                                    <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border">
                                        <div className="flex items-center gap-2">
                                            <FileIcon className="w-4 h-4 text-slate-500" />
                                            <span className="text-sm font-medium">{file.name}</span>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => removeFile(file.name)}><X className="w-4 h-4" /></Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Card>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700">Submit Ticket</Button>
            <Button type="button" variant="outline">Save Draft</Button>
          </div>
        </form>

        <div className="space-y-6">
          <Card className="p-6 shadow-sm border-border">
            <div className="flex items-start gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-indigo-500 flex-shrink-0" />
              <h4 className="text-lg font-semibold">AI Insight</h4>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium mb-1">Similar Incident Found:</p>
                <div className="p-3 bg-slate-50 rounded-lg text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Ticket:</span> <span>#4587</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Resolved by:</span> <span>Consultant A</span></div>
                </div>
              </div>
              <div>
                <p className="font-medium mb-1">Suggested Resolution:</p>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs">Reset user session token and clear application cache.</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('knowledge')}>View Similar Cases</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
