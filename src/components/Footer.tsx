"use client";

export default function Footer() {
  return (
    <footer className="footer flex flex-col bg-slate-300 p-10 text-neutral-content">
      <div className="text-sm font-medium">
        Copyright © {new Date().getFullYear()} Tactiq - All right reserved
      </div>
    </footer>
  );
}
