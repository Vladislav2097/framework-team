import type { Author, DateFilter, Painting, SearchParams, Location } from '@/types/interfaces';
import { defineStore } from 'pinia';
import { fetchPaintings, fetchAuthors, fetchLocations } from '@/services/apiService';
import handleError from '@/utils/errorHandling';

export default defineStore('gallery', {
  state: () => ({
    images: [] as Painting[],
    authors: [] as Author[],
    locations: [] as Location[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    pageSize: 12,
    filterByAuthorId: null as number | null,
    filterByLocationId: null as number | null,
    filterByName: '',
    fromDate: '',
    beforeDate: '',
  }),

  actions: {
    async loadImages() {
      this.loading = true;
      this.error = null;

      const requestParams: SearchParams = {
        _page: this.currentPage,
        _limit: this.pageSize,
        ...(this.filterByAuthorId && { authorId: this.filterByAuthorId }),
        ...(this.filterByLocationId && { locationId: this.filterByLocationId }),
        ...(this.filterByName && { q: this.filterByName }),
        ...(this.fromDate && { created_gte: this.fromDate }),
        ...(this.beforeDate && { created_lte: this.beforeDate }),
      };

      try {
        this.images = await fetchPaintings(requestParams);
      } catch (error: unknown) {
        this.error = handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async loadAuthors() {
      try {
        this.authors = await fetchAuthors();
        // console.log(this.authors);
      } catch (error) {
        this.error = handleError(error);
      }
    },

    async loadLocations() {
      try {
        this.locations = await fetchLocations();
      } catch (error) {
        this.error = handleError(error);
      }
    },

    setPage(page: number) {
      this.currentPage = page;
      this.loadImages().catch((error: unknown) => {
        this.error = handleError(error);
      });
    },

    setAuthorFilter(authorId: number | null) {
      this.filterByAuthorId = authorId;
      this.currentPage = 1;
      this.loadImages().catch((error: unknown) => {
        this.error = handleError(error);
      });
    },

    setLocationFilter(locationId: number | null) {
      this.filterByLocationId = locationId;
      this.currentPage = 1;
      this.loadImages().catch((error: unknown) => {
        this.error = handleError(error);
      });
    },

    setFilterByName(name: string) {
      this.filterByName = name;
      this.loadImages().catch((error: unknown) => {
        this.error = handleError(error);
      });
    },

    setCreatedFilter({ from, before }: DateFilter) {
      this.fromDate = from || '';
      this.beforeDate = before || '';
      this.currentPage = 1;
      this.loadImages().catch((error: unknown) => {
        this.error = handleError(error);
      });
    },
  },
});
