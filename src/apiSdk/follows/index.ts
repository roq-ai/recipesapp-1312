import axios from 'axios';
import queryString from 'query-string';
import { FollowInterface, FollowGetQueryInterface } from 'interfaces/follow';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFollows = async (query?: FollowGetQueryInterface): Promise<PaginatedInterface<FollowInterface>> => {
  const response = await axios.get('/api/follows', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFollow = async (follow: FollowInterface) => {
  const response = await axios.post('/api/follows', follow);
  return response.data;
};

export const updateFollowById = async (id: string, follow: FollowInterface) => {
  const response = await axios.put(`/api/follows/${id}`, follow);
  return response.data;
};

export const getFollowById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/follows/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFollowById = async (id: string) => {
  const response = await axios.delete(`/api/follows/${id}`);
  return response.data;
};
