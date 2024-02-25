export default async function getArticles(page: number, q: string) {
  const response = await fetch(
    `${process.env.SERVER_API_URL}/v1/articles?page=${page}&q=${q}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (data.status === "success") {
    return data;
  } else {
    return [];
  }
}
