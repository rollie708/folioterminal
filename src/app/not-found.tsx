import Link from "next/link";
import { Brand } from "@/components/brand";
export default function NotFound() { return <main className="error-page"><Brand/><span className="eyebrow">404 — OFF THE CHART</span><h1>This page isn’t on the map.</h1><p>Find your way back to the Folio overview.</p><Link className="button button-primary" href="/">Back to Folio</Link></main>; }
