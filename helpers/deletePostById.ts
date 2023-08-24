export default async function deletePostById(id: string) {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Delete failed");

  return res.json();
}
