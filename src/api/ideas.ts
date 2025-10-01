import api from '@/lib/axios';
import type { Idea } from '@/types';

export const fetchIdeas = async (): Promise<Idea[]> => {
  const res = await api.get('/ideas');
  return res.data;
};
