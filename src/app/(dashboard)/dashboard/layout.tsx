export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <SignedIn> */}
      {children}
      {/* </SignedIn> */}

      {/* <SignedOut> */}
      {/* <RedirectToSignIn />
      </SignedOut> */}
    </>
  );
}
