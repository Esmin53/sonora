import { FaSun, FaMoon } from "react-icons/fa6";

interface NavbarProps {
  setTheme: (theme: string) => void;
  theme: string;
}

const Navbar = ({ setTheme, theme }: NavbarProps) => {
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "" : "dark";
        localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="dark:bg-foreground-dark bg-foreground-light w-full flex items-center justify-center z-10">
      <div className="w-full h-12 flex p-2 items-center justify-between max-w-7xl">
        <a
          href="/"
          className="text-4xl font-bold dark:text-accent-dark text-accent-light"
        >
          Sonora
        </a>

        <div
          className={`dark:bg-background-dark bg-background-light w-16 py-0.5 rounded-full shadow flex items-center px-2 cursor-pointer border dark:border-accent-dark border-accent-light ${
            theme === "dark" ? "justify-end" : "justify-start"
          } z-20`}
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <FaMoon className="w-6 h-6 dark:text-accent-dark text-accent-light cursor-pointer ease-in duration-150" />
          ) : (
            <FaSun className="w-6 h-6 dark:text-accent-dark text-accent-light cursor-pointer ease-in duration-150" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;