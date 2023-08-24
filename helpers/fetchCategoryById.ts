export default async function fetchCategoryById(id: string) {
  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/api/categories/${id}`, {
      next: { revalidate: 1, tags: ["categories"] },
    });
    if (!res.ok) throw new Error("fail");

    return res.json();
  } catch (error) {
    throw new Error("fail");
  }
}
