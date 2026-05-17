import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Loader2, Download, Search, Lock, Building2, Mail, User, Briefcase,
  MapPin, FileText, Users, Clock, Linkedin, ChevronDown, ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

interface Submission {
  id: string;
  customer_name: string | null;
  customer_email: string;
  company_name: string | null;
  role: string | null;
  industry: string | null;
  description: string | null;
  visa_status: string | null;
  openings: number | null;
  posting_length: number | null;
  experience_level: string | null;
  tier: string;
  shortlist_count: number;
  linkedin_budget: number | null;
  stripe_session_id: string | null;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ["pending", "paid", "contacted", "completed"] as const;

const statusColor = (s: string) => {
  switch (s) {
    case "paid": return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "contacted": return "bg-amber-500/10 text-amber-600 border-amber-200";
    case "completed": return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
    default: return "bg-red-500/10 text-red-600 border-red-200";
  }
};

const tierLabel = (t: string) => t === "pro" ? "Hiring Pro" : "Hiring Basic";
const tierColor = (t: string) => t === "pro"
  ? "bg-violet-500/10 text-violet-700 border-violet-200"
  : "bg-sky-500/10 text-sky-700 border-sky-200";

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string | number | null | undefined }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon size={15} className="text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function SubmissionCard({ s, onStatusChange, updating }: {
  s: Submission;
  onStatusChange: (id: string, status: string) => void;
  updating: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const planCost = s.tier === "pro" ? 100 : 60;
  const total = planCost + (s.linkedin_budget || 0);

  return (
    <Card className="overflow-hidden">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-border/50">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User size={18} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-bold truncate">{s.customer_name || "No name"}</p>
            <p className="text-xs text-muted-foreground truncate">{s.customer_email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border ${tierColor(s.tier)}`}>
            {tierLabel(s.tier)}
          </span>
          <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border ${statusColor(s.status)}`}>
            {s.status}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(s.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      </div>

      {/* Summary row - always visible */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 text-center border-b border-border/50">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Plan</p>
          <p className="text-lg font-bold">${planCost}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">LinkedIn Budget</p>
          <p className="text-lg font-bold">${s.linkedin_budget || 0}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Total Paid</p>
          <p className="text-lg font-bold text-emerald-600">${total}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Shortlist</p>
          <p className="text-lg font-bold">{s.shortlist_count} CVs</p>
        </div>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 border-b border-border/50">
          <DetailRow icon={Building2} label="Company" value={s.company_name} />
          <DetailRow icon={Briefcase} label="Role" value={s.role} />
          <DetailRow icon={MapPin} label="Industry" value={s.industry} />
          <DetailRow icon={Users} label="Experience Level" value={s.experience_level} />
          <DetailRow icon={User} label="Visa Status" value={s.visa_status} />
          <DetailRow icon={Users} label="Number of Openings" value={s.openings} />
          <DetailRow icon={Clock} label="Posting Length" value={s.posting_length ? `${s.posting_length} week${s.posting_length > 1 ? "s" : ""}` : null} />
          <DetailRow icon={Linkedin} label="LinkedIn Ad Budget" value={s.linkedin_budget ? `$${s.linkedin_budget}` : null} />
          {s.description && (
            <div className="md:col-span-2 py-2">
              <div className="flex items-start gap-3">
                <FileText size={15} className="text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Job Description</p>
                  <p className="text-sm mt-1 leading-relaxed whitespace-pre-wrap">{s.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer: expand toggle + status change */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? "Less details" : "View all details"}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Status:</span>
          <Select
            value={s.status}
            onValueChange={(val) => onStatusChange(s.id, val)}
            disabled={updating}
          >
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt} className="text-xs capitalize">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke("get-submissions", {
        body: { password },
      });
      if (fnError) throw fnError;
      if (data?.error) {
        setError(data.error);
        return;
      }
      setSubmissions(data.submissions || []);
      setAuthenticated(true);
    } catch {
      setError("Failed to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("update-submission-status", {
        body: { password, id, status: newStatus },
      });
      if (fnError) throw fnError;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = submissions.filter((s) => {
    const q = search.toLowerCase();
    return (
      !q ||
      s.customer_email.toLowerCase().includes(q) ||
      (s.customer_name || "").toLowerCase().includes(q) ||
      (s.company_name || "").toLowerCase().includes(q) ||
      (s.role || "").toLowerCase().includes(q) ||
      s.tier.toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q)
    );
  });

  const exportCSV = () => {
    const headers = ["Date", "Name", "Email", "Company", "Role", "Industry", "Description", "Visa Status", "Openings", "Posting Length", "Experience", "Tier", "Shortlist", "LinkedIn Budget", "Status"];
    const rows = filtered.map((s) => [
      new Date(s.created_at).toLocaleDateString(),
      s.customer_name || "",
      s.customer_email,
      s.company_name || "",
      s.role || "",
      s.industry || "",
      s.description || "",
      s.visa_status || "",
      s.openings ?? "",
      s.posting_length ? `${s.posting_length} weeks` : "",
      s.experience_level || "",
      s.tier,
      s.shortlist_count,
      s.linkedin_budget ?? "",
      s.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <Lock className="mx-auto mb-2 text-muted-foreground" size={32} />
            <CardTitle>Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button className="w-full" onClick={login} disabled={loading || !password}>
              {loading && <Loader2 className="animate-spin mr-2" size={16} />}
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold">Submissions</h1>
            <p className="text-muted-foreground text-sm">{submissions.length} total submissions</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search…"
                className="pl-9 w-60"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={exportCSV}>
              <Download size={16} className="mr-1" /> CSV
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center text-muted-foreground">
                No submissions found.
              </CardContent>
            </Card>
          ) : (
            filtered.map((s) => (
              <SubmissionCard
                key={s.id}
                s={s}
                onStatusChange={updateStatus}
                updating={updatingId === s.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
