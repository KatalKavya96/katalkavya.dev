import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-inner">
        <div>
          <span className="footer-mark">K.</span>
          <p>Designed to let the work speak.</p>
        </div>
        <div className="footer-links">
          <Link href="/projects">Projects</Link>
          <Link href="/open-source">Open source</Link>
          <Link href="/journey">Journey</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <small>© {new Date().getFullYear()} Kavya Katal</small>
      </div>
    </footer>
  );
}
