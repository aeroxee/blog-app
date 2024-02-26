type Props = {
  status: "PUBLISHED" | "DRAFTED";
  orderBy: string;
  page: number;
  size: number;
  categoryId: number;
  userId: number;
};

export default async function getArticle(username: string, slug: string) {
  const response = await fetch(
    `${process.env.SERVER_API_URL}/v1/articles/${username}/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return null;
  }
}
