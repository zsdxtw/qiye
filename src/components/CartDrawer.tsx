import { useCartStore } from "@/store/cartStore";
import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const fmt = (n: number) => `¥${n.toLocaleString()}`;

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, clearCart, getTotalAmount } = useCartStore();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const totalAmount = getTotalAmount();
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      clearCart();
      setSubmitted(false);
      closeCart();
      navigate("/mall?tab=orders");
    }, 1500);
  };

  return (
    <>
      {/* 遮罩 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 animate-fade-in"
          onClick={closeCart}
        />
      )}

      {/* 抽屉 */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[400px] bg-white shadow-float z-50 flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="text-h3 font-semibold text-ink">采购清单</span>
            <span className="qj-badge bg-primary-50 text-primary">{totalQty}件</span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-ink-soft" />
          </button>
        </div>

        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-success" />
            </div>
            <div className="text-h3 font-semibold text-ink mb-1">采购申请已提交</div>
            <div className="text-caption text-ink-mute">订单已进入审批流程，可在"我的订单"查看进度</div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-ink-mute" />
            </div>
            <div className="text-body text-ink font-medium mb-1">采购清单为空</div>
            <div className="text-caption text-ink-mute">快去挑选企业所需商品吧</div>
          </div>
        ) : (
          <>
            {/* 商品列表 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-card">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-3 flex gap-3 shadow-card">
                  {/* 商品图标 */}
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <ShoppingBag className="w-7 h-7" style={{ color: item.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-caption text-ink font-medium line-clamp-2 mb-1">{item.name}</div>
                    <div className="text-mini text-ink-mute mb-2">{item.unit}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-body tnum font-semibold text-danger">{fmt(item.price)}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center tnum text-body text-ink font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-6 h-6 rounded-md flex items-center justify-center text-ink-mute hover:text-danger hover:bg-red-50 transition-colors ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 底部结算 */}
            <div className="border-t border-gray-100 p-4 shrink-0 space-y-3">
              <div className="flex items-center justify-between text-caption">
                <span className="text-ink-mute">商品总数</span>
                <span className="tnum text-ink font-medium">{totalQty} 件</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body text-ink-soft">合计金额</span>
                <span className="text-h2 tnum font-bold text-danger">{fmt(totalAmount)}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearCart}
                  className="px-4 py-2.5 rounded-lg text-caption text-ink-mute border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  清空
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 h-11 bg-primary text-white rounded-lg text-body font-medium hover:bg-primary-light hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  提交采购申请
                </button>
              </div>
              <div className="text-mini text-ink-mute text-center">企业内部采购 · 提交后进入审批流程</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
