import { NextRequest, NextResponse } from 'next/server';
import { readFile, readdir } from 'fs/promises';
import { Globals } from '@/store/types';
import { readFileSync } from 'fs';

interface EssentialPostmanJsonAPI {
  info: any;
  item: any[];
  auth?: any;
  globals: any[];
  variable: any[];
}

async function GET(request: NextRequest) {
  const collectionPath = request.nextUrl.searchParams.get(
    'collection'
  ) as string;
  const apiDir = `${process.cwd()}/json/postman/collections/${decodeURI(
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

  let globals: Globals = { id: 'global-vars', name: 'Globals', values: [] };
  try {
    globals = JSON.parse(
      readFileSync(`${process.cwd()}/json/postman/Globals.json`, {
        encoding: 'utf8'
      })
    );
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({
    data: {
      info: JSON.stringify(contents.info),
      item: JSON.stringify(contents.item),
      auth: JSON.stringify(contents.auth),
      globals: globals.values,
      variable: contents.variable
    }
  });
}

export { GET };
