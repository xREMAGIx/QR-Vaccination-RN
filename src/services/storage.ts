import AsyncStorage from '@react-native-async-storage/async-storage';

const savingStorage = async (name: string, data: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(name, data);
  } catch (error) {
    //return error;
  }
};

const gettingStorage = async (name: string): Promise<string | undefined> => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    //return error;
  }
};

const removingStorage = async (name: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (error) {
    //return error;
  }
};

const StorageService = {
  savingStorage,
  gettingStorage,
  removingStorage,
};

export default StorageService;
