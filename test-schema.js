// Script pour examiner le schéma GraphQL
const testSchema = async () => {
  const endpoint = "http://localhost:4000/graphql";
  
  console.log("Examen du schéma GraphQL...");
  
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query IntrospectionQuery {
            __schema {
              queryType {
                name
                fields {
                  name
                  type {
                    name
                    kind
                  }
                }
              }
              mutationType {
                name
                fields {
                  name
                  type {
                    name
                    kind
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.log("❌ Erreurs GraphQL:", result.errors);
    } else {
      console.log("✅ Schéma récupéré!");
      console.log("\n📋 Queries disponibles:");
      result.data?.__schema?.queryType?.fields?.forEach(field => {
        console.log(`  - ${field.name} (${field.type.name || field.type.kind})`);
      });
      
      console.log("\n🔄 Mutations disponibles:");
      result.data?.__schema?.mutationType?.fields?.forEach(field => {
        console.log(`  - ${field.name} (${field.type.name || field.type.kind})`);
      });
    }
  } catch (error) {
    console.log("❌ Erreur:", error.message);
  }
};

testSchema();
