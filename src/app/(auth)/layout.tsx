export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex justify-center items-center bg-gradient-to-br from-purple-50 to-pink-100"
      style={{ height: "100vh" }}
    >
      {children}
    </div>
  );
}
