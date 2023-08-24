export const revalidateData = async (path: string) => {
  const res = await fetch(
    `/api/revalidate?path=${path}&token=admin123`
  );
  const data = await res.json();
  console.log(data);
};
