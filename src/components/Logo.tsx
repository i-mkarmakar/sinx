import { useTheme } from "next-themes";

export function Logo() {
  const { theme } = useTheme();

  const logoSrc = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";
  const logoAlt = theme === "dark" ? "Dark Mode Logo" : "Light Mode Logo";

  return <img src={logoSrc} alt={logoAlt} className="w-8" />;
}
