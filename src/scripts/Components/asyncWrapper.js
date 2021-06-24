export default async function asyncWrapper (promise) {
  const [response] = await Promise.allSettled([promise]);

  const { reason, value, state } = response;

  if (state === "rejected") {
    console.warn(reason);
    return;
  }

  return value;
};
