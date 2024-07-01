import Image from "next/image";
import React from "react";
import Link from "next/link";

import {Dropdown,
        DropdownTrigger,
        DropdownMenu,
        DropdownSection,
        DropdownItem
      } from "@nextui-org/dropdown";

export default function Home() {
  return (
    <main>
        <p>XX XB of storage in XXXX was $XX.XX</p>   
        <ul>
          <li>
        <Link href="/index">Index</Link>
          </li>
        </ul>
    </main>
    
  );
}
