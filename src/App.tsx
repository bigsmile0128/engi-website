import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import Layout from './Layout';
import JobDiscovery from './JobDiscovery';
import Hire from './Hire';
import JobDetails from './JobDetails';
import PressPage from './PressPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="jobs" element={<JobDiscovery />} />
            <Route path="jobs/:id" element={<JobDetails />} />
            <Route path="hire" element={<Hire />} />
            <Route path="press" element={<PressPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
