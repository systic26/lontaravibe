import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    // If not admin, maybe redirect to a regular user dashboard or explore
    // We don't have user dashboard yet, so send to explore
    redirect("/explore?error=not-admin");
  }

  return <>{children}</>;
}
