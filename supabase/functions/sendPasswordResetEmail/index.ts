import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

interface RequestBody {
  email: string
  resetLink: string
  code_challenge: string
  code_challenge_method: string
}

serve(async (req) => {
  try {
    const { email, resetLink, code_challenge, code_challenge_method } = await req.json() as RequestBody

    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Generate a password reset token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: {
        redirectTo: resetLink,
        data: {
          code_challenge,
          code_challenge_method
        }
      }
    })

    if (userError) {
      throw userError
    }

    // Send the custom email with the reset link
    const { error: emailError } = await supabaseAdmin.functions.invoke('sendEmail', {
      body: {
        to: [email],
        template: 'password-reset',
        data: {
          resetLink,
          email
        }
      }
    })

    if (emailError) {
      throw emailError
    }

    return new Response(
      JSON.stringify({ message: 'Password reset email sent successfully' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
