// Secure auth storage: prefer react-native-keychain, then AsyncStorage, then in-memory.
// Usage:
//   await auth.saveKeys({ apiKey, apiSecret })
//   const keys = await auth.getKeys()
// Note: For production, install `react-native-keychain` and configure native modules.

let _memory = null;
let Keychain = null;
let AsyncStorage = null;

try {
  Keychain = require('react-native-keychain');
} catch (e) {
  Keychain = null;
}

try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  AsyncStorage = null;
}

const SERVICE_NAME = 'crypto-trader-keys';

const saveKeys = async ({ apiKey, apiSecret }) => {
  if (Keychain && Keychain.setGenericPassword) {
    // store apiKey as username and apiSecret as password
    await Keychain.setGenericPassword(apiKey, apiSecret, { service: SERVICE_NAME });
    return true;
  }

  if (AsyncStorage) {
    const val = JSON.stringify({ apiKey, apiSecret });
    await AsyncStorage.setItem('@crypto_trader_keys', val);
    return true;
  }

  // fallback
  _memory = { apiKey, apiSecret };
  return true;
};

const getKeys = async () => {
  if (Keychain && Keychain.getGenericPassword) {
    try {
      const creds = await Keychain.getGenericPassword({ service: SERVICE_NAME });
      if (creds) return { apiKey: creds.username, apiSecret: creds.password };
      return null;
    } catch (e) {
      return null;
    }
  }

  if (AsyncStorage) {
    try {
      const raw = await AsyncStorage.getItem('@crypto_trader_keys');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  return _memory;
};

const clear = async () => {
  if (Keychain && Keychain.resetGenericPassword) {
    try {
      await Keychain.resetGenericPassword({ service: SERVICE_NAME });
    } catch (e) {}
  }

  if (AsyncStorage) {
    try { await AsyncStorage.removeItem('@crypto_trader_keys'); } catch (e) {}
  }

  _memory = null;
};

const isSecureStorageAvailable = () => {
  return !!Keychain;
};

export default {
  saveKeys,
  getKeys,
  clear,
  isSecureStorageAvailable,
};
