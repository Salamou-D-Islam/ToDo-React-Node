const API_URL = "http://localhost:3000/dashboard/blogBack";

export const getAllBlogs = async () => {
  const res = await fetch(API_URL, {
    credentials: "include", // <- envoie le cookie de session
  });
  if (!res.ok) throw new Error("Erreur chargement projets");
  return res.json();
};

export const createBlog = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      `Erreur création projet (${res.status}) : ${errorData.message}`,
    );
  }

  return res.json();
};

export const deleteBlog = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok)
    throw new Error(
      `Erreur suppression projet: ${response.status} ${response.statusText}`,
    );
};
