import React, { createContext, useContext, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch from '../utils/customFetch';
import ProjectSearchContainer from '../components/ProjectSearchContainer';
import ProjectsContainer from '../components/ProjectsContainer';

const allProjectsQuery = (params) => {
  const {
    search,
    projectType,
    projectStatus,
    componentType,
    deploymentStatus,
    sort,
    page,
  } = params;

  return {
    queryKey: [
      'projects',
      search ?? '',
      projectType ?? 'all',
      projectStatus ?? 'all',
      componentType ?? 'all',
      deploymentStatus ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/projects', {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries(
      new URL(request.url).searchParams
    );

    await queryClient.ensureQueryData(allProjectsQuery(params));
    return { searchValues: { ...params } };
  };

const AllProjectsContext = createContext();

const AllProjects = () => {
  const { searchValues } = useLoaderData();
  const queryClient = useQueryClient();
  const { data } = useQuery(allProjectsQuery(searchValues));

  const contextValue = useMemo(
    () => ({ data, searchValues, queryClient }),
    [data, searchValues, queryClient]
  );

  return (
    <AllProjectsContext.Provider value={contextValue}>
      <ProjectSearchContainer />
      <ProjectsContainer />
    </AllProjectsContext.Provider>
  );
};

export const useAllProjectsContext = () => useContext(AllProjectsContext);

export default AllProjects;
