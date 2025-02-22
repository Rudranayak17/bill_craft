import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Receipt } from "lucide-react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/chat-bot", label: "Generate Invoice" },
  { path: "/custom-invoice", label: "Custom-Invoice" },
  { path: "/about", label: "About" },
  { path: "/subscription", label: "Pricing" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation =useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Receipt className="h-6 w-6" />
          <span className="font-bold text-lg">Swift flow book</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ path, label }) => (
            <Link key={path} to={path} className="text-sm font-medium hover:text-primary">
              {label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />
          <Button variant="outline" onClick={()=>navigation("/login")} size="sm">
            Sign In
          </Button>
          <Button size="sm">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur">
          <div className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map(({ path, label }) => (
              <Link key={path} to={path} className="text-sm font-medium hover:text-primary" onClick={toggleMenu}>
                {label}
              </Link>
            ))}
            <ModeToggle />
            <Button variant="outline" size="sm" onClick={toggleMenu}>
              Sign In
            </Button>
            <Button size="sm" onClick={toggleMenu}>Get Started</Button>
          </div>
        </div>
      )}
    </header>
  );
}