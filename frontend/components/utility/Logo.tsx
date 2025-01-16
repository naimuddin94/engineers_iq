import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import logoLight from "@/public/logo.png";
import logoDark from "@/public/logoDark.png";

function Logo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Indicate the component has mounted
  }, []);

  // Render nothing until mounted to avoid hydration mismatch
  if (!mounted) return null;

  const isDarkTheme = theme === "dark" || resolvedTheme === "dark";

  return (
    <>
      <Image
        alt="logo"
        height={30}
        quality={100}
        src={isDarkTheme ? logoLight : logoDark}
        width={30}
      />
      <p className="font-bold text-inherit">EngineersIQ</p>
    </>
  );
}

export default Logo;
