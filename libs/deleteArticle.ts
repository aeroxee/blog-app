export default async function deleteArticle(
  token: any,
  username: string,
  slug: string
) {
  const response = await fetch(
    `${process.env.SERVER_API_URL}/v1/articles/${username}/${slug}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  if (response.status === 204) {
    return true;
  } else {
    return false;
  }
}
