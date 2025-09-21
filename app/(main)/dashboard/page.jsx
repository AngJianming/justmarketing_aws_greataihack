import { DashboardAIInsights } from "@/components/dashboardpage/DashboardAIInsights";
import { DashboardHeader } from "@/components/dashboardpage/DashboardHeader";
import { MalaysiaTrendPulse } from "@/components/dashboardpage/MalaysiaTrendPulse";
import { CommonPitfalls } from "@/components/dashboardpage/Pitfalls";
import { QuickActions } from "@/components/dashboardpage/QuickActions";
import { RecentActivity } from "@/components/dashboardpage/RecentActivity";


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100  px-6 py-15">
      <div className="max-w-8xl mx-auto space-y-6 px-5 pt-8 pb-4">
        <DashboardHeader/>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MalaysiaTrendPulse/>
                <CommonPitfalls/>
            </div>
                <DashboardAIInsights/>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
                <QuickActions/>
                <RecentActivity/>
          </div>
        </div>
      </div>
    </div>
  )
}
