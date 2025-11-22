export async function GET() {
  return Response.json({
    categories: [
      "Support",
      "Entbannung",
      "Technik",
      "Bug Report",
      "Fragen",
      "Whitelist",
      "Roleplay"
    ],
  });
}
