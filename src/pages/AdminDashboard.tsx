import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Users, CalendarDays, TrendingUp, RefreshCw } from "lucide-react";

interface Analytics {
  totalUniqueUsers: number;
  dailyUsers: number;
  totalVisits: number;
  todayVisits: number;
  last7Days: { date: string; count: number }[];
}

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchAnalytics = async () => {
    setLoading(true);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // Total unique visitors
    const { data: allVisits } = await supabase.from("app_visits").select("visitor_id, visited_at");
    const uniqueVisitors = new Set(allVisits?.map(v => v.visitor_id) || []);

    // Today's unique visitors
    const { data: todayData } = await supabase
      .from("app_visits")
      .select("visitor_id")
      .gte("visited_at", todayStart);
    const todayUnique = new Set(todayData?.map(v => v.visitor_id) || []);

    // Last 7 days breakdown
    const last7Days: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
      const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).toISOString();
      const dayVisits = allVisits?.filter(
        v => v.visited_at >= dayStart && v.visited_at < dayEnd
      ) || [];
      const dayUnique = new Set(dayVisits.map(v => v.visitor_id));
      last7Days.push({
        date: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
        count: dayUnique.size,
      });
    }

    setAnalytics({
      totalUniqueUsers: uniqueVisitors.size,
      dailyUsers: todayUnique.size,
      totalVisits: allVisits?.length || 0,
      todayVisits: todayData?.length || 0,
      last7Days,
    });
    setLoading(false);
  };

  useEffect(() => {
    if (user && isAdmin) fetchAnalytics();
  }, [user, isAdmin]);

  if (authLoading || (!user || !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 px-4 pb-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchAnalytics} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => { signOut(); navigate("/"); }}>
              <LogOut className="w-4 h-4 mr-1" /> Sign Out
            </Button>
          </div>
        </div>

        {analytics && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Unique Users", value: analytics.totalUniqueUsers, icon: Users, color: "text-blue-500" },
                { label: "Daily Active Users", value: analytics.dailyUsers, icon: CalendarDays, color: "text-green-500" },
                { label: "Total Page Views", value: analytics.totalVisits, icon: TrendingUp, color: "text-purple-500" },
                { label: "Today's Page Views", value: analytics.todayVisits, icon: TrendingUp, color: "text-orange-500" },
              ].map(stat => (
                <div key={stat.label} className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Unique Users — Last 7 Days</h2>
              <div className="flex items-end gap-2 h-40">
                {analytics.last7Days.map(day => {
                  const max = Math.max(...analytics.last7Days.map(d => d.count), 1);
                  const height = (day.count / max) * 100;
                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs font-medium text-foreground">{day.count}</span>
                      <div
                        className="w-full rounded-t bg-primary/70 transition-all duration-300 min-h-[4px]"
                        style={{ height: `${Math.max(height, 3)}%` }}
                      />
                      <span className="text-[10px] text-muted-foreground leading-tight text-center">{day.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
