import { renewAccessToken } from '~/handlers/renewAccessToken';
import { json, redirect } from "@remix-run/node";

export async function manageAccessToken(accessToken: string, accessTokenDate: string | null) {
  const currentTime = new Date();
  const tokenDate = accessTokenDate ? new Date(accessTokenDate) : null;

  if (tokenDate) {
    const timeDiff = currentTime.getTime() - tokenDate.getTime();
    const oneDayInMillis = 24 * 60 * 60 * 1000;

    if (timeDiff >= oneDayInMillis) {
      const renewalResponse = await handleTokenRenewal(accessToken);
      if (renewalResponse.message !== "Token renewed successfully") {
        return { message: "Failed to renew token" };
      }
      return renewalResponse;
    }
  }

  return { message: "Token is valid", token: accessToken, date: tokenDate };
}

async function handleTokenRenewal(token: string) {
  const result = await renewAccessToken(token);

  if (result.message === 'Token renewed successfully') {
    return { message: result.message, token: result.guest_token, date: result.date };
  }

  return { message: "Failed to renew guest token" };
}
