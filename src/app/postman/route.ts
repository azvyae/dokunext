import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { Collections } from '@/components/Sidebar/Sidebar';

export async function GET(request: Request) {
  const apiDir = `${process.env.PWD}/api/postman/collections`;
  let collections: Collections[] = [];
  try {
    collections = (await readdir(apiDir))
      .filter((file) => file.includes('.json'))
      .map((file) => ({
        name: file.split('.')[0],
        url: `/postman/${encodeURIComponent(file)}`
      }));
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({
    data: collections
  });
}
