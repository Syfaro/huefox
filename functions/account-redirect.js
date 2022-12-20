const lookups = new Map();

lookups.set('syfaro', 'https://vulpine.club/@Syfaro');

exports.handler = async function (event) {
  const path = event['path'];
  const pathElements = path.split('/');
  const usernameSegment = pathElements[pathElements.length - 1];
  const username = usernameSegment.replace(/^@/, '').toLowerCase();

  console.debug(`Attempting to find username: ${username}`);

  const link = lookups.get(username);
  if (!link) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 301,
    headers: {
      'location': link,
    }
  };
}
