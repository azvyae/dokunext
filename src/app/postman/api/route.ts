import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';

interface EssentialPostmanJsonAPI {
  info: any;
  item: any[];
  auth?: any;
  variable: any[];
}

async function GET(request: NextRequest) {
  const collectionPath = request.nextUrl.searchParams.get(
    'collection'
  ) as string;
  const apiDir = `${process.env.PWD}/api/postman/collections/${decodeURI(
    collectionPath
  )}`;
  let contents: EssentialPostmanJsonAPI;
  try {
    contents = JSON.parse(await readFile(apiDir, { encoding: 'utf8' }));
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Not Found' },
      { status: 404, statusText: 'Not Found' }
    );
  }

  return NextResponse.json({
    data: {
      info: JSON.stringify(contents.info),
      item: JSON.stringify(contents.item),
      auth: JSON.stringify(contents.auth),
      variable: contents.variable
    }
  });
}

export { GET };
