# dokuNEXT

DokuNEXT is simple documentation generator for Postman (currently only supports Postman v2.1 API) that can simpli you use for viewing API Documentation, offline or deployed on hosting.

You can see the demo here -> **https://dokunext.vercel.app/**.
Just open up and fill the authorization token with `dokunext` and you are ready to go

## Getting Started

1. To start you have to clone this repo.

    ```bash
    git clone https://github.com/azvyae/dokunext
    ```
2. Update your `.gitignore` file to allow `json/postman/collections/*` and `json/postman/environments/*` folder being updated to for git.

3. Export Postman v2.1 collection json file and put it to `json/postman/collections` folder. You may also want to export environments and put it to `json/postman/environments/*` folder.

4. Add `.env` file to root of your project providing `SECRET_TOKEN` key and its value. You can also provide `SECRET_TOKEN` environment variable to your hosting.

5. Build, and voila!

   ```bash
   npm run build
   ```

## Features

- API Documentation Generator with markdown support, definition files supported are:
  - Postman v2.1
- Organized folder table of contents and anchor links to each API requests
- Support multiple collections and environments
- Has simple authorization by providing simple token
- Examples! It can show multiple examples and its returned response code, code example supported are:
  - cURL
- Copy paste code easy
- Responsive UI

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Zustand Documentation](https://github.com/pmndrs/zustand) - learn about Zustand.
- [React Markdown Documentation](https://github.com/remarkjs/react-markdown) - learn about react-markdown library.
- [Typescript Documentation](https://www.typescriptlang.org) - learn Typescript.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Feel free to open issues and pull requests.

Future plan:

- Organize better
- Allow support on OpenAPI file definitions
- Improve UI