import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check if OpenAI API key is available
    const openaiKey = process.env.OPENAI_API_KEY
    
    if (!openaiKey) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'OpenAI API key not configured',
          timestamp: new Date().toISOString()
        }, 
        { status: 500 }
      )
    }

    // Test API connection
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'OpenAI API connection failed',
          timestamp: new Date().toISOString()
        }, 
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'connected',
      message: 'OpenAI API is healthy and ready',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      provider: 'OpenAI GPT'
    })

  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}