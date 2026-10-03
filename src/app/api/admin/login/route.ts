import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const envEmail = process.env.ADMIN_EMAIL || "admin@dvsfacilities.com";
    const envPassword = process.env.ADMIN_PASSWORD || "admin123";

    const normalizedInputEmail = (email || "").trim().toLowerCase();
    const normalizedEnvEmail = envEmail.trim().toLowerCase();

    if (normalizedInputEmail === normalizedEnvEmail && password === envPassword) {
      const token = createSessionToken(normalizedEnvEmail);
      const res = NextResponse.json({ success: true, email: normalizedEnvEmail });

      res.cookies.set("dvs_admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return res;
    }

    return NextResponse.json(
      { error: "Invalid admin email or password. Please verify the credentials in .env.local." },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Login failed" }, { status: 500 });
  }
}
