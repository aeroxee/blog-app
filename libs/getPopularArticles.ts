export default async function getPopularArticles() {
  const response = await fetch(
    `${process.env.SERVER_API_URL}/v1/articles?order_by=views&size=5`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
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
