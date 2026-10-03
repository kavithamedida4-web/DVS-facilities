import { NextResponse } from "next/server";
import { resetToDefaults } from "@/lib/productsStorage";

export async function POST() {
  try {
    const products = resetToDefaults();
    return NextResponse.json({
      success: true,
      message: `Reset to ${products.length} default products`,
      data: products,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to reset products" },
      { status: 500 }
    );
  }
}
