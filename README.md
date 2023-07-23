# Software Crafters Blog
This repository contains the source code for the *Software Crafters* blog, developed with Next.js, TypeScript, and applying Hexagonal Architecture principles.

The blog retrieves posts from the Notion application, although it also loads older posts from files.

## Acknowledgements
Thanks to [Adrián Ferrera](https://twitter.com/AdrianFerrera91) for the inspiration to create this blog.

## Local Development
To run the project in your local environment, clone the repository and run the following commands:

```bash
# Install the dependencies
npm ci

# Run the project in development mode on port 3000
npm run dev
```
The npm run dev command starts the development server on port 3000. You can visit http://localhost:3000 to see your app running.

## Scripts
Here is a list of the scripts you can run:

- `npm run dev`: Run the development server on port 3000.
- `npm run build`: Create a production build of the app.
- `npm run start`: Start the app in production mode.
- `npm run lint`: Run the linter on the source code.
- `npm run compile`: Compile the project without emitting output. Useful for checking if the TypeScript code is correctly written.
- `npm run test`: Run all tests using Jest.
- `npm run docker:build`: Build a Docker image of the app.
- `npm run docker:run`: Run the app in a Docker container.

To run the app in a Docker container, you can build the Docker image with `npm run docker:build` and then run it with`npm run docker:run`.

## Deployment
The deployment of the application is automated using GitHub Actions every time a push is made to the master branch or a pull request is opened on the same branch.

The GitHub Actions workflow takes care of:

* Installing the dependencies with npm ci.
* Compiling the TypeScript code without emitting output with npm run compile.
* Running the linter with npm run lint.
* Running all tests with npm run test.
* Building a Docker image of the app.
* Logging into the DigitalOcean Container Registry.
* Pushing the Docker image to the DigitalOcean Container Registry.

The **deploy.yml** file in the **.github/workflows** directory contains all the details of the deployment process.

Additionally, the application is deployed on a DigitalOcean App Service. The service is configured to automatically pull the latest Docker image and deploy it. This means that as soon as the Docker image is updated in the registry, the new version is automatically deployed on DigitalOcean.

## Environment Variables
This project uses several environment variables to configure certain features. You will need to create a .env.local file in your local environment and define the following variables:

```
MAILER_LITE_API_KEY=<your-mailer-lite-api-key>
MAILER_LITE_GROUP_ID=<your-mailer-lite-group-id>
NOTION_API_KEY=<your-notion-api-key>
NOTION_BLOG_DATABASE_ID=<your-notion-blog-database-id>
```

In your production environment and in the GitHub Secrets, you also need to define these variables. Be sure to replace `<your-mailer-lite-api-key>`, `<your-mailer-lite-group-id>`, `<your-notion-api-key>`, and `<your-notion-blog-database-id>` with your actual keys and IDs for security reasons.
