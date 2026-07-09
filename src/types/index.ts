export type MessageRole = "user" | "assistant";

export interface Source {
  label: string;
  href: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  sources?: Source[];
  showSelfServe?: boolean;
  timestamp: Date;
}

export interface FnolFormData {
  incidentDate: string;
  incidentType: string;
  description: string;
  location: string;
  contactPhone: string;
  contactEmail: string;
}

export interface PolicyHolder {
  name: string;
  policyNumber: string;
  email: string;
}

export interface ClaimPhoto {
  id: string;
  file: File;
  previewUrl: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: Date;
}
