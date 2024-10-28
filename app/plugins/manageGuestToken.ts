import { generateGuestToken } from "~/handlers/generateGuestToken";
import { renewGuestToken } from '~/handlers/renewGuestToken';
import { json, redirect } from "@remix-run/node";

export async function manageGuestToken(guestToken: string | null, guestTokenDate: string | null) {
  const currentTime = new Date();
  const tokenDate = guestTokenDate ? new Date(guestTokenDate) : null;

  if (!guestToken || !guestTokenDate) {
    const tokenResponse = await handleTokenGeneration();
    if (tokenResponse.message !== "Token created") {
      return { message: "Failed to generate token" };
    }
    return tokenResponse;
  }

  if (tokenDate) {
    const timeDiff = currentTime.getTime() - tokenDate.getTime();
    const oneDayInMillis = 24 * 60 * 60 * 1000;

    if (timeDiff >= oneDayInMillis) {
      const renewalResponse = await handleTokenRenewal(guestToken);
      if (renewalResponse.message !== "Token renewed successfully") {
        return { message: "Failed to renew token" };
      }
      return renewalResponse;
    }
  }

  return { message: "Token is valid", token: guestToken, date: tokenDate };
}

async function handleTokenGeneration() {
  const result = await generateGuestToken();

  if (result.message === 'Token created') {
    return { message: result.message, token: result.guest_token, date: result.date };
  }

  return { message: "Failed to generate guest token" };
}

async function handleTokenRenewal(token: string) {
  const result = await renewGuestToken(token);

  if (result.message === 'Token renewed successfully') {
    return { message: result.message, token: result.guest_token, date: result.date };
  }

  return { message: "Failed to renew guest token" };
}
