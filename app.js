export default async function (
  token,
  [name, description, isPrivate, gitIgnoreTemplate]
) {
  const url = 'https://api.github.com/user/repos';
  const body = JSON.stringify({
    name,
    description,
    private: isPrivate,
    gitignore_template: gitIgnoreTemplate,
  });
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (!response.ok) {
      // If the response is not OK, throw an error with the status
      throw new Error(
        `GitHub API responded with status code: ${response.status}`
      );
    }

    const data = await response.json(); // Assuming success, parse the JSON response
    console.log('Repository_Creator successfully created the repository:');
    console.log(name);
    return data; // You can return the full response data or just what you need
  } catch (error) {
    console.error('Repository_Creator encountered an error:');
    console.error(error);
  }
}
