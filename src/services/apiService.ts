import type { Author, Location, Painting, SearchParams } from '@/types/interfaces';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchPaintings = async (params?: SearchParams): Promise<{paintings: Painting[], totalCount: number}> => {
  const response = await axios.get<Painting[]>(`${apiBaseUrl}/paintings`, {
    params: params as Record<string, string | number | undefined>,
  });
  const totalCount = parseInt(response.headers['x-total-count']);

  return {
    paintings: response.data,
    totalCount: totalCount,
  };
};

export const fetchPagination = async (params?: SearchParams): Promise<{ totalCount: number }> => {
  const response = await axios.get<Painting[]>(`${apiBaseUrl}/paintings`, { params });
  const totalCount = parseInt(response.headers['x-total-count'], 10) || 0;

  return {
    totalCount,
  };
};

export const fetchAuthors = async (): Promise<Author[]> => {
  const response = await axios.get<Author[]>(`${apiBaseUrl}/authors`);
  return response.data;
};

export const fetchLocations = async (): Promise<Location[]> => {
  const response = await axios.get<Location[]>(`${apiBaseUrl}/locations`);
  return response.data;
};
