export default async function fetchAllCategories() {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/api/categories`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      next: { revalidate: 1, tags: ["categories"] },
    });

    return response.json();
  } catch (error) {
    throw new Error("fail", error as any);
  }
}
