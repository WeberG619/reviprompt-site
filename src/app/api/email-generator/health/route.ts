import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check if Anthropic API key is available
    const anthropicKey = process.env.ANTHROPIC_API_KEY
    
    if (!anthropicKey) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Anthropic API key not configured',
          timestamp: new Date().toISOString()
        }, 
        { status: 500 }
      )
    }

    // Test API connection with a simple request
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [{
          role: 'user',
          content: 'Test'
        }]
      })
    })

    if (!response.ok) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Anthropic API connection failed',
          timestamp: new Date().toISOString()
        }, 
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'connected',
      message: 'Claude API is healthy and ready',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      provider: 'Anthropic Claude'
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