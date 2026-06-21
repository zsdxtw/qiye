import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Workspace from "@/pages/Workspace";
import AIAssistant from "@/pages/AIAssistant";
import Finance from "@/pages/Finance";
import Tax from "@/pages/Tax";
import Consultation from "@/pages/Consultation";
import DataBoard from "@/pages/DataBoard";
import Growth from "@/pages/Growth";
import HR from "@/pages/HR";
import SupplyChain from "@/pages/SupplyChain";
import Marketing from "@/pages/Marketing";
import Legal from "@/pages/Legal";
import Policy from "@/pages/Policy";
import FinanceService from "@/pages/FinanceService";
import Settings from "@/pages/Settings";
import Mall from "@/pages/Mall";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/finance/invoices" element={<Finance />} />
          <Route path="/finance/vouchers" element={<Finance />} />
          <Route path="/tax" element={<Tax />} />
          <Route path="/tax/calendar" element={<Tax />} />
          <Route path="/tax/risk" element={<Tax />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/dashboard" element={<DataBoard />} />
          <Route path="/growth" element={<Growth />} />
          <Route path="/growth/simulation" element={<Growth />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/supply-chain" element={<SupplyChain />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/finance-service" element={<FinanceService />} />
          <Route path="/mall" element={<Mall />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/members" element={<Settings />} />
          <Route path="/settings/subscription" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
