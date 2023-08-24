export default async function fetchPostById(id: string) {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/posts/${id}`, {
    next: { revalidate: 1 },
  });
  if (!res.ok) throw new Error("fail");

  return res.json();
}
