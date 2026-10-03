import { NextRequest, NextResponse } from "next/server";
import { 
  getAllProducts, 
  getActiveProductsList, 
  addProduct, 
  updateProductById, 
  deleteProductById 
} from "@/lib/productsStorage";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") === "true";

    const products = activeOnly ? getActiveProductsList() : getAllProducts();

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Product name is required" },
        { status: 400 }
      );
    }

    const created = addProduct({
      name: body.name.trim(),
      category: body.category || "Cleaning Chemicals",
      description: body.description ?? null,
      short_description: body.short_description ?? null,
      price: body.price !== undefined && body.price !== null && body.price !== "" ? Number(body.price) : null,
      original_price: body.original_price !== undefined && body.original_price !== null && body.original_price !== "" ? Number(body.original_price) : null,
      sku: body.sku ? String(body.sku).trim() : null,
      stock_status: body.stock_status || "in_stock",
      image_url: body.image_url || "/images/housekeeping-materials.jpg",
      images: body.images || (body.image_url ? [body.image_url] : []),
      display_order: body.display_order ? Number(body.display_order) : 0,
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
    });

    return NextResponse.json({
      success: true,
      data: created,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required for update" },
        { status: 400 }
      );
    }

    const updates: any = {};
    if (body.name !== undefined) updates.name = String(body.name).trim();
    if (body.category !== undefined) updates.category = String(body.category).trim();
    if (body.description !== undefined) updates.description = body.description;
    if (body.short_description !== undefined) updates.short_description = body.short_description;
    if (body.price !== undefined) updates.price = body.price !== "" && body.price !== null ? Number(body.price) : null;
    if (body.original_price !== undefined) updates.original_price = body.original_price !== "" && body.original_price !== null ? Number(body.original_price) : null;
    if (body.sku !== undefined) updates.sku = body.sku ? String(body.sku).trim() : null;
    if (body.stock_status !== undefined) updates.stock_status = body.stock_status;
    if (body.image_url !== undefined) {
      updates.image_url = body.image_url;
      updates.images = body.image_url ? [body.image_url] : [];
    }
    if (body.display_order !== undefined) updates.display_order = Number(body.display_order);
    if (body.is_active !== undefined) updates.is_active = Boolean(body.is_active);

    const updated = updateProductById(body.id, updates);

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch {}
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required for deletion" },
        { status: 400 }
      );
    }

    const deleted = deleteProductById(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Product ${id} deleted successfully`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
