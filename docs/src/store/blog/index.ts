import { BlogData, BlogDataType } from '@/data/blog';
import { create } from 'zustand';

type State = {
  blog: Array<BlogDataType>;
};

export const useBlogStore = create<State>(() => ({
  blog: BlogData,
}));
