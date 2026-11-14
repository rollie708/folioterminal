import { candles } from "@/lib/demo";

export function Chart({ seed = 3, volume = true, label = "Fictional token candlestick chart" }: { seed?: number; volume?: boolean; label?: string }) {
  const data = candles(seed);
  return <svg className="candle-chart" viewBox="0 0 590 248" role="img" aria-label={`${label}. Demo data, not live prices.`}>
    {[35, 80, 125, 170, 215].map((y, i) => <g key={y}><line x1="0" y1={y} x2="538" y2={y} stroke="#19271f" strokeDasharray="3 5"/><text x="547" y={y + 3} fill="#91a49a" fontSize="8" fontFamily="monospace">{(3.2 - i * 0.2).toFixed(2)}</text></g>)}
    {[80, 180, 280, 380, 480].map(x => <line key={x} x1={x} x2={x} y1="8" y2="222" stroke="#14221b"/>)}
    <path d="M8 191 C65 189 55 161 108 170 S170 126 215 144 S280 110 320 111 S400 97 448 86 S500 61 535 65" stroke="#d9bd77" strokeWidth="1.2" opacity=".6" fill="none"/>
    {data.map((c, i) => <g key={i} fill={c.up ? "#36cd8d" : "#d57e7e"} stroke={c.up ? "#36cd8d" : "#d57e7e"}><line x1={c.x + 3} x2={c.x + 3} y1={c.y - 6} y2={c.y + c.size + 8} strokeWidth="1"/><rect x={c.x} y={c.y} width="6" height={c.size} rx=".5" stroke="none"/>{volume && <rect x={c.x} y={224 - c.volume} width="6" height={c.volume} opacity=".18" stroke="none"/>}</g>)}
    <line x1="0" x2="538" y1="74" y2="74" stroke="#19c784" strokeDasharray="3 4" opacity=".6"/>
    {["08:00", "10:00", "12:00", "14:00", "16:00"].map((t, i) => <text key={t} x={15 + i * 119} y="242" fill="#91a49a" fontSize="8" fontFamily="monospace">{t}</text>)}
  </svg>;
}

export function Sparkline({ negative = false, seed = 0 }: { negative?: boolean; seed?: number }) {
  const points = Array.from({ length: 18 }, (_, i) => `${i * 5},${(negative ? 9 + i : 28 - i) + Math.sin(i * 1.9 + seed) * 5}`).join(" ");
  return <svg viewBox="0 0 86 38" className="sparkline" aria-hidden="true"><polyline points={points} fill="none" stroke={negative ? "#d57e7e" : "#36cd8d"} strokeWidth="1.5"/></svg>;
}
