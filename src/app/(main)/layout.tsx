export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-full p-5">{children}</div>;
}
