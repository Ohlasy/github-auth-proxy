import { VercelRequest, VercelResponse } from "@vercel/node";

export default async (
  request: VercelRequest,
  response: VercelResponse
): Promise<void> => {
  response.status(204).send("🎉");
};
