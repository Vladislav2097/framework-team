import { fetchPagination } from '@/services/apiService';
import type { SearchParams } from '@/types/interfaces';
import handleError from '@/utils/errorHandling';
import { defineStore } from 'pinia';

export default defineStore('pagination', {
  state: () => ({
    currentPage: 1,
    pageSize: 12,
    totalPages: 0,
    error: null as string | null,
  }),

  actions: {
    async loadPages() {
      const requestParams: SearchParams = {
        _page: this.currentPage,
        _limit: this.pageSize,
      };

      try {
        const response = await fetchPagination(requestParams);
        this.totalPages = Math.ceil(response.totalCount / this.pageSize);
      } catch (error: unknown) {
        this.error = handleError(error);
      }
    },

    setPage(page: number) {
      this.currentPage = page;
      this.loadPages().catch((error: unknown) => {
        this.error = handleError(error);
      });
    },
  },
});
