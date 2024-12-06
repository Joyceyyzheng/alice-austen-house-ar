import { create } from "zustand";

const useStore = create((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({ currentStep: Math.min(state.currentStep + 1, 8) })),
  prevStep: () =>
    set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

  programStart: false,
  setProgramStart: (value) => set({ programStart: value }),
  modalExpanded: false,
  setModalExpanded: (value) =>
    set((state) => ({
      modalExpanded: value !== undefined ? value : !state.modalExpanded,
    })),

  tutorialActive: true,
  setTutorialActive: (value) => set({ tutorialActive: value }),

  tutorialStep: 0,
  setTutorialStep: (step) => set({ tutorialStep: step }),

  selectedModelIndex: null,
  setSelectedModelIndex: (index) => set({ selectedModelIndex: index }),
}));

export default useStore;
