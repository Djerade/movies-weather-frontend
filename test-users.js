// Script pour lister les utilisateurs existants
const testUsers = async () => {
  const endpoint = "http://localhost:4000/graphql";
  
  console.log("Test de la query GetUser...");
  
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetUser {
            me {
              id
              email
              name
              city
            }
          }
        `,
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.log("❌ Erreurs GraphQL:", result.errors);
    } else {
      console.log("✅ Query réussie!");
      console.log("Utilisateur actuel:", result.data?.me || "Aucun utilisateur connecté");
    }
  } catch (error) {
    console.log("❌ Erreur:", error.message);
  }
};

testUsers();
