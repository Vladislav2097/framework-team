import type { Author, Location, Painting, SearchParams } from '@/types/interfaces';
import axios from 'axios';

const API_BASE_URL = 'https://test-front.framework.team';

export const fetchPaintings = async (params?: SearchParams): Promise<{paintings: Painting[], totalCount: number}> => {
  const response = await axios.get<Painting[]>(`${API_BASE_URL}/paintings`, {
    params: params as Record<string, string | number | undefined>,
  });
  const totalCount = parseInt(response.headers['x-total-count']);

  return {
    paintings: response.data,
    totalCount: totalCount,
  };
};

export const fetchPagination = async (params?: SearchParams): Promise<{ totalCount: number }> => {
  const response = await axios.get<Painting[]>(`${API_BASE_URL}/paintings`, { params });
  const totalCount = parseInt(response.headers['x-total-count'], 10) || 0;

  return {
    totalCount,
  };
};

export const fetchAuthors = async (): Promise<Author[]> => {
  const response = await axios.get<Author[]>(`${API_BASE_URL}/authors`);
  return response.data;
};

export const fetchLocations = async (): Promise<Location[]> => {
  const response = await axios.get<Location[]>(`${API_BASE_URL}/locations`);
  return response.data;
};
