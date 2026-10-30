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
  imageUrls?: string[];
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
    label: "天井走行式",
    category: "天井走行式リフト",
    items: [
      { name: "バスケアリフト", youtubeId: "5WOLvvlLieU", detail: "１６００ｘ９００等の狭い浴室から２メートルを超える広い浴室まで対応致します。手元スイッチで上下、左右が電動移動し、前後に手動移動します。吊り具はバスキャリー（動画）、トイレキャリー、スリングシートなど状態に合わせて多様に選べます。" },
      { name: "ホームケアリフト", youtubeId: "qIJC7gorIgE", detail: "壁の張りや家具に合わせて柱の位置を設定出来ます。手元スイッチで上下、左右が電動移動し、前後に手動移動します。（お一人での移乗最適なレール固定タイプもあります。）" }
    ]
  },
  {
    id: "lift-mobile",
    label: "移動用",
    category: "移動式リフト",
    items: [
      { name: "B・Bレボル", youtubeId: "JS_zwS9TUUg", detail: "玄関、室内、トイレ、浴室など設置方法は多種多様で設置場所を選びません。設置した柱を軸に最大６メートルの移動が可能です。（ご覧の動画は上記の最大のタイプを使用しております。）操作は上昇、下降のみが電動で、移動は手動となります。設置方法は「アンカーで固定する方式」からビス類を壁等に一切使用しない「突っ張り方式」など様々です。賃貸物件においても安心してご使用いただけます。" },
      { name: "走行式リフト ベンリー", youtubeId: "fY7yxA8X-w8", detail: "車、ベッド、車いすへの移乗、吊具を変えて床からの吊り上げもでき、電動脚部アームの開閉により吊り上げ状態での狭い廊下移動やトイレへの移乗が可能です。軽量でコンパクトに折り畳めるので手軽に持ち運びができ、全国への配送や、車に載せて旅先使用もできます。場所をとらないので居室に専用収納スペースも不要です。" }
    ]
  },
  {
    id: "stretcher",
    label: "入浴担架",
    category: "入浴担架シリーズ",
    items: [
      {
        name: "バスキャリー",
        isPhoto: true,
        types: ["リクライニング", "チルト", "フラット"],
        imageUrls: ["/img/reclining.jpg", "/img/tilt.jpg", "/img/flat.jpg"],
        detail: "使用する方の状態に合わせてお選び頂けます。イスとキャリア部分は分離します。イス型タイプの吊り具で使用者が一人で安全にご入浴できます。"
      },
      {
        name: "トイレキャリー",
        isPhoto: true,
        imageUrls: ["/img/toilet.jpg"],
        detail: "お風呂での入浴介助時にご使用いただけます。 また、既存のトイレにそのままはめ込み、ご使用いただけます。４輪キャスターでその場旋回が可能、小回りが利きます。イスとキャリア部分は分離します。イス型タイプの吊り具で使用者が一人で安全にご入浴できます。"
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
    <main onScroll={handleScroll} className="h-screen overflow-y-scroll  scroll-smooth bg-[#faf9f6]">

      {/* ナビゲーション */}
      {/* --- ナビゲーション (手書きラフ準拠: TOP / 3×3商材グリッド / お問い合わせ) --- */}
      {/* --- ナビゲーション (カテゴリ枠グルーピング & スマホ操作性改善版) --- */}
      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[100] w-[96%] max-w-2xl pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md border border-sky-100 p-2 md:p-3 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-stretch justify-between gap-1.5 md:gap-3 pointer-events-auto">

          {/* ① 左: TOPへ */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex flex-col items-center justify-center w-12 md:w-16 rounded-2xl bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white transition-all shrink-0 border border-sky-100 shadow-sm group"
            title="トップへ"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[9px] md:text-[10px] font-black mt-1">TOP</span>
          </button>

          {/* ② 中央: 3カラム（カテゴリ別のカード枠グルーピング） */}
          <div className="flex-1 grid grid-cols-3 gap-1 md:gap-2">

            {/* --- グループ1: 天井走行式 --- */}
            <div className="flex flex-col bg-sky-100/90 border border-slate-200/80 rounded-xl md:rounded-2xl p-1 md:p-1.5 gap-1">
              {/* 見出し (リンクなし・ラベル) */}
              <div className="text-[9px] md:text-xs font-black text-sky-800 text-center py-0.5 tracking-tight border-b border-slate-200/60 select-none">
                天井走行式
              </div>
              {/* 商材ボタン */}
              <button
                onClick={() => scrollToSection("天井走行式リフト")}
                className="flex-1 min-h-[34px] md:min-h-[30px] flex items-center justify-center text-[9px] md:text-[11px] font-bold text-slate-700 bg-white hover:bg-sky-500 hover:text-white rounded-lg border border-slate-200/80 shadow-sm transition-all active:scale-95 leading-tight text-center px-0.5"
              >
                バスケア
              </button>
              <button
                onClick={() => scrollToSection("product-ホームケアリフト")}
                className="flex-1 min-h-[34px] md:min-h-[30px] flex items-center justify-center text-[9px] md:text-[11px] font-bold text-slate-700 bg-white hover:bg-sky-500 hover:text-white rounded-lg border border-slate-200/80 shadow-sm transition-all active:scale-95 leading-tight text-center px-0.5"
              >
                ホームケア
              </button>
            </div>

            {/* --- グループ2: 移動用 --- */}
            <div className="flex flex-col bg-sky-100/90 border border-slate-200/80 rounded-xl md:rounded-2xl p-1 md:p-1.5 gap-1">
              {/* 見出し */}
              <div className="text-[9px] md:text-xs font-black text-sky-800 text-center py-0.5 tracking-tight border-b border-slate-200/60 select-none">
                移動用
              </div>
              {/* 商材ボタン */}
              <button
                onClick={() => scrollToSection("移動式リフト")}
                className="flex-1 min-h-[34px] md:min-h-[30px] flex items-center justify-center text-[9px] md:text-[11px] font-bold text-slate-700 bg-white hover:bg-sky-500 hover:text-white rounded-lg border border-slate-200/80 shadow-sm transition-all active:scale-95 leading-tight text-center px-0.5"
              >
                B・Bレボル
              </button>
              <button
                onClick={() => scrollToSection("product-走行式リフト ベンリー")}
                className="flex-1 min-h-[34px] md:min-h-[30px] flex items-center justify-center text-[9px] md:text-[11px] font-bold text-slate-700 bg-white hover:bg-sky-500 hover:text-white rounded-lg border border-slate-200/80 shadow-sm transition-all active:scale-95 leading-tight text-center px-0.5"
              >
                ベンリー
              </button>
            </div>

            {/* --- グループ3: 入浴担架 --- */}
            <div className="flex flex-col bg-sky-100/90 border border-slate-200/80 rounded-xl md:rounded-2xl p-1 md:p-1.5 gap-1">
              {/* 見出し */}
              <div className="text-[9px] md:text-xs font-black text-sky-800 text-center py-0.5 tracking-tight border-b border-slate-200/60 select-none">
                入浴担架
              </div>
              {/* 商材ボタン */}
              <button
                onClick={() => scrollToSection("入浴担架シリーズ")}
                className="flex-1 min-h-[34px] md:min-h-[30px] flex items-center justify-center text-[9px] md:text-[11px] font-bold text-slate-700 bg-white hover:bg-sky-500 hover:text-white rounded-lg border border-slate-200/80 shadow-sm transition-all active:scale-95 leading-tight text-center px-0.5"
              >
                バスキャリー
              </button>
              <button
                onClick={() => scrollToSection("product-トイレキャリー")}
                className="flex-1 min-h-[34px] md:min-h-[30px] flex items-center justify-center text-[9px] md:text-[11px] font-bold text-slate-700 bg-white hover:bg-sky-500 hover:text-white rounded-lg border border-slate-200/80 shadow-sm transition-all active:scale-95 leading-tight text-center px-0.5"
              >
                トイレキャリー
              </button>
            </div>

          </div>

          {/* ③ 右: お問い合わせへ */}
          <button
            onClick={() => scrollToSection("contact")}
            className="flex flex-col items-center justify-center w-12 md:w-16 rounded-2xl bg-sky-500 text-white hover:bg-sky-600 transition-all shrink-0 shadow-md group"
            title="お問い合わせ"
          >
            <Phone className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] md:text-[10px] font-black mt-1">問合せ</span>
          </button>

        </div>
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 px-6">
          <p className="text-sm md:text-base font-medium tracking-wide text-center md:text-left">
            &copy; 2026 株式会社ビック・バン. All rights reserved.
          </p>
        </div>
      </nav>
      {/* --- HERO --- */}
      <section id="hero" className="min-h-screen w-full relative overflow-hidden flex flex-col justify-center">
        {/* 背景4分割グラデーション */}
        <div className="absolute inset-0 flex flex-col pointer-events-none z-0">
          {[
            { bg: "bg-sky-50", delay: 0 },
            { bg: "bg-sky-100", delay: 0.1 },
            { bg: "bg-sky-200", delay: 0.2 },
            { bg: "bg-sky-300", delay: 0.3 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.8, delay: item.delay, ease: "easeOut" }}
              className={`w-full flex-1 ${item.bg}`}
            />
          ))}
        </div>

        <div className="relative z-10 px-8 max-w-6xl mx-auto w-full pt-12">
          <p className="text-xl font-bold text-sky-700 tracking-[0.4em] mb-4 uppercase">株式会社 ビック・バン</p>
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-slate-900 leading-tight">
            住まいをキズつけない<br />
            <span className="text-sky-500">快適介護リフト</span>
          </h2>
          <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md w-fit px-5 py-2.5 rounded-full border border-white/50">
            <Heart className="w-4 h-4 fill-sky-500 text-sky-500" />
            <p className="font-bold text-sky-600 tracking-widest uppercase font-mono">
              東京都２３区、郊外にお住まいの方は助成制度により取り付けができます
            </p>
          </div>
        </div>
      </section>

      {/* --- CONCEPT / MESSAGE SECTION --- */}
      <section
        id="concept"
        className="min-h-screen w-full snap-start relative overflow-hidden flex flex-col justify-end bg-slate-900"
      >
        {/* 背景画像：スマホの縦長比率にぴったりフィットさせてズーム演出 */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0.8 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 w-full h-full"
        >
          {/* 画像パスは適宜調整してください（例: /images/lift1.jpg） */}
          <img
            src="/img/lift1.jpg"
            alt="天井走行式リフト利用風景"
            className="w-full h-full object-cover object-[center_40%]"
          />
          {/* 写真下部を文字となじませるためのグラデーション */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        </motion.div>

        {/* 前面：すりガラスメッセージカード (スマホ下部固定風) */}
        <div className="relative z-10 w-full max-w-xl mx-auto px-5 pb-28 md:pb-32">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white/85 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-white/60 shadow-2xl"
          >
            {/* バッジ */}
            <div className="inline-flex items-center gap-1.5 bg-sky-500/10 text-sky-600 px-3 py-1 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase mb-3">
              <span>Easy & Safe Operation</span>
            </div>

            {/* キャッチコピー */}
            <h3 className="text-xl md:text-3xl font-black text-slate-800 tracking-tight leading-snug mb-3">
              手元のボタンひとつで、<br />
              <span className="text-sky-500">行きたい場所へ、安全に。</span>
            </h3>

            {/* 本文 */}
            <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed">
              操作はすべて手元のリモコンを押すだけ。お身体が不自由な方でも、ご自身の力でベッドから車いす、浴室やトイレへの移動が可能です。住まいをキズつけず、毎日の暮らしに自由と笑顔をお届けします。
            </p>

            {/* 小さなポイントアイコン列 */}
            <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-200/60 text-center">
              <div>
                <p className="text-x font-black text-slate-700">簡単ボタン</p>
              </div>
              <div className="border-x border-slate-200/60">
                <p className="text-x font-black text-slate-700">防水・安心構造</p>
              </div>
              <div>
                <p className="text-x font-black text-sky-600">ビス打ち不要</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PRODUCT SECTIONS --- */}
      {sections.slice(1, -1).map((group) => (
        <section
          id={group.id}
          key={group.id}
          className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fafff6] py-[1vh] md:py-[2vh] px-6"
        >
          <div className="max-w-6xl mx-auto w-full flex flex-col">

            <div className="mb-12">
              <h3 id={group.category} className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">{group.category}</h3>
            </div>

            {group.items.map((item, idx) => (
              <div
                key={idx}
                id={`product-${item.name}`}
                className="space-y-8 border-l-2 border-sky-200 pl-6 md:pl-16 flex flex-col"
              >
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
                      {(item.imageUrls || (item.isPhoto ? ["/img/default.jpg"] : ["製品写真"])).map((url, i) => (
                        <div key={i} className="bg-white border border-slate-100 flex flex-col items-center justify-center p-6 shadow-sm">
                          <img src={url} alt={item.name} className="w-full h-full object-cover rounded-md" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="max-w-3xl pt-4 pb-20">
                  <button
                    onClick={() => setOpenItem(openItem === `${group.id}-${idx}` ? null : `${group.id}-${idx}`)}
                    className="flex items-center gap-2 text-xs font-black text-sky-600 uppercase tracking-[0.2em] py-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform flex items-center gap-2 text-xl">
                      {openItem === `${group.id}-${idx}` ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      製品情報はここをクリック
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
        </section>
      ))}

      {/* --- CONTACT --- */}
      <section id="contact" className="min-h-screen w-full  flex items-center justify-center px-6 bg-white py-24 md:py-0">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 uppercase tracking-tighter leading-none text-left">お問い合わせ</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-sky-400 mt-1 shrink-0 w-6 h-6" />
                <img src="/img/AD.png" alt="住所" />
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-sky-400 shrink-0 w-6 h-6" />
                <img src="/img/TEL.png" alt="電話番号" />
              </div>
              <div className="flex items-center gap-4">
                FAX
                <img src="/img/FAX.png" alt="FAX" />
              </div>
            </div>
            <button className="w-full max-w-sm bg-sky-500 text-white p-8 rounded-[2rem] font-black text-xl shadow-2xl flex items-center justify-between px-10 active:scale-95 transition-all">
              <span>総合カタログ (PDF)</span>
              <FileText className="w-8 h-8" />
            </button>
          </div>
          <div className="hidden md:flex h-[500px] w-full bg-slate-50 rounded-[4rem] items-center justify-center border-8 border-slate-50 shadow-inner">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202.8282213067656!2d139.6942712854299!3d35.5721827676127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018600902ac07e9%3A0xaf5ebfa7427b0800!2z44CSMTQ2LTAwODMg5p2x5Lqs6YO95aSn55Sw5Yy65Y2D6bOl77yR5LiB55uu77yR77yX4oiS77yW!5e0!3m2!1sja!2sjp!4v1793359851469!5m2!1sja!2sjp"></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
