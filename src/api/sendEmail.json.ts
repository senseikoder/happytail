export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
   try {     
      const body = await request.json();

      const { to, from, html, subject } = body;

      if (!to || !from || !html || !subject) {
         return new Response(
            JSON.stringify({ message: "Did not provide the right data" }),
            {
               status: 400,
               statusText: "Bad Request",
            }
         );
      }

      const send = await resend.emails.send({
         from,
         to,
         subject,
         html
      });

      if (send.data) {
         return new Response(
            JSON.stringify({
               message: send.data,
            }),
            {
               status: 200,
               statusText: "OK",
            }
         );
      } else {
         return new Response(
            JSON.stringify({
               message: send.error,
            }),
            {
               status: 500,
               statusText: "Internal Server Error",
            }
         );
      }
   } catch (error) {
      console.error("Error handling request:", error);
      return new Response(
         JSON.stringify({ message: "Internal Server Error" }),
         {
            status: 500,
            statusText: "Internal Server Error",
         }
      );
   }
};
