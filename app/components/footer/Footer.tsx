import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-midnight text-buttercream">
      <div className="mx-auto max-w-7xl px-6 py-12">
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-white">TimeSync</h3>
            <p className="mt-3 text-sm text-buttercream/70">
              Premium watches crafted with precision, design, and timeless elegance.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-buttercream/70">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-buttercream/70">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-buttercream/60">
          © {new Date().getFullYear()} TimeSync. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
