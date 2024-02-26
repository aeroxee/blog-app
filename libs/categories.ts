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

async function getCategoryBySlug(slug: string) {
  const response = await fetch(
    `${process.env.SERVER_API_URL}/v1/categories/${slug}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

async function getCategoryById(id: number) {
  const response = await fetch(
    `${process.env.SERVER_API_URL}/v1/categories?id=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export { getAllCategories, getCategoryById, getCategoryBySlug };
