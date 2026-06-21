import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import CartDrawer from "@/components/CartDrawer";
import OrdersTab from "@/pages/mall/OrdersTab";
import { useCartStore } from "@/store/cartStore";
import { categories, products, banners, mallStats, type Product } from "@/mock/mall";
import {
  ShoppingCart,
  Search,
  ShoppingBag,
  Star,
  Plus,
  TrendingUp,
  Clock,
  Package,
  Heart,
  Grid3x3,
  Briefcase,
  Coffee,
  Smartphone,
  Home,
  Gift,
  UtensilsCrossed,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Grid3x3,
  Briefcase,
  Coffee,
  Smartphone,
  Home,
  Gift,
  UtensilsCrossed,
  ShoppingCart,
  Clock,
  Package,
  Heart,
};

const fmt = (n: number) => `¥${n.toLocaleString()}`;

export default function Mall() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "orders" ? "orders" : "shop";
  const [activeTab, setActiveTab] = useState<"shop" | "orders">(initialTab);
  const [activeCategory, setActiveCategory] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "sales" | "price">("default");
  const { addItem, getTotalQty, openCart } = useCartStore();

  const cartQty = getTotalQty();

  const filteredProducts = useMemo(() => {
    let list = products;
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (keyword) {
      list = list.filter((p) => p.name.includes(keyword) || p.categoryName.includes(keyword));
    }
    if (sortBy === "sales") {
      list = [...list].sort((a, b) => b.sales - a.sales);
    } else if (sortBy === "price") {
      list = [...list].sort((a, b) => a.price - b.price);
    }
    return list;
  }, [activeCategory, keyword, sortBy]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  const switchTab = (tab: "shop" | "orders") => {
    setActiveTab(tab);
    setSearchParams(tab === "orders" ? { tab: "orders" } : {});
  };

  return (
    <div className="p-6 space-y-5">
      <PageHeader
        title="企业内部商城"
        subtitle="办公用品 · 茶礼品 · 数码电子 · 商务礼品 · 一站式企业采购"
        actions={
          <button
            onClick={openCart}
            className="relative qj-btn-primary flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            采购清单
            {cartQty > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-danger text-white text-mini rounded-full flex items-center justify-center tnum">
                {cartQty}
              </span>
            )}
          </button>
        }
      />

      {/* 统计卡 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mallStats.map((stat) => {
          const Icon = iconMap[stat.icon] || Package;
          const trendColor = stat.trend === "up" ? "text-success" : "text-ink-mute";
          return (
            <div key={stat.label} className="qj-card p-4 flex items-center gap-3 hover:shadow-float transition-all">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="flex items-end gap-1.5">
                  <span className="text-h2 tnum font-bold text-ink">{stat.value}</span>
                  {stat.change !== 0 && (
                    <span className={cn("text-mini tnum pb-1", trendColor)}>
                      {stat.trend === "up" ? "+" : ""}
                      {stat.change}%
                    </span>
                  )}
                </div>
                <div className="text-mini text-ink-mute">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab 切换 */}
      <div className="qj-card p-1.5 flex items-center gap-1 w-fit">
        <button
          onClick={() => switchTab("shop")}
          className={cn(
            "flex items-center gap-2 px-5 py-2 rounded-lg text-body font-medium transition-all",
            activeTab === "shop" ? "bg-primary text-white shadow-md" : "text-ink-soft hover:bg-card"
          )}
        >
          <ShoppingBag className="w-4 h-4" /> 商品选购
        </button>
        <button
          onClick={() => switchTab("orders")}
          className={cn(
            "flex items-center gap-2 px-5 py-2 rounded-lg text-body font-medium transition-all",
            activeTab === "orders" ? "bg-primary text-white shadow-md" : "text-ink-soft hover:bg-card"
          )}
        >
          <Package className="w-4 h-4" /> 我的订单
        </button>
      </div>

      {/* 内容区 */}
      {activeTab === "orders" ? (
        <OrdersTab />
      ) : (
        <div className="space-y-5">
          {/* 轮播图 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="relative h-32 rounded-card overflow-hidden p-5 flex flex-col justify-between text-white cursor-pointer hover:scale-[1.02] transition-transform"
                style={{ background: banner.bg }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/3 -translate-y-1/3" />
                <div className="relative">
                  <span className="qj-badge bg-white/20 text-white mb-2">{banner.tag}</span>
                  <div className="text-h3 font-bold">{banner.title}</div>
                  <div className="text-caption text-white/80 mt-1">{banner.subtitle}</div>
                </div>
                <div className="relative flex items-center gap-1 text-mini text-white/70">
                  立即选购 <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>

          {/* 分类导航 */}
          <div className="qj-card p-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => {
                const Icon = iconMap[cat.icon] || Grid3x3;
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-caption font-medium whitespace-nowrap transition-all",
                      active
                        ? "bg-primary text-white shadow-md"
                        : "text-ink-soft hover:bg-card"
                    )}
                  >
                    <Icon className="w-4 h-4" strokeWidth={2} />
                    {cat.name}
                    {cat.count && (
                      <span className={cn("text-mini tnum", active ? "text-white/70" : "text-ink-mute")}>
                        {cat.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 搜索 + 排序 */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索商品名称、分类..."
                className="w-full h-10 pl-9 pr-4 bg-white rounded-lg text-caption text-ink placeholder:text-ink-mute border border-gray-100 focus:border-primary focus:outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-100">
              {[
                { key: "default", label: "综合" },
                { key: "sales", label: "销量" },
                { key: "price", label: "价格" },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSortBy(s.key as typeof sortBy)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-caption font-medium transition-all",
                    sortBy === s.key ? "bg-primary text-white" : "text-ink-soft hover:bg-card"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="text-caption text-ink-mute ml-auto">
              共 <span className="tnum text-primary font-medium">{filteredProducts.length}</span> 件商品
            </div>
          </div>

          {/* 商品网格 */}
          {filteredProducts.length === 0 ? (
            <div className="qj-card p-12 text-center">
              <Search className="w-10 h-10 text-ink-mute mx-auto mb-3" />
              <div className="text-body text-ink font-medium mb-1">未找到相关商品</div>
              <div className="text-caption text-ink-mute">试试其他关键词或分类</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="qj-card overflow-hidden hover:shadow-float transition-all group"
                >
                  {/* 商品图区 */}
                  <div
                    className="relative h-40 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${product.color}08 0%, ${product.color}15 100%)` }}
                  >
                    <ShoppingBag
                      className="w-16 h-16 group-hover:scale-110 transition-transform"
                      style={{ color: product.color }}
                      strokeWidth={1.5}
                    />
                    {/* 标签 */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.hot && (
                        <span className="qj-badge bg-danger text-white">热销</span>
                      )}
                      {product.new && (
                        <span className="qj-badge bg-success text-white">新品</span>
                      )}
                      {product.originalPrice && (
                        <span className="qj-badge bg-accent text-primary-dark">特惠</span>
                      )}
                    </div>
                    {/* 收藏 */}
                    <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                      <Heart className="w-3.5 h-3.5 text-ink-mute hover:text-danger" />
                    </button>
                  </div>

                  {/* 商品信息 */}
                  <div className="p-4">
                    <div className="text-mini text-ink-mute mb-1">{product.categoryName}</div>
                    <h3 className="text-body text-ink font-medium line-clamp-2 mb-2 min-h-[44px] leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-mini text-ink-mute line-clamp-1 mb-3">{product.desc}</p>

                    {/* 评分销量 */}
                    <div className="flex items-center gap-3 mb-3 text-mini text-ink-mute">
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-accent fill-accent" />
                        <span className="tnum text-ink-soft">{product.rating}</span>
                      </span>
                      <span>已售 <span className="tnum text-ink-soft">{product.sales}</span></span>
                      <span>库存 <span className="tnum text-ink-soft">{product.stock}</span></span>
                    </div>

                    {/* 价格 + 加购 */}
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="flex items-end gap-1.5">
                          <span className="text-h2 tnum font-bold text-danger">{fmt(product.price)}</span>
                          <span className="text-mini text-ink-mute pb-0.5">/{product.unit}</span>
                        </div>
                        {product.originalPrice && (
                          <span className="text-mini text-ink-mute line-through tnum">
                            {fmt(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary-light hover:shadow-md transition-all active:scale-95"
                      >
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 推荐区 */}
          {activeCategory === "all" && !keyword && (
            <div className="qj-card p-5">
              <h3 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" /> 企业常采购
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {products.filter((p) => p.hot).slice(0, 6).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleAddToCart(p)}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-card transition-colors group"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${p.color}15`, color: p.color }}
                    >
                      <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <span className="text-mini text-ink-soft text-center line-clamp-2">{p.name}</span>
                    <span className="text-mini tnum text-danger font-medium">{fmt(p.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 购物车抽屉 */}
      <CartDrawer />
    </div>
  );
}
