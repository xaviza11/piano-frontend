import { cookiesAccepted } from "~/utils/cookies"; 

export async function manageCookiesBanner(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = await cookiesAccepted.parse(cookieHeader);
  return true
}
