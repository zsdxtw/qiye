import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import Dashboard from '@/pages/Dashboard';
import RiskCenter from '@/pages/RiskCenter';
import Invoices from '@/pages/finance/Invoices';
import Receivable from '@/pages/finance/Receivable';
import Cashflow from '@/pages/finance/Cashflow';
import Purchase from '@/pages/business/Purchase';
import Sales from '@/pages/business/Sales';
import Inventory from '@/pages/business/Inventory';
import CRM from '@/pages/business/CRM';
import Attendance from '@/pages/hr/Attendance';
import Payroll from '@/pages/hr/Payroll';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/risk" element={<RiskCenter />} />
          <Route path="/finance/invoices" element={<Invoices />} />
          <Route path="/finance/receivable" element={<Receivable />} />
          <Route path="/finance/cashflow" element={<Cashflow />} />
          <Route path="/business/purchase" element={<Purchase />} />
          <Route path="/business/sales" element={<Sales />} />
          <Route path="/business/inventory" element={<Inventory />} />
          <Route path="/business/crm" element={<CRM />} />
          <Route path="/hr/attendance" element={<Attendance />} />
          <Route path="/hr/payroll" element={<Payroll />} />
        </Route>
      </Routes>
    </Router>
  );
}
