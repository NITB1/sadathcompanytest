import { CheckCircle2, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [verifying, setVerifying] = useState(!!sessionId);

  useEffect(() => {
    if (!sessionId) return;

    const verify = async () => {
      try {
        await supabase.functions.invoke("verify-payment", {
          body: { session_id: sessionId },
        });
      } catch (e) {
        console.error("Payment verification failed:", e);
      } finally {
        setVerifying(false);
      }
    };
    verify();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {verifying ? (
          <>
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-8">
              <Loader2 size={40} className="animate-spin text-muted-foreground" />
            </div>
            <h1 className="font-serif text-4xl mb-4">Verifying Payment…</h1>
            <p className="text-muted-foreground text-lg">Please wait a moment.</p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-8">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="font-serif text-4xl mb-4">Payment Successful</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you! Your recruitment campaign is being launched. We'll be in touch within 24 hours.
            </p>
            <Link
              to="/"
              className="inline-block text-[12px] font-bold tracking-[0.2em] uppercase bg-primary text-primary-foreground px-10 py-4 rounded-full hover:opacity-90 transition-all"
            >
              Back to Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
