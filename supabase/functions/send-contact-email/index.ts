import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const contactMessage: ContactMessage = await req.json();
    
    // Get all headers from the request
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Create HTML content with headers information
    const headersList = Object.entries(headers)
      .map(([key, value]) => `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`)
      .join('');

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Contact Us <info@TabletopGame.org>",
        to: ["info@tabletopgame.org"],
        subject: `New Contact Form Submission: ${contactMessage.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactMessage.name}</p>
          <p><strong>Email:</strong> ${contactMessage.email}</p>
          <p><strong>Subject:</strong> ${contactMessage.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${contactMessage.message}</p>
          
          <h3>HTTP Headers Information</h3>
          <table border="1" cellpadding="5">
            <tr>
              <th>Header</th>
              <th>Value</th>
            </tr>
            ${headersList}
          </table>
        `,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } else {
      const error = await res.text();
      return new Response(JSON.stringify({ error }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};

serve(handler);