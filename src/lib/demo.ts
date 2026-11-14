export const social = {
  telegram: "https://t.me/folioterminal",
  x: "https://x.com/folioterminal?s=11",
};

export type DemoToken = {
  symbol: string; name: string; price: number; change: number;
  volume: string; cap: string; color: string; seed: number;
};

// Fictional, fixed examples. No network requests or market connections.
export const tokens: DemoToken[] = [
  { symbol: "NOVA", name: "Nova Protocol", price: 2.847, change: 12.84, volume: "$1.24M", cap: "$28.4M", color: "#83e6b5", seed: 3 },
  { symbol: "VYNE", name: "Vyne Network", price: 0.6382, change: 8.62, volume: "$842.6K", cap: "$6.38M", color: "#b3a4f3", seed: 8 },
  { symbol: "AURA", name: "Aura Finance", price: 1.294, change: -2.31, volume: "$614.2K", cap: "$12.9M", color: "#f0c78a", seed: 14 },
  { symbol: "FLUX", name: "Flux Labs", price: 0.0824, change: 24.16, volume: "$486.1K", cap: "$8.24M", color: "#88bfe6", seed: 23 },
  { symbol: "ORBT", name: "Orbit Protocol", price: 4.126, change: 5.47, volume: "$328.4K", cap: "$41.2M", color: "#e8a2c1", seed: 31 },
];

export const activity = [
  { wallet: "0x7a4…c92f", action: "Buy", amount: "$12,480", time: "14:32:08" },
  { wallet: "0x8f1…a38b", action: "Buy", amount: "$8,240", time: "14:31:52" },
  { wallet: "0x3c9…d71a", action: "Sell", amount: "$4,680", time: "14:31:21" },
];

export function candles(seed: number, count = 48) {
  return Array.from({ length: count }, (_, i) => {
    const base = 158 - i * 2.05 + Math.sin(i * 0.52 + seed) * 20 + Math.sin(i * 1.8 + seed) * 5;
    const up = Math.sin(i * 2.3 + seed) > -0.35;
    const size = 5 + Math.abs(Math.sin(i * 1.6 + seed)) * 17;
    return { x: 12 + i * 11, y: base, size, up, volume: 7 + Math.abs(Math.sin(i * 2.7 + seed)) * 23 + i * 0.27 };
  });
}
