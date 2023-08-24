export default async function fetchUserById(id: string) {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/user/${id}`);

  if (res.ok) {
    const data = await res.json();
    return data;
  }
}
