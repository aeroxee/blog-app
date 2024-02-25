async function getComment(username: any, slug: any) {
  const response = await fetch(
    `${process.env.SERVER_API_URL}/v1/articles/${username}/${slug}/comment`,
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

  return data;
}

export { getComment };
