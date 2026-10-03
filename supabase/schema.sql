-- ============================================================================
-- DVS FACILITIES: SUPABASE DATABASE SCHEMA FOR PRODUCTS
-- Run this script in your Supabase SQL Editor: Dashboard > SQL Editor > New query
-- ============================================================================

-- 1. Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    price NUMERIC(10, 2),
    original_price NUMERIC(10, 2),
    sku TEXT,
    stock_status TEXT DEFAULT 'in_stock',
    image_url TEXT,
    images TEXT[] DEFAULT '{}'::text[],
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create updated_at auto-update trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_products_updated_at ON public.products;
CREATE TRIGGER trigger_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Public read-only for active products
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
CREATE POLICY "Public can view active products"
ON public.products
FOR SELECT
USING (is_active = true);

-- 5. RLS Policy: Authenticated admin users have full access
DROP POLICY IF EXISTS "Authenticated users have full access" ON public.products;
CREATE POLICY "Authenticated users have full access"
ON public.products
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Setup Supabase Storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 7. Storage RLS Policies
DROP POLICY IF EXISTS "Public Read Product Images" ON storage.objects;
CREATE POLICY "Public Read Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Authenticated Upload Product Images" ON storage.objects;
CREATE POLICY "Authenticated Upload Product Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

DROP POLICY IF EXISTS "Authenticated Update Product Images" ON storage.objects;
CREATE POLICY "Authenticated Update Product Images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Authenticated Delete Product Images" ON storage.objects;
CREATE POLICY "Authenticated Delete Product Images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products');
