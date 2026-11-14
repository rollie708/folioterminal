export function Brand({ iconOnly = false }: { iconOnly?: boolean }) {
  return <span className="brand"><svg viewBox="0 0 40 44" fill="none" aria-hidden="true"><path d="M20 3 36 12v20L20 41 4 32V12L20 3Z" stroke="currentColor" strokeWidth="2.6"/><path d="m12 17 16-9v8l-16 9v-8Zm0 12 16-9v7l-16 9v-7Z" fill="currentColor"/></svg>{!iconOnly && <span>folio<span className="brand-period">.</span></span>}</span>;
}
