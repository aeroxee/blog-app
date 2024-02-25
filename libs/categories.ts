async function getAllCategories() {
  const response = await fetch(`${process.env.SERVER_API_URL}/v1/categories`, {
    headers: { "Content-Type": "application/json" },
    next: {
      revalidate: 60,
    },
  });
  const data = await response.json();

  return data;
}

export { getAllCategories };
