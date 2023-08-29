import axios from 'axios';
import queryString from 'query-string';
import { FavoriteInterface, FavoriteGetQueryInterface } from 'interfaces/favorite';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFavorites = async (
  query?: FavoriteGetQueryInterface,
): Promise<PaginatedInterface<FavoriteInterface>> => {
  const response = await axios.get('/api/favorites', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFavorite = async (favorite: FavoriteInterface) => {
  const response = await axios.post('/api/favorites', favorite);
  return response.data;
};

export const updateFavoriteById = async (id: string, favorite: FavoriteInterface) => {
  const response = await axios.put(`/api/favorites/${id}`, favorite);
  return response.data;
};

export const getFavoriteById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/favorites/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFavoriteById = async (id: string) => {
  const response = await axios.delete(`/api/favorites/${id}`);
  return response.data;
};
