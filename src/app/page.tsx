"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronDown,
  FileText, 
  ArrowDown, 
  Heart, 
  MapPin,
  Phone,
  Image as ImageIcon
} from "lucide-react";

// --- データ構造 ---
type ProductItem = {
  name: string;
  youtubeId?: string;
  types?: string[];
  isPhoto?: boolean;
  detail: string;
};

type ProductSection = {
  id: string;
  label: string;
  category: string;
  items: ProductItem[];
};

const sections: ProductSection[] = [
  { id: "hero", label: "ホーム", category: "", items: [] },
  {
    id: "lift-ceiling",
    label: "天井リフト",
    category: "天井走行式リフト",
    items: [
      { name: "バスケアリフト", youtubeId: "5WOLvvlLieU", detail: "浴室での介助に特化したフラッグシップモデル。" },
      { name: "ホームケアリフト", youtubeId: "dQw4w9WgXcQ", detail: "居室での移動をスムーズにする家庭用モデル。" }
    ]
  },
  {
    id: "lift-mobile",
    label: "移動リフト",
    category: "移動式リフト",
    items: [
      { name: "B・Bレボル", youtubeId: "dQw4w9WgXcQ", detail: "小回りのきく電動昇降式移動リフト。" },
      { name: "走行式リフト ベンリー", youtubeId: "dQw4w9WgXcQ", detail: "安定感抜群の走行性能を誇るスタンダードモデル。" }
    ]
  },
  {
    id: "stretcher",
    label: "入浴・トイレ",
    category: "入浴担架・排泄支援",
    items: [
      { 
        name: "バスキャリー", 
        types: ["リクライニング", "チルト", "フラット"], 
        detail: "ご利用者の姿勢に合わせて選べる3タイプを展開。ステンレス製で清潔に保てます。" 
      },
      { 
        name: "トイレキャリー", 
        isPhoto: true, 
        detail: "トイレへの移乗と排泄をサポートする専用設計。小回りがきき、ご家庭のトイレでも使用可能です。" 
      }
    ]
  },
  { id: "contact", label: "アクセス", category: "", items: [] },
];

export default function Home() {
  const [activeId, setActiveId] = useState("hero");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const windowHeight = window.innerHeight;
    const index = Math.round(scrollTop / windowHeight);
    if (sections[index]) setActiveId(sections[index].id);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main onScroll={handleScroll} className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#faf9f6]">
      
      {/* ナビゲーション */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[94%] max-w-xl">
        <div className="bg-white/95 backdrop-blur-md border border-sky-100 p-1.5 rounded-[2rem] shadow-2xl flex justify-between items-center px-2">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-2.5 rounded-full text-[10px] md:text-sm font-black transition-all ${
                activeId === item.id ? "bg-sky-400 text-white shadow-md" : "text-slate-400 hover:text-sky-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* --- HERO --- */}
      <section id="hero" className="min-h-screen w-full snap-start relative overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 flex flex-col pointer-events-none">
          {["bg-sky-50", "bg-sky-100", "bg-sky-200", "bg-sky-300"].map((color, i) => (
            <motion.div key={i} initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }} className={`flex-1 ${color}`} />
          ))}
        </div>
        <div className="relative z-10 px-8 max-w-6xl mx-auto w-full pt-12">
          <p className="text-xs font-bold text-sky-700 tracking-[0.4em] mb-4 uppercase">株式会社 ビック・バン</p>
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-slate-900 leading-tight">
            抱え上げない。<br /><span className="text-sky-500">だから、笑い合える。</span>
          </h2>
          <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md w-fit px-5 py-2.5 rounded-full border border-white/50">
            <Heart className="w-4 h-4 fill-sky-500 text-sky-500" />
            <p className="text-[10px] font-bold text-sky-600 tracking-widest uppercase italic font-mono">Care & Tech</p>
          </div>
        </div>
      </section>

      {/* --- PRODUCT SECTIONS --- */}
      {sections.slice(1, -1).map((group) => (
        <section 
          id={group.id} 
          key={group.id} 
          className="min-h-screen w-full snap-start flex flex-col items-center justify-center bg-[#faf9f6] py-[15vh] md:py-[20vh] px-6"
        >
          <div className="max-w-6xl mx-auto w-full flex flex-col">
            
            <div className="mb-12">
              <span className="text-sky-500 font-black text-[10px] tracking-widest uppercase italic">{group.category}</span>
              <h3 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">{group.label}シリーズ</h3>
            </div>

            <div className="space-y-24 md:space-y-40">
              {group.items.map((item, idx) => (
                <div key={idx} className="space-y-8 border-l-2 border-sky-200 pl-6 md:pl-16 flex flex-col">
                  <h4 className="text-2xl md:text-4xl font-black text-slate-700 italic underline decoration-sky-300 decoration-2 underline-offset-8 mb-4">
                    {item.name}
                  </h4>

                  <div className="w-full max-w-5xl">
                    {item.youtubeId ? (
                      /* Safari対策: 親に flex-shrink-0 と min-h を指定 */
                      <div className="w-full md:max-w-3xl flex-shrink-0">
                        <div className="relative w-full overflow-hidden bg-black shadow-2xl" style={{ paddingTop: '56.25%', minHeight: '1px' }}>
                          <iframe 
                            className="absolute top-0 left-0 w-full h-full border-0"
                            src={`https://www.youtube.com/embed/${item.youtubeId}?modestbranding=1&rel=0`}
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {(item.types || ["製品写真"]).map((t, i) => (
                          <div key={i} className="aspect-video sm:aspect-[4/3] bg-white border border-slate-100 flex flex-col items-center justify-center p-6 shadow-sm">
                            <ImageIcon className="text-slate-200 w-10 h-10 mb-3" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter text-center">{t}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="max-w-3xl pt-4">
                    <button 
                      onClick={() => setOpenItem(openItem === `${group.id}-${idx}` ? null : `${group.id}-${idx}`)}
                      className="flex items-center gap-2 text-xs font-black text-sky-600 uppercase tracking-[0.2em] py-2 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform flex items-center gap-2 italic">
                        {openItem === `${group.id}-${idx}` ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        Details & Spec
                      </span>
                    </button>
                    <AnimatePresence>
                      {openItem === `${group.id}-${idx}` && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="py-8 text-slate-500 text-sm md:text-lg leading-relaxed border-t border-sky-100 mt-4 font-medium">
                            {item.detail}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* --- CONTACT --- */}
      <section id="contact" className="min-h-screen w-full snap-start flex items-center justify-center px-6 bg-white py-24 md:py-0">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-8xl font-black text-slate-800 uppercase italic tracking-tighter leading-none text-left">Contact<br />& Access</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-sky-400 mt-1 shrink-0 w-6 h-6" />
                <p className="text-base md:text-2xl font-bold text-slate-600 leading-snug">〒154-0012<br />東京都世田谷区駒沢2-16-18<br />ロックダムコート 302</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-sky-400 shrink-0 w-6 h-6" />
                <p className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter">03-5431-3151</p>
              </div>
            </div>
            <button className="w-full max-w-sm bg-sky-500 text-white p-8 rounded-[2rem] font-black text-xl shadow-2xl flex items-center justify-between px-10 active:scale-95 transition-all">
              <span>総合カタログ (PDF)</span>
              <FileText className="w-8 h-8" />
            </button>
          </div>
          <div className="hidden md:flex h-[500px] w-full bg-slate-50 rounded-[4rem] items-center justify-center border-8 border-slate-50 shadow-inner">
             <span className="text-slate-200 font-black tracking-widest uppercase italic text-3xl">Google Map</span>
          </div>
        </div>
      </section>
    </main>
  );
}