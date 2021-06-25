export default async function asyncWrapper(promise) {
  let response = "";

  if (promise.length > 0) {
    console.log("array");

    response = await Promise.allSettled(promise);

    response.forEach((res) => {
      if (res.state === "rejected") {
        console.warn(reason);
        return;
      }
    });

    return response.map((res) => res.value);
  } else {
    [response] = await Promise.allSettled([promise]);
  }

  const { reason, value, state } = response;

  if (state === "rejected") {
    console.warn(reason);
    return;
  }

  return value;
}
