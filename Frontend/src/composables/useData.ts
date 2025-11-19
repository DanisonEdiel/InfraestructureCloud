import { api } from '@/api/axios';
import { ErrorApiResponse } from '@/models/ApiResponse';
import { DataResponse } from '@/models/Post';

import { useQuery } from '@tanstack/vue-query';
import type { AxiosError } from 'axios';

const fetchData = async (): Promise<DataResponse[]> => {
  const { data } = await api.get('/get_data');
  return data;
};

const useData = () => {
  const dataQuery = useQuery<DataResponse[], AxiosError<ErrorApiResponse>>({ queryKey: ['data'], queryFn: fetchData, initialData: [] });
  const { data, isError, isFetching } = dataQuery
  return { data, isDataError: isError, isDataFetching: isFetching, dataQuery };
};
export default useData;
