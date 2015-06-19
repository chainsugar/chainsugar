# chainsugar

Authors: Bryan, David, and Mokhtar.





### Production

When running the server in production make sure to set NODE_ENV environment variable to 'production'.


### Configuring secrets and callback URL for Google+ OAuth authentication

Create a project at https://console.developers.google.com
Under APIs and Auth -> Credentials
  create a new client ID for a 'Web Application'
  You will have to provide a callback URL.
  For development http://localhost:8000/auth/google/callback/
  in production http://www.yourdomain.com/auth/google/callback/

make a note of the client ID and Client secret.

On development machine save them in a json file in the secrets folder at the root of the project
directory.

    secrets/google.json

It should look something like this:

{
  "id": "226227493412-qv8bcmn987243mnoqhitu6sj3298msaz8g.apps.googleusercontent.com",
  "secret": "Ie_60237lfsln55ry9FAwZ-o",
  "url": "http://localhost:8000/auth/google/callback/"
}

In production set the values of the following environment variables accordingly

    GOOGLE_APP_ID
    GOOGLE_APP_SECRET
    GOOGLE_APP_CALLBACK_URL

