"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { Product } from "@/types/product";
import { 
  getAllProductsAdmin, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  uploadProductImage, 
  seedDefaultProducts 
} from "@/lib/supabase/products";
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Upload, 
  LogOut, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  Database,
  Lock,
  ArrowLeft,
  X
} from "lucide-react";

export default function AdminPage() {
  // Auth state
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Add/Edit Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    category: "Cleaning Chemicals",
    customCategory: "",
    description: "",
    short_description: "",
    price: "",
    original_price: "",
    sku: "",
    stock_status: "in_stock" as "in_stock" | "low_stock" | "out_of_stock",
    image_url: "",
    display_order: "0",
    is_active: true,
  });

  // Check auth session
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setSessionUser({ email: data.email });
            setAuthLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Session check error:", err);
      }

      // Supabase fallback session
      if (supabase) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSessionUser(session?.user || null);
          setAuthLoading(false);
        });
      } else {
        setAuthLoading(false);
      }
    }

    checkSession();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setActionMessage(null);
    try {
      const data = await getAllProductsAdmin();
      setProducts(data);
    } catch (err: any) {
      setActionMessage({ type: "error", text: err.message || "Failed to load products" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when user is logged in
  useEffect(() => {
    if (!sessionUser) return;
    let isCancelled = false;
    void Promise.resolve().then(() => {
      if (!isCancelled) {
        loadProducts();
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [sessionUser]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSubmitting(true);
    setLoginError("");

    try {
      // 1. Verify against ADMIN_EMAIL & ADMIN_PASSWORD in .env.local
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSessionUser({ email: data.email });
        setLoginSubmitting(false);
        return;
      }

      // 2. Fallback to Supabase Auth if configured
      if (supabase && isSupabaseConfigured) {
        const { data: sbData, error: sbError } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: loginPassword,
        });

        if (!sbError && sbData?.user) {
          setSessionUser(sbData.user);
          setLoginSubmitting(false);
          return;
        }
      }

      setLoginError(data.error || "Invalid admin credentials");
    } catch (err: any) {
      setLoginError(err.message || "Failed to login");
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    if (supabase) {
      await supabase.auth.signOut();
    }
    setSessionUser(null);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setImageFile(null);
    setImagePreview("");
    setFormData({
      name: "",
      category: "Cleaning Chemicals",
      customCategory: "",
      description: "",
      short_description: "",
      price: "",
      original_price: "",
      sku: `DVS-${Date.now().toString().slice(-4)}`,
      stock_status: "in_stock",
      image_url: "/images/housekeeping-materials.jpg",
      display_order: String(products.length),
      is_active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setImageFile(null);
    setImagePreview(p.image_url || "");
    setFormData({
      name: p.name,
      category: p.category,
      customCategory: "",
      description: p.description || "",
      short_description: p.short_description || "",
      price: p.price !== null && p.price !== undefined ? String(p.price) : "",
      original_price: p.original_price !== null && p.original_price !== undefined ? String(p.original_price) : "",
      sku: p.sku || "",
      stock_status: p.stock_status,
      image_url: p.image_url || "",
      display_order: String(p.display_order ?? 0),
      is_active: p.is_active,
    });
    setModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Product name is required");
      return;
    }

    setSaving(true);
    setActionMessage(null);

    try {
      let finalImageUrl = formData.image_url;

      // Upload image to Supabase Storage if a new file is chosen
      if (imageFile) {
        setUploadingImage(true);
        try {
          finalImageUrl = await uploadProductImage(imageFile);
        } catch (uploadErr: any) {
          console.error("Image upload error:", uploadErr);
          alert(`Image upload notice: ${uploadErr.message}. Falling back to default image URL.`);
        } finally {
          setUploadingImage(false);
        }
      }

      const finalCategory = formData.category === "custom" 
        ? (formData.customCategory.trim() || "General Supplies") 
        : formData.category;

      const payload = {
        name: formData.name.trim(),
        category: finalCategory,
        description: formData.description.trim() || null,
        short_description: formData.short_description.trim() || null,
        price: formData.price ? parseFloat(formData.price) : null,
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        sku: formData.sku.trim() || null,
        stock_status: formData.stock_status,
        image_url: finalImageUrl || null,
        images: finalImageUrl ? [finalImageUrl] : [],
        display_order: parseInt(formData.display_order) || 0,
        is_active: formData.is_active,
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
        setActionMessage({ type: "success", text: `Product "${payload.name}" updated successfully.` });
      } else {
        await createProduct(payload);
        setActionMessage({ type: "success", text: `Product "${payload.name}" added successfully.` });
      }

      setModalOpen(false);
      await loadProducts();
    } catch (err: any) {
      setActionMessage({ type: "error", text: err.message || "Failed to save product" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (p: Product) => {
    if (!confirm(`Are you sure you want to delete "${p.name}"?`)) return;

    setActionMessage(null);
    try {
      await deleteProduct(p.id);
      setActionMessage({ type: "success", text: `Product "${p.name}" deleted.` });
      await loadProducts();
    } catch (err: any) {
      setActionMessage({ type: "error", text: err.message || "Failed to delete product" });
    }
  };

  const handleToggleActive = async (p: Product) => {
    setActionMessage(null);
    try {
      await updateProduct(p.id, { is_active: !p.is_active });
      setActionMessage({
        type: "success",
        text: `"${p.name}" is now ${!p.is_active ? "Live (Visible)" : "Hidden from catalog"}.`,
      });
      await loadProducts();
    } catch (err: any) {
      setActionMessage({ type: "error", text: err.message || "Failed to update visibility" });
    }
  };

  const handleChangeStockStatus = async (p: Product, newStatus: "in_stock" | "low_stock" | "out_of_stock") => {
    setActionMessage(null);
    try {
      await updateProduct(p.id, { stock_status: newStatus });
      setActionMessage({
        type: "success",
        text: `Stock for "${p.name}" changed to ${newStatus.replace("_", " ")}.`,
      });
      await loadProducts();
    } catch (err: any) {
      setActionMessage({ type: "error", text: err.message || "Failed to update stock status" });
    }
  };

  const handleSeedDefaults = async () => {
    if (!confirm("This will restore the original 20 housekeeping products to the catalog. Any custom modifications will be reset to factory defaults. Proceed?")) {
      return;
    }

    setLoading(true);
    setActionMessage(null);
    try {
      const res = await seedDefaultProducts();
      setActionMessage({ type: "success", text: `Successfully restored ${res.count} default products!` });
      await loadProducts();
    } catch (err: any) {
      setActionMessage({ type: "error", text: err.message || "Failed to restore products" });
    } finally {
      setLoading(false);
    }
  };

  // Categories list for filtering and form
  const existingCategories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
  const categoriesList = existingCategories.length > 0
    ? existingCategories
    : [
        "Cleaning Chemicals",
        "Cleaning Tools",
        "Cleaning Machines",
        "Housekeeping Consumables",
        "Housekeeping Equipment",
      ];

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Loading screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#071f16] flex items-center justify-center text-white p-4">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 text-[#c59b27] animate-spin" />
          <span className="font-semibold text-sm">Checking admin authorization...</span>
        </div>
      </div>
    );
  }

  // Not authenticated screen -> Admin Login Form
  if (!sessionUser) {
    return (
      <div className="min-h-screen bg-[#071f16] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#c59b27] transition-colors" />
            <span className="text-xs text-slate-400 group-hover:text-[#c59b27]">Back to Website</span>
          </Link>
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FAF2DB] to-white border-2 border-[#c59b27] flex items-center justify-center mx-auto shadow-xl">
            <Lock className="w-6 h-6 text-[#071f16]" />
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-white">
            DVS Admin Portal
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Sign in with your Supabase Admin account to manage products
          </p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
          <div className="bg-[#141414] py-8 px-6 shadow-2xl rounded-3xl border border-white/10 sm:px-10">
            {!isSupabaseConfigured && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Configuration Needed</span>
                </div>
                <p>
                  Add your <code className="bg-black/40 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
                  <code className="bg-black/40 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
                  <code className="text-[#e5c46b]">.env.local</code> to activate live Supabase authentication.
                </p>
              </div>
            )}

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@dvsfacilities.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#222] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#c59b27] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#222] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#c59b27] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loginSubmitting}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#071f16] font-black text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loginSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In as Admin</span>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center text-[11px] text-slate-400 space-y-1">
              <div>Admin credentials are saved in <code className="text-[#e5c46b] bg-black/40 px-1 py-0.5 rounded">.env.local</code></div>
              <div className="text-slate-500 text-[10px]">Variables: <code className="text-slate-400">ADMIN_EMAIL</code> and <code className="text-slate-400">ADMIN_PASSWORD</code></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#0d1612] text-white">
      {/* Top Navbar */}
      <header className="bg-[#141414] border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FAF2DB] to-white border border-[#c59b27] flex items-center justify-center text-[10px] font-black text-[#071f16]">
                DVS
              </div>
              <span className="font-bold text-sm text-white group-hover:text-[#c59b27] transition-colors">
                Admin <span className="text-[#c59b27]">Products</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#0e3b2e] border border-[#c59b27]/30 text-[#e5c46b] text-[11px] font-semibold">
              Live Supabase Backend
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products/housekeeping-material"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-xs text-slate-300 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#c59b27]" />
            </Link>

            <div className="text-right hidden md:block">
              <div className="text-xs text-slate-300 font-medium">{sessionUser.email}</div>
              <div className="text-[10px] text-slate-500">Authorized Admin</div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Banner Messages */}
        {actionMessage && (
          <div
            className={`p-4 rounded-2xl border text-sm flex items-center justify-between ${
              actionMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {actionMessage.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <span>{actionMessage.text}</span>
            </div>
            <button onClick={() => setActionMessage(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <Package className="w-6 h-6 text-[#c59b27]" />
              <span>Product Inventory</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage product names, descriptions, prices, categories, and images. All changes update dynamically on your live website.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleSeedDefaults}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0e3b2e] hover:bg-[#144f3e] border border-[#c59b27]/40 text-[#e5c46b] text-xs font-bold transition-all cursor-pointer shadow hover:brightness-110 active:scale-95"
              title="Restore initial 20 catalog products"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Reset 20 Default Catalog</span>
            </button>

            <button
              onClick={loadProducts}
              disabled={loading}
              className="p-2 rounded-xl bg-[#222] hover:bg-[#333] border border-white/10 text-slate-300 transition-colors cursor-pointer"
              title="Refresh product list"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#c59b27]" : ""}`} />
            </button>

            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#071f16] font-black text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#141414] p-3 rounded-2xl border border-white/10">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by product name, SKU, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#222] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#c59b27]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#222] border border-white/10 text-xs text-white focus:outline-none focus:border-[#c59b27]"
            >
              <option value="all">All Categories ({products.length})</option>
              {categoriesList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-[#141414] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-3">
              <RefreshCw className="w-5 h-5 text-[#c59b27] animate-spin" />
              <span>Loading products...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Package className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-bold text-slate-300">No products found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {products.length === 0
                  ? "Your products list is currently empty. Click 'Reset 20 Default Catalog' above to automatically restore your catalog!"
                  : "No products matched your search or category filter."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#1a1a1a] text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4">Product</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Stock Status</th>
                    <th className="py-3.5 px-4">Visibility</th>
                    <th className="py-3.5 px-4">SKU</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#222] border border-white/10 overflow-hidden relative shrink-0">
                            {prod.image_url ? (
                              <Image
                                src={prod.image_url}
                                alt={prod.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-600">
                                <Package className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white line-clamp-1">{prod.name}</div>
                            {prod.short_description && (
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                {prod.short_description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-[#0e3b2e] border border-[#c59b27]/30 text-[#e5c46b] text-[10px] font-bold">
                          {prod.category}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-semibold">
                        {prod.price ? (
                          <div className="text-white">
                            ₹{prod.price.toLocaleString("en-IN")}
                            {prod.original_price && (
                              <span className="ml-1 text-[10px] text-slate-500 line-through">
                                ₹{prod.original_price}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-500 italic text-[11px]">Enquiry only</span>
                        )}
                      </td>

                      {/* Quick stock status dropdown */}
                      <td className="py-3 px-4">
                        <select
                          value={prod.stock_status || "in_stock"}
                          onChange={(e) => handleChangeStockStatus(prod, e.target.value as any)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer bg-[#1c1c1c] ${
                            prod.stock_status === "out_of_stock"
                              ? "text-red-400 border-red-500/40"
                              : prod.stock_status === "low_stock"
                              ? "text-amber-300 border-amber-500/40"
                              : "text-emerald-400 border-emerald-500/40"
                          }`}
                        >
                          <option value="in_stock">In Stock</option>
                          <option value="low_stock">Low Stock</option>
                          <option value="out_of_stock">Out of Stock</option>
                        </select>
                      </td>

                      {/* 1-Click visibility toggle */}
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(prod)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all hover:scale-105 ${
                            prod.is_active
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                              : "bg-red-500/10 text-slate-400 border border-white/10 hover:bg-red-500/20"
                          }`}
                          title="Click to toggle Live / Hidden"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${prod.is_active ? "bg-emerald-400" : "bg-slate-500"}`} />
                          <span>{prod.is_active ? "Live" : "Hidden"}</span>
                        </button>
                      </td>

                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {prod.sku || "-"}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(prod)}
                            className="p-1.5 rounded-lg bg-[#222] hover:bg-[#333] hover:text-[#c59b27] text-slate-300 transition-colors cursor-pointer"
                            title="Edit product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#141414] rounded-3xl border border-[#c59b27]/30 max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-[#c59b27]" />
                <span>{editingProduct ? "Edit Product" : "Add New Product"}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#222] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Floor Cleaner Concentrate (5L)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#222] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#c59b27]"
                />
              </div>

              {/* Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#222] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c59b27]"
                  >
                    {categoriesList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="custom">+ Create New Category...</option>
                  </select>
                </div>

                {formData.category === "custom" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      New Category Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customCategory}
                      onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                      placeholder="e.g. Industrial Paper Products"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#222] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#c59b27]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="e.g. DVS-CHEM-001"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#222] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#c59b27]"
                  />
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Price (₹) <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 450"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#222] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#c59b27]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    placeholder="e.g. 599"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#222] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#c59b27]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Stock Status
                  </label>
                  <select
                    value={formData.stock_status}
                    onChange={(e) => setFormData({ ...formData, stock_status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#222] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c59b27]"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Short & Full Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="e.g. Hospital-grade 5L concentrated disinfectant"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#222] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#c59b27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional specifications, dilution ratios, pack size, safety info..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#222] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#c59b27]"
                />
              </div>

              {/* Image Upload (Cloudflare R2 Storage) */}
              <div className="p-4 rounded-2xl bg-[#1e1e1e] border border-white/10 space-y-3">
                <label className="block text-xs font-semibold text-slate-200">
                  Product Image (Cloudflare R2 Bucket: <code className="text-[#c59b27]">mechanic-images</code>)
                </label>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#292929] border border-white/10 overflow-hidden relative shrink-0">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <Upload className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0e3b2e] file:text-[#e5c46b] hover:file:bg-[#144f3e] cursor-pointer"
                    />
                    <div className="text-[10px] text-slate-500">
                      Uploads directly to Cloudflare R2 bucket. Or specify URL below:
                    </div>
                    <input
                      type="text"
                      placeholder="Or paste public Image URL"
                      value={formData.image_url}
                      onChange={(e) => {
                        setFormData({ ...formData, image_url: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-2.5 py-1 rounded-lg bg-[#292929] border border-white/10 text-[11px] text-slate-300 placeholder-slate-600 focus:outline-none focus:border-[#c59b27]"
                    />
                  </div>
                </div>
              </div>

              {/* Display Order & Active */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-400">Display Order:</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                    className="w-16 px-2 py-1 rounded-lg bg-[#222] border border-white/10 text-xs text-white text-center"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-[#c59b27] focus:ring-0 bg-[#222] border-white/20"
                  />
                  <span>Visible on Public Website</span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#222] hover:bg-[#333] text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#071f16] font-black text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {(saving || uploadingImage) && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingProduct ? "Save Changes" : "Create Product"}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
