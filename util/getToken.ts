export function waitForLocalStorage(key: string, timeout = 5000) {
  if (typeof window !== 'undefined') {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const intervalId = setInterval(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
          clearInterval(intervalId);
          resolve(storedValue);
        } else if (Date.now() - startTime >= timeout) {
          clearInterval(intervalId);
          reject(new Error(`Timeout waiting for '${key}' in localStorage`));
        }
      }, 100); // Check every 100 milliseconds
    });
  }
}
