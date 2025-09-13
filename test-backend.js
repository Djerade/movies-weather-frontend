// Script de test pour vérifier la connexion au backend
const testBackend = async () => {
  const endpoint = "http://localhost:4000/graphql";
  
  console.log("Test de connexion au backend GraphQL...");
  console.log("Endpoint:", endpoint);
  
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            __schema {
              types {
                name
              }
            }
          }
        `,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("✅ Backend accessible!");
      console.log("Types disponibles:", result.data?.__schema?.types?.length || 0);
    } else {
      console.log("❌ Backend non accessible:", response.status, response.statusText);
    }
  } catch (error) {
    console.log("❌ Erreur de connexion:", error.message);
    console.log("Vérifiez que votre backend GraphQL est démarré sur le port 4000");
  }
};

testBackend();
