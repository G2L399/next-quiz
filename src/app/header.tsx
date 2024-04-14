import Link from "next/link";
import * as NextUI from "@nextui-org/react";
import Image from "next/image";
import Next from "#/public/next.svg";

const Header = () => (
    <NextUI.Navbar isBordered isBlurred position="sticky" className="">
      <NextUI.NavbarItem >
          <NextUI.Link href="/">
            <Image
              src={Next}
              alt="logo"
              width={100}
              height={100}
              className="dark:invert"
            />
          </NextUI.Link>
      </NextUI.NavbarItem>
      <NextUI.NavbarContent justify="start">
        <NextUI.NavbarItem>
          <NextUI.Link color="foreground" href="/">
            Home
          </NextUI.Link>
        </NextUI.NavbarItem>
        <NextUI.NavbarItem>
          <NextUI.Link color="foreground" href="/Game">
            About
          </NextUI.Link>
        </NextUI.NavbarItem>
        <NextUI.NavbarItem>
          <NextUI.Link color="foreground" href="/Insert">
            Insert
          </NextUI.Link>
        </NextUI.NavbarItem>
      </NextUI.NavbarContent>
    </NextUI.Navbar>
);

export default Header;
