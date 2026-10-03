import { NextRequest, NextResponse } from "next/server";
import { uploadProductImageToR2 } from "@/lib/cloudflare/r2";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const contentType = file.type || "image/jpeg";

    // Upload strictly to Cloudflare R2
    const publicUrl = await uploadProductImageToR2(buffer, file.name, contentType);

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (error: any) {
    console.error("Cloudflare R2 Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload image to Cloudflare R2" },
      { status: 500 }
    );
  }
}
