// Script de test pour vérifier la mutation de login avec le bon schéma
const testLoginCorrect = async () => {
  const endpoint = "http://localhost:4000/graphql";
  
  console.log("Test de la mutation de login avec le bon schéma...");
  
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
      
      // Essayons de créer un utilisateur d'abord
      console.log("\n🔄 Tentative de création d'utilisateur...");
      const signupResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation Signup($name: String!, $email: String!, $password: String!, $city: String!) {
              signup(name: $name, email: $email, password: $password, city: $city) {
                id
                email
                name
                city
                token
              }
            }
          `,
          variables: {
            name: "Test User",
            email: "test@example.com",
            password: "password123",
            city: "Paris"
          },
        }),
      });
      
      const signupResult = await signupResponse.json();
      if (signupResult.errors) {
        console.log("❌ Erreur signup:", signupResult.errors);
      } else {
        console.log("✅ Utilisateur créé:", signupResult.data?.signup);
      }
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

testLoginCorrect();
