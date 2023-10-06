import { create } from 'zustand';

export interface CreateMovieFormStoreInterface {
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

const useCreateMovieForm = create<CreateMovieFormStoreInterface>((set) => ({
  isFormOpen: false,
  openForm: () => set({ isFormOpen: true }),
  closeForm: () => set({ isFormOpen: false }),
}));

export default useCreateMovieForm;