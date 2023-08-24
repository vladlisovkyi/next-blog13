export default async function fetchAllPosts() {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/posts`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    next: { revalidate: 1, tags: ["posts"] },
  });
  if (!res.ok) throw new Error("fail");
  return res.json();
}
