import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
  AddProject,
  AllProjects,
  EditProject,
  ProjectStats,
  DashboardOverview,
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { action as addJobAction } from './pages/AddJob';
import { loader as allJobsLoader } from './pages/AllJobs';
import {
  loader as editJobLoader,
  action as editJobAction,
} from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { loader as adminLoader } from './pages/Admin';
import { action as profileAction } from './pages/Profile';
import { loader as statsLoader } from './pages/Stats';

import { loader as allProjectsLoader } from './pages/AllProjects';
import { loader as editProjectLoader } from './pages/EditProject';
import { action as deleteProjectAction } from './pages/DeleteProject';
import { loader as projectStatsLoader } from './pages/ProjectStats';
import { loader as dashboardOverviewLoader } from './pages/DashboardOverview';

import ErrorElement from './components/ErrorElement';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnMount: 'always',
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: 'dashboard',
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <DashboardOverview />,
            loader: dashboardOverviewLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'add-job',
            element: <AddJob />,
            action: addJobAction(queryClient),
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'add-project',
            element: <AddProject />,
          },
          {
            path: 'all-projects',
            element: <AllProjects />,
            loader: allProjectsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'project-stats',
            element: <ProjectStats />,
            loader: projectStatsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'edit-project/:id',
            element: <EditProject />,
            loader: editProjectLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'delete-project/:id',
            action: deleteProjectAction(queryClient),
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          { path: 'delete-job/:id', action: deleteJobAction(queryClient) },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
