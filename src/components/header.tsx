"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { social } from "@/lib/demo";

const links = [["Overview", "overview"], ["Features", "features"], ["How it works", "how-it-works"], ["Roadmap", "roadmap"]];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container header-inner">
    <a href="#" aria-label="Folio home" onClick={() => setOpen(false)}><Brand /></a>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
    <a className="button button-small header-cta" href={social.telegram} target="_blank" rel="noopener noreferrer">Join the community <ArrowUpRight size={15} /></a>
    <button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" onKeyDown={e => { if (e.key === "Escape") setOpen(false); }}>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a href={social.telegram} target="_blank" rel="noopener noreferrer">Join Telegram <ArrowUpRight size={16}/></a></nav>}</header>;
}
