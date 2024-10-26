import { createCookie } from "@remix-run/node";

export const guestTokenCookie = createCookie("guestToken", {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});

export const guestTokenDate = createCookie("guestTokenDate", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
})

export const cookiesAccepted = createCookie("cookiesAccepted", {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
})
