export default async function getArticlesByUserID(
  userId: number,
  page: number,
  q: string,
  status: "DRAFTED" | "PUBLISHED"
) {
  const response = await fetch(
    `${process.env.SERVER_API_URL}/v1/articles?user_id=${userId}&page=${page}&q=${q}&status=${status}`,
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
    return {};
  }
}
