// תבנית דשבורד - עוטפת את כל עמודי הדשבורד בתבנית המשקיע
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
