import AppTheme from '@/types/themeTypes';

interface Author {
  id: number;
  name: string;
}

interface Image {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

interface Location {
  id: number;
  location: string;
}

interface SearchParams {
  id?: number;
  q?: string;
  created_gte?: string;
  created_lte?: string;
  _page?: number;
  _limit?: number;
  authorId?: number;
  [key: string]: string | number | undefined;
}

interface Painting {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

interface ThemeState {
  theme: AppTheme;
}

interface DateFilter {
  from: string | null;
  before: string | null;
}

export { Author, Image, Location, SearchParams, Painting, ThemeState, DateFilter };
