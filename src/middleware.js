import { NextResponse } from 'next/server'

export function middleware(request) {
  // Get the origin from the request headers
  const origin = request.headers.get('origin') || ''
  
  // Define allowed origins
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    // Add your production domains here
  ]

  // Check if the origin is allowed
  const isAllowedOrigin = allowedOrigins.includes(origin)
  
  // Create the response
  const response = NextResponse.next()
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', isAllowedOrigin ? origin : allowedOrigins[0])
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Max-Age', '86400')
  
  return response
}

export const config = {
    matcher: '/api/:path*',
  }