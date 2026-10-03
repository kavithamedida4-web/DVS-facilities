"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { 
  PRODUCT_HOUSEKEEPING_MATERIALS 
} from "@/data/servicesData";
import { getActiveProducts, groupProductsByCategory } from "@/lib/supabase/products";
import { ProductCategoryGroup } from "@/types/product";
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Package, 
  Truck, 
  Tag, 
  MessageCircle,
  PhoneCall 
} from "lucide-react";

export default function HousekeepingMaterialsPage() {
  const router = useRouter();

  // Categories initialized with default static catalog for zero layout shift/fallback
  const [categories, setCategories] = useState<ProductCategoryGroup[]>(
    PRODUCT_HOUSEKEEPING_MATERIALS.categories.map((cat) => ({
      name: cat.name,
      items: cat.items.map((item) => ({
        id: item.id || item.sku,
        name: item.name,
        price: item.price,
        original_price: item.original_price,
        description: item.description,
        short_description: item.short_description,
        image_url: item.image_url,
        stock_status: item.stock_status || "in_stock",
        sku: item.sku,
      })),
    }))
  );

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch dynamic products from Supabase
  useEffect(() => {
    async function loadDynamicProducts() {
      try {
        const dynamicProducts = await getActiveProducts();
        if (dynamicProducts && dynamicProducts.length > 0) {
          const grouped = groupProductsByCategory(dynamicProducts);
          if (grouped.length > 0) {
            setCategories(grouped);
          }
        }
      } catch (err) {
        console.warn("Using fallback housekeeping data:", err);
      }
    }

    loadDynamicProducts();
  }, []);

  const handleOpenEnquiry = (productName?: string) => {
    const serviceName = productName ? `Product: ${productName}` : "Product: Housekeeping Material Supply";
    router.push(`/contact?service=${encodeURIComponent(serviceName)}`);
  };

  // Flattened products with category tag
  const allProducts = categories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      category: cat.name,
    }))
  );

  // Filtered products based on active tab & search query
  const displayedProducts = allProducts.filter((prod) => {
    const matchesCategory =
      activeCategory === "all" || prod.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.description && prod.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (prod.category && prod.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (prod.sku && prod.sku.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categoryTabNames = [
    { id: "all", name: "All Products", count: allProducts.length },
    ...categories.map((c) => ({
      id: c.name,
      name: c.name,
      count: c.items.length,
    })),
  ];

  return (
    <div className="min-h-screen bg-white text-[#1a2e26] selection:bg-[#c59b27] selection:text-[#071f16]">
      <Navbar onOpenQuote={() => handleOpenEnquiry()} />

      {/* 100% FULL-SCREEN HERO SECTION - Split Layout matching Home Hero */}
      <section className="relative w-full min-h-screen flex items-center bg-[#071f16] overflow-hidden">

        {/* Hero Background Image — 100% Full Screen */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/product-hero-bg.jpg"
            alt="DVS Facilities Housekeeping Materials and Supplies Distribution"
            fill
            priority
            unoptimized
            className="object-cover object-[center_right] sm:object-center"
          />
          {/* Soft neutral black fade on left for crisp text contrast — ZERO green tint, 100% natural photo colors */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 via-45% to-transparent pointer-events-none" />
          <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 pointer-events-none" />
          {/* Gold shimmer top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c59b27]/60 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content — Perfectly Positioned on Left */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center min-h-screen pt-28 pb-16">

          {/* Clean content block — Constrained width with drop shadow for crisp readability */}
          <div className="max-w-lg text-white space-y-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">

            {/* Breadcrumb & Company Tag */}
            <div className="space-y-2.5">
              <nav className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Link href="/" className="hover:text-[#e5c46b] transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[#e5c46b]">Housekeeping Products</span>
              </nav>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-[2px] bg-[#c59b27]" />
                <span className="text-[#c59b27] text-xs font-black uppercase tracking-[0.2em]">DVS Material Supplies</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Housekeeping <span className="text-[#e5c46b]">Supplies &amp; Materials</span>
            </h1>

            {/* Short Subtext */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-md">
              Wholesale cleaning chemicals, machines, mops, and restroom consumables with direct doorstep delivery across India.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleOpenEnquiry()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#071f16] font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Request Wholesale Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#catalog"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm transition-all"
              >
                <span>Browse Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Compact Stats Row */}
            <div className="flex items-center gap-4 sm:gap-6 pt-4 border-t border-white/15">
              <div className="flex items-baseline">
                <span className="text-lg sm:text-xl font-black text-[#e5c46b]">500+</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider ml-1.5 whitespace-nowrap">Products</span>
              </div>
              <div className="w-px h-5 bg-white/15 shrink-0" />
              <div className="flex items-baseline">
                <span className="text-lg sm:text-xl font-black text-[#e5c46b]">B2B</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider ml-1.5 whitespace-nowrap">Wholesale</span>
              </div>
              <div className="w-px h-5 bg-white/15 shrink-0" />
              <div className="flex items-baseline">
                <span className="text-lg sm:text-xl font-black text-[#e5c46b]">Pan-India</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider ml-1.5 whitespace-nowrap">Delivery</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Product Catalog Section */}
      <section className="py-16 md:py-20 bg-[#faf8f3]" id="catalog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0e3b2e] bg-[#e5c46b]/20 border border-[#c59b27]/40 px-3.5 py-1.5 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Commercial & Industrial Supplies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0e3b2e] tracking-tight leading-tight">
              Housekeeping <span className="text-[#c59b27]">Material Supplies</span>
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Browse our complete certified catalog of chemicals, equipment, machines, tools, and consumables with wholesale doorstep delivery.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="space-y-4 mb-10">
            {/* Search Input */}
            <div className="max-w-xl mx-auto relative">
              <input
                type="text"
                placeholder="Search by product name, SKU, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-gray-300 shadow-sm text-sm text-[#071f16] placeholder-slate-400 focus:outline-none focus:border-[#c59b27] focus:ring-2 focus:ring-[#c59b27]/20 transition-all"
              />
              <Tag className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded-full transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
              {categoryTabNames.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-[#0e3b2e] text-[#e5c46b] shadow-md shadow-[#0e3b2e]/20 border border-[#c59b27]"
                        : "bg-white text-slate-700 hover:bg-white/80 border border-gray-200/80 hover:border-[#c59b27]/40 shadow-xs"
                    }`}
                  >
                    <span>{tab.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? "bg-[#c59b27] text-[#071f16]"
                          : "bg-gray-100 text-slate-500"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          {displayedProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-gray-200/80 p-8">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No products found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No items match your search &quot;{searchQuery}&quot;. Try adjusting your keywords or clearing the category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#0e3b2e] text-[#e5c46b] text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProducts.map((prod, idx) => {
                const discount =
                  prod.price && prod.original_price && prod.original_price > prod.price
                    ? Math.round(((prod.original_price - prod.price) / prod.original_price) * 100)
                    : null;

                const cardImage =
                  prod.image_url ||
                  PRODUCT_HOUSEKEEPING_MATERIALS.heroImage;

                return (
                  <div
                    key={prod.id || `${prod.category}-${idx}`}
                    className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#c59b27]/60 transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 w-full bg-[#f4f1ea] overflow-hidden">
                      <Image
                        src={cardImage}
                        alt={prod.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Stock badge */}
                      <div
                        className={`absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border shadow-sm backdrop-blur-xs ${
                          prod.stock_status === "out_of_stock"
                            ? "bg-red-950/90 text-red-400 border-red-500/30"
                            : prod.stock_status === "low_stock"
                            ? "bg-amber-950/90 text-amber-300 border-amber-500/30"
                            : "bg-[#071f16]/90 text-emerald-400 border-white/10"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            prod.stock_status === "out_of_stock"
                              ? "bg-red-400"
                              : prod.stock_status === "low_stock"
                              ? "bg-amber-300 animate-ping"
                              : "bg-emerald-400 animate-pulse"
                          }`}
                        />
                        <span>
                          {prod.stock_status === "out_of_stock"
                            ? "Out of Stock"
                            : prod.stock_status === "low_stock"
                            ? "Low Stock"
                            : "In Stock"}
                        </span>
                      </div>

                      {/* Discount badge */}
                      {discount ? (
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#c59b27] text-[#071f16] text-[10px] font-black shadow-sm">
                          {discount}% OFF
                        </div>
                      ) : null}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        {/* Category & SKU row */}
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                          <span className="text-[#0e3b2e] font-bold uppercase tracking-wider text-[10px]">
                            {prod.category}
                          </span>
                          {prod.sku && (
                            <span className="font-mono text-[10px] text-slate-400">
                              {prod.sku}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-black text-[#0e3b2e] leading-snug line-clamp-2 group-hover:text-[#c59b27] transition-colors">
                          {prod.name}
                        </h3>

                        {/* Description */}
                        {prod.description && (
                          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                            {prod.description}
                          </p>
                        )}
                      </div>

                      {/* Price Section */}
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex items-baseline gap-2">
                          {prod.price ? (
                            <div className="text-lg font-black text-[#0e3b2e]">
                              ₹{prod.price.toLocaleString("en-IN")}
                            </div>
                          ) : (
                            <div className="text-xs font-bold text-[#0e3b2e]">
                              Wholesale Quote
                            </div>
                          )}

                          {prod.original_price && prod.original_price > (prod.price || 0) && (
                            <div className="text-xs text-slate-400 line-through">
                              ₹{prod.original_price.toLocaleString("en-IN")}
                            </div>
                          )}
                        </div>

                        <div className="text-[10px] font-semibold text-emerald-700 mt-0.5">
                          GST Invoice & Bulk Transport Ready
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEnquiry(prod.name)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-[#0e3b2e] text-[#e5c46b] hover:bg-[#c59b27] hover:text-[#071f16] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                        >
                          <span>Book Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`https://wa.me/918919439071?text=Hello%20DVS%20Facilities,%20I%20would%20like%20to%20order%20/%20enquire%20about:%20${encodeURIComponent(prod.name)}%20(Price:%20₹${prod.price || "Wholesale Quote"})`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Chat on WhatsApp"
                          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shrink-0 flex items-center justify-center"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Wholesale Info Banner */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#071f16] to-[#0e3b2e] text-white border border-[#c59b27]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#e5c46b] uppercase tracking-wider">
                <Truck className="w-4 h-4 text-[#e5c46b]" />
                <span>Pan-India Commercial Logistics</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Need Customized Monthly Supplies or Tender Estimates?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                We supply corporate tech parks, hospitals, shopping malls, and manufacturing plants with dedicated account managers and recurring delivery schedules.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => handleOpenEnquiry("Customized Monthly Wholesale Supply Contract")}
                className="px-6 py-3.5 rounded-full bg-[#c59b27] text-[#071f16] font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer"
              >
                Schedule Corporate Consultation
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* WhatsApp */}
      <WhatsAppButton />
    </div>
  );
}
