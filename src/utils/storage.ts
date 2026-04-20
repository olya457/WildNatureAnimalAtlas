import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  FACTS_LAST_DATE: '@wildlife:facts_last_date',
  FACTS_REMAINING: '@wildlife:facts_remaining',
  FACTS_CURRENT: '@wildlife:facts_current',
  CROSSWORD_PROGRESS: '@wildlife:crossword_progress',
  CROSSWORD_INDEX: '@wildlife:crossword_index',
  CROSSWORD_STARTED: '@wildlife:crossword_started',
  QUIZ_RESULT: '@wildlife:quiz_result',
};

export const saveData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error saving data', e);
  }
};

export const loadData = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
  } catch (e) {
    console.error('Error loading data', e);
    return defaultValue;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data', e);
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Error clearing data', e);
  }
};