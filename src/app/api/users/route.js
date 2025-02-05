import { createUser } from "@/actions/createUser";


export async function POST(request) {
    try {
      const parsedBody = await request.json();      
  
      if (!parsedBody || !parsedBody.email || !parsedBody.name) {
        return new Response('Missing email or name in request body', { status: 400 });
      }
  
      const { email, name } = parsedBody;
  
      const newUser = await createUser(email, name);
  
      return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
      if (error instanceof SyntaxError) {
        return new Response('Invalid JSON format', { status: 400 });
      }
      console.error(error);
      return new Response('Internal server error', { status: 500 });
    }
  }
  