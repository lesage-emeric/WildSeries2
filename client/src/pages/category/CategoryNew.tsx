import { useNavigate } from "react-router-dom";

import CategoryForm from "../../components/category/CategoryForm";

function CategoryNew() {
  const navigate = useNavigate();

  const newCategory = {
    name: "",
  };

  return (
    <CategoryForm
      defaultValue={newCategory}
      onSubmit={(categoryData) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Erreur lors de la création de la catégorie");
            }
            return response.json();
          })
          .then((data) => {
            navigate(`/categories/${data.insertId}`);
          })
          .catch((error) => {
            console.error("Une erreur est survenue :", error);
            alert("Impossible d'ajouter la catégorie. Veuillez réessayer.");
          });
      }}
    >
      Ajouter
    </CategoryForm>
  );
}

export default CategoryNew;
