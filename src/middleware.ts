import { NextRequest, NextResponse } from 'next/server';
function authorize(authorizationHeader: string | null) {
  if (!authorizationHeader) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401, statusText: 'Unauthorized' }
    );
  }
  if (authorizationHeader !== `Bearer ${process.env.SECRET_TOKEN}`) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401, statusText: 'Unauthorized' }
    );
  }
}

export function middleware(request: NextRequest) {
  const authorizationHeader = request.headers.get('Authorization');
  if (request.nextUrl.pathname.match('/postman')) {
    return authorize(authorizationHeader);
  }
  if (request.nextUrl.pathname.startsWith('/postman/api')) {
    return authorize(authorizationHeader);
  }
  if (request.nextUrl.pathname.match('/openapi')) {
    return authorize(authorizationHeader);
  }
  if (request.nextUrl.pathname.startsWith('/openapi/api')) {
    return authorize(authorizationHeader);
  }
  if (request.nextUrl.pathname.match('/auth')) {
    return authorize(authorizationHeader);
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/auth',
    '/postman',
    '/openapi',
    '/postman/api/:path*',
    '/openapi/api/:path*'
  ]
};
