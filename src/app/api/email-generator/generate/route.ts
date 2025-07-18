import { NextRequest, NextResponse } from 'next/server'

interface EmailRequest {
  emailType: string
  recipient: string
  purpose: string
  tone: string
  context?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json()
    const { emailType, recipient, purpose, tone, context } = body

    // Validate required fields
    if (!emailType || !recipient || !purpose) {
      return NextResponse.json(
        { error: 'Missing required fields: emailType, recipient, purpose' }, 
        { status: 400 }
      )
    }

    // Get OpenAI API key
    const openaiKey = process.env.OPENAI_API_KEY
    if (!openaiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' }, 
        { status: 500 }
      )
    }

    // Build the prompt for email generation
    const prompt = buildEmailPrompt(emailType, recipient, purpose, tone, context)

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional email writing assistant. Generate clear, professional emails based on the provided parameters. Always return the response in JSON format with "subject" and "content" fields.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const aiResponse = await response.json()
    const generatedText = aiResponse.choices[0]?.message?.content

    if (!generatedText) {
      throw new Error('No content generated from AI')
    }

    // Try to parse as JSON, fallback to text parsing
    let emailData
    try {
      emailData = JSON.parse(generatedText)
    } catch {
      // Fallback: extract subject and content from text
      const lines = generatedText.split('\n')
      const subjectLine = lines.find((line: string) => line.toLowerCase().includes('subject:'))
      const subject = subjectLine ? subjectLine.replace(/subject:\s*/i, '').trim() : 'Generated Email'
      
      const contentStart = lines.findIndex((line: string) => line.toLowerCase().includes('subject:')) + 1
      const content = lines.slice(contentStart).join('\n').trim()
      
      emailData = { subject, content }
    }

    // Validate the response structure
    if (!emailData.subject || !emailData.content) {
      throw new Error('Invalid email structure generated')
    }

    // Return the generated email
    return NextResponse.json({
      subject: emailData.subject,
      content: emailData.content,
      tone: tone || 'Professional',
      type: emailType,
      timestamp: new Date().toISOString(),
      metadata: {
        recipient,
        purpose,
        context: context || null
      }
    })

  } catch (error) {
    console.error('Email generation error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate email', 
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}

function buildEmailPrompt(emailType: string, recipient: string, purpose: string, tone: string, context?: string): string {
  const basePrompt = `Generate a professional email with the following parameters:

Email Type: ${emailType}
Recipient: ${recipient}
Purpose: ${purpose}
Tone: ${tone || 'Professional'}
${context ? `Additional Context: ${context}` : ''}

Requirements:
- Create an appropriate subject line
- Write a complete email body
- Use the specified tone throughout
- Make it professional and well-structured
- Include appropriate greetings and closings
- Keep it concise but comprehensive

Please return the response in JSON format with exactly these fields:
{
  "subject": "Your subject line here",
  "content": "Your complete email content here including greeting, body, and closing"
}`

  return basePrompt
}

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}