"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useState } from "react";

export const TactiqLogo = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.343 2.65705L20 0L40 20L20 40L17.3429 37.3429L34.6859 20L17.343 2.65705Z"
        fill="#D41C1C"
      ></path>
      <path
        d="M13.8744 6.12564L16.5314 3.46859L33.0628 20L16.5314 36.5314L13.8744 33.8744L27.7487 20L13.8744 6.12564Z"
        fill="#D41C1C"
      ></path>
      <path
        d="M0 20L13.0628 6.93718L26.1256 20L13.0628 33.0628L10.4058 30.4058L20.8115 20L13.0628 12.2513L2.65705 22.657L0 20Z"
        fill="#D41C1C"
      ></path>
      <path
        d="M13.0628 13.8744L10.4058 16.5314L13.8744 20L6.93718 26.9372L9.59422 29.5942L19.1885 20L13.0628 13.8744Z"
        fill="#D41C1C"
      ></path>
      <path
        d="M6.12564 26.1256L3.46859 23.4686L9.56643 17.3708L12.2235 20.0278L6.12564 26.1256Z"
        fill="#D41C1C"
      ></path>
    </svg>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex flex-row gap-2 cursor-default">
          <TactiqLogo />
          <p className="font-bold text-inherit">Tactiq</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          {isSignedIn ? (
            <Link color="foreground" href="/dashboard">
              Dashboard
            </Link>
          ) : (
            <Link color="foreground" href="/">
              Home
            </Link>
          )}
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/features">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            About Us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!isSignedIn ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button color="warning" variant="ghost" onPress={() => signOut()}>Logout</Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <MobileNavbar />
    </Navbar>
  );
}

function MobileNavbar() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  return (
    <NavbarMenu>
      <NavbarMenuItem>
        {isSignedIn ? (
          <Button as={Link} className="w-full" href="/dashboard" size="lg">
            Dashboard
          </Button>
        ) : (
          <Button as={Link} className="w-full" href="/" size="lg">
            Home
          </Button>
        )}
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Button as={Link} className="w-full" href="/features" size="lg">
          Features
        </Button>
      </NavbarMenuItem>

      <NavbarMenuItem>
        <Button as={Link} className="w-full" href="/about" size="lg">
          About Us
        </Button>
      </NavbarMenuItem>

      {!isSignedIn ? (
        <NavbarMenuItem>
          <Button as={Link} className="w-full" href="/login" size="lg">
            Login
          </Button>
        </NavbarMenuItem>
      ) : (
        <NavbarMenuItem>
          <Button className="w-full" size="lg" onPress={() => signOut()}>
            Logout
          </Button>
        </NavbarMenuItem>
      )}
    </NavbarMenu>
  );
}
