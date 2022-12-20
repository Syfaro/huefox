const lookups = new Map();

lookups.set('acct:syfaro@huefox.com', {
  "subject": "acct:Syfaro@vulpine.club",
  "aliases": [
    "https://vulpine.club/@Syfaro",
    "https://vulpine.club/users/Syfaro"
  ],
  "links": [
    {
      "rel": "http://webfinger.net/rel/profile-page",
      "type": "text/html",
      "href": "https://vulpine.club/@Syfaro"
    },
    {
      "rel": "self",
      "type": "application/activity+json",
      "href": "https://vulpine.club/users/Syfaro"
    },
    {
      "rel": "http://ostatus.org/schema/1.0/subscribe",
      "template": "https://vulpine.club/authorize_interaction?uri={uri}"
    }
  ]
});

exports.handler = async function (event) {
  const resource = event['queryStringParameters']?.['resource'];
  if (!resource) {
    return {
      statusCode: 400,
    }
  }

  const data = lookups.get(resource.toLowerCase());
  if (!data) {
    return {
      statusCode: 404,
    }
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/jrd+json',
    },
    body: JSON.stringify(data),
  }
};
