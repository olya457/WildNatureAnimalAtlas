import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadData, saveData, STORAGE_KEYS } from '../utils/storage';

interface AppContextType {
  factsRemaining: number;
  setFactsRemaining: (val: number) => void;
  currentFact: string;
  setCurrentFact: (val: string) => void;
  quizResult: string | null;
  setQuizResult: (val: string | null) => void;
  crosswordProgress: { [key: number]: string };
  setCrosswordProgress: (val: { [key: number]: string }) => void;
  crosswordIndex: number;
  setCrosswordIndex: (val: number) => void;
  crosswordStarted: boolean;
  setCrosswordStarted: (val: boolean) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [factsRemaining, setFactsRemainingState] = useState(5);
  const [currentFact, setCurrentFactState] = useState('');
  const [quizResult, setQuizResultState] = useState<string | null>(null);
  const [crosswordProgress, setCrosswordProgressState] = useState<{ [key: number]: string }>({});
  const [crosswordIndex, setCrosswordIndexState] = useState(0);
  const [crosswordStarted, setCrosswordStartedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      const today = new Date().toDateString();
      const lastDate = await loadData<string>(STORAGE_KEYS.FACTS_LAST_DATE, '');
      if (lastDate !== today) {
        setFactsRemainingState(5);
        await saveData(STORAGE_KEYS.FACTS_LAST_DATE, today);
        await saveData(STORAGE_KEYS.FACTS_REMAINING, 5);
      } else {
        const remaining = await loadData<number>(STORAGE_KEYS.FACTS_REMAINING, 5);
        setFactsRemainingState(remaining);
      }

      const fact = await loadData<string>(STORAGE_KEYS.FACTS_CURRENT, '');
      setCurrentFactState(fact);

      const qr = await loadData<string | null>(STORAGE_KEYS.QUIZ_RESULT, null);
      setQuizResultState(qr);

      const cp = await loadData<{ [key: number]: string }>(STORAGE_KEYS.CROSSWORD_PROGRESS, {});
      setCrosswordProgressState(cp);

      const ci = await loadData<number>(STORAGE_KEYS.CROSSWORD_INDEX, 0);
      setCrosswordIndexState(ci);

      const cs = await loadData<boolean>(STORAGE_KEYS.CROSSWORD_STARTED, false);
      setCrosswordStartedState(cs);

      setIsLoading(false);
    };
    initData();
  }, []);

  const setFactsRemaining = (val: number) => {
    setFactsRemainingState(val);
    saveData(STORAGE_KEYS.FACTS_REMAINING, val);
  };

  const setCurrentFact = (val: string) => {
    setCurrentFactState(val);
    saveData(STORAGE_KEYS.FACTS_CURRENT, val);
  };

  const setQuizResult = (val: string | null) => {
    setQuizResultState(val);
    saveData(STORAGE_KEYS.QUIZ_RESULT, val);
  };

  const setCrosswordProgress = (val: { [key: number]: string }) => {
    setCrosswordProgressState(val);
    saveData(STORAGE_KEYS.CROSSWORD_PROGRESS, val);
  };

  const setCrosswordIndex = (val: number) => {
    setCrosswordIndexState(val);
    saveData(STORAGE_KEYS.CROSSWORD_INDEX, val);
  };

  const setCrosswordStarted = (val: boolean) => {
    setCrosswordStartedState(val);
    saveData(STORAGE_KEYS.CROSSWORD_STARTED, val);
  };

  return (
    <AppContext.Provider
      value={{
        factsRemaining,
        setFactsRemaining,
        currentFact,
        setCurrentFact,
        quizResult,
        setQuizResult,
        crosswordProgress,
        setCrosswordProgress,
        crosswordIndex,
        setCrosswordIndex,
        crosswordStarted,
        setCrosswordStarted,
        isLoading,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};