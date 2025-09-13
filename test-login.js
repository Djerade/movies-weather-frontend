// Script de test pour vérifier la mutation de login
const testLogin = async () => {
  const endpoint = "http://localhost:4000/graphql";
  
  console.log("Test de la mutation de login...");
  
  // Test avec des credentials de test
  const testCredentials = {
    email: "test@example.com",
    password: "password123"
  };
  
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              id
              email
              name
              city
              token
            }
          }
        `,
        variables: testCredentials,
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.log("❌ Erreurs GraphQL:", result.errors);
    } else if (result.data?.login) {
      console.log("✅ Login réussi!");
      console.log("Utilisateur:", result.data.login);
    } else {
      console.log("❌ Login échoué - credentials incorrects");
    }
  } catch (error) {
    console.log("❌ Erreur:", error.message);
  }
};

testLogin();
