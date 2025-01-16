import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { HomePage } from '@/pages/home';
import { AboutPage } from '@/pages/about';
import { SubscriptionPage } from '@/pages/subscription';

export function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <RouterRoutes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </RouterRoutes>
      </Layout>
    </BrowserRouter>
  );
}