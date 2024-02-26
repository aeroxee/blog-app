async function getUserFromUsername(username: string) {
  const response = await fetch(
    `${process.env.SERVER_API_URL}/v1/get-user-from-username/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return null;
  }
}

async function getUserFromID(id: number) {
  const response = await fetch(
    `${process.env.SERVER_API_URL}/v1/get-user-from-id/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return null;
  }
}

export { getUserFromID, getUserFromUsername };
