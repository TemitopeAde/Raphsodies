import { NextResponse } from 'next/server'

export function middleware(request) {

  const origin = request.headers.get('origin') || ''
  
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
  ]

  const isAllowedOrigin = allowedOrigins.includes(origin)
  const response = NextResponse.next()
  
  response.headers.set('Access-Control-Allow-Origin', isAllowedOrigin ? origin : allowedOrigins[0])
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Max-Age', '86400')
  
  return response
}

export const config = {
    matcher: '/api/:path*',
  }