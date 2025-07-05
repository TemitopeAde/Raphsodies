import { NextResponse } from "next/server"




export async function middleware(request) {
  const origin = request.headers.get('origin') || ''
  
  const allowedOrigins = [
    "*",
    'http://localhost:3000',
    'http://localhost:3001',
    "https://raphsodies.vercel.app"
  ]

  const isAllowedOrigin = allowedOrigins.includes(origin)
  const response = NextResponse.next()
  
  // Set CORS headers first
  response.headers.set('Access-Control-Allow-Origin', isAllowedOrigin ? origin : allowedOrigins[0])
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Expose-Headers', 'X-User-Location')
  response.headers.set('Access-Control-Max-Age', '86400')

  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0] : request.ip || "0.0.0.0"
  
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}`)
    if (!res.ok) {
      throw new Error('Failed to fetch location data')
    }
    const locationData = await res.json()
    
    response.headers.set("X-User-Location", JSON.stringify(locationData))
    
  } catch (error) {
    console.error("Location fetch error:", error)
    response.headers.set("X-User-Location", JSON.stringify({}))
  }

  const path = request.nextUrl.pathname;
 
  if (path.startsWith('/admin')) {
    if (!request.cookies.get('authToken')) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    
    const validationRes = await fetch(`${request.nextUrl.origin}/api/validate-token`, {
      headers: { Cookie: request.headers.get('cookie') || '' },
    });
    console.log(validationRes);
    

    const { isAdmin } = await validationRes.json();

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } 

  
  return response
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*'],

}