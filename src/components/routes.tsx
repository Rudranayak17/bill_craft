import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { HomePage } from '@/pages/home';
import { AboutPage } from '@/pages/about';
import { SubscriptionPage } from '@/pages/subscription';
import InvoiceChatbot from '@/pages/generate_invoice_ai/generate';
import RegistrationForm from '@/pages/auth/signup';
import SignInPage from '@/pages/auth/login';

import Custom from '@/pages/Custom';
export function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <RouterRoutes>
          <Route path="/" element={<HomePage />} />
          <Route path="/custom-invoice" element={<Custom />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/chat-bot" element={<InvoiceChatbot />} />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </RouterRoutes>
      </Layout>
    </BrowserRouter>
  );
}