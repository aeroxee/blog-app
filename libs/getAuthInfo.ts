export default async function getAuthInfo(token: any) {
  const response = await fetch(`${process.env.SERVER_API_URL}/v1/user/auth`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    cache: "no-cache",
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return null;
  }
}
