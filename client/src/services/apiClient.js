// Shared mock transport for the receptionist module. Every service function
// resolves through here so swapping in real HTTP calls later only touches
// this file, not the hooks or pages that consume the services.

export function simulateRequest(data, { delay = 500, shouldFail = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Request failed'));
        return;
      }
      resolve(data);
    }, delay);
  });
}
