import Link from "next/link";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-blue-600 hover:underline text-sm font-medium p-4 text-center block"
    >
      {children}
    </Link>
  );
}
