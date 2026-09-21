import { Outlet, redirect, useNavigate, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar, Loading } from '../components';
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { checkDefaultTheme } from '../App';
const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect('/');
  }
};

const DashboardContext = createContext();

const DashboardLayout = ({ queryClient }) => {
  const { user } = useQuery(userQuery).data;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isAuthError, setIsAuthError] = useState(false);

  const toggleDarkTheme = useCallback(() => {
    setIsDarkTheme((prev) => {
      const newDarkTheme = !prev;
      document.body.classList.toggle('dark-theme', newDarkTheme);
      localStorage.setItem('darkTheme', newDarkTheme);
      return newDarkTheme;
    });
  }, []);

  const toggleSidebar = useCallback(() => {
    setShowSidebar((prev) => !prev);
  }, []);

  const logoutUser = useCallback(async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    queryClient.invalidateQueries();
    toast.success('Logging out...');
  }, [navigate, queryClient]);

  const dashboardContextValue = useMemo(
    () => ({
      user,
      showSidebar,
      isDarkTheme,
      toggleDarkTheme,
      toggleSidebar,
      logoutUser,
    }),
    [user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser]
  );

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError, logoutUser]);

  return (
    <DashboardContext.Provider value={dashboardContextValue}>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
