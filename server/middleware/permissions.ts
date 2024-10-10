import { Permit } from 'permitio';

export default defineEventHandler(async (event) => {
  // Only check permissions if the request is a POST or DELETE request
  const { method, path } = event;
  if (method !== 'POST' && method !== 'DELETE') return;

  // Ensure authorization header is present
  let authorization = event.node.req.headers['authorization'];
  if (!authorization) throw new Error('Unauthorized');

  // Extract the user from the authorization header. This is for example
  // purposes only. In a real application, you would use a JWT library or
  // better authentication methods in your API.
  const user = authorization.split(' ')[1];
  if (!user) throw new Error('Unauthorized');

  // Extract the resource from the path. This is for example purposes only.
  let resource = path.split('/').reverse()[0]; // get the last part of the path
  resource = resource.slice(0, -1); // remove the trailing 's' 
  // Capitalize the first letter
  resource = resource.charAt(0).toUpperCase() + resource.slice(1);

  // Set the action on the resource from the request method. 
  // This is for example purposes only. In a real application, you would
  // have a more robust way to determine the action. 
  const action = method === 'POST' ? 'create' : 'delete';

  // Construct the Permit object. Use the token from runtime config.
  const config = useRuntimeConfig(event);
  const permit = new Permit({
    pdp: 'https://cloudpdp.api.permit.io',
    token: config.permitToken
  });

  // Check if the user is permitted to create the resource. 
  // If not, throw an error.
  const isPermitted = await permit.check(user, action, resource);
  if (!isPermitted) throw new Error('Unauthorized');
});
