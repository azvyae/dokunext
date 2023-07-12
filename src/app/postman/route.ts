import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { Collections } from '@/components/Sidebar/Sidebar';
import { Environment } from '@/store/types';
import { readFileSync } from 'fs';

export async function GET(request: Request) {
  const apiDir = `${process.env.PWD}/api/postman`;
  let collections: Collections[] = [];
  try {
    collections = (await readdir(`${apiDir}/collections`))
      .filter((file) => file.includes('.json'))
      .map((file) => ({
        name: file.split('.')[0],
        url: `/postman/${encodeURIComponent(file)}`
      }));
  } catch (error) {
    console.error(error);
  }
  let environments: Environment[] = [];
  try {
    environments = (await readdir(`${apiDir}/environments`))
      .filter((file) => file.includes('.json'))
      .map((file) =>
        JSON.parse(
          readFileSync(`${apiDir}/environments/${file}`, { encoding: 'utf8' })
        )
      );
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({
    data: {
      collections,
      environments
    }
  });
}
