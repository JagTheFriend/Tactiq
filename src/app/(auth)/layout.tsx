import { BackgroundBeamsWithCollision } from "~/components/background-beams-with-collision";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BackgroundBeamsWithCollision className="h-full">
      <div className="w-full h-full flex justify-center">{children}</div>
    </BackgroundBeamsWithCollision>
  );
}
