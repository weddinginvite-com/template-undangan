import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { totalItems } = useCart();
  
  // Close mobile menu when navigating or screen size changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location, isMobile]);
  
  const navItems = [
    { label: "Beranda", href: "/", active: location === "/" },
    { label: "Templates", href: "/templates", active: location.startsWith("/templates") },
    { label: "Kontak", href: "/contact", active: location === "/contact" },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="font-bold text-xl cursor-pointer text-primary">
              WeddingTemplateHub
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="mx-auto flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`text-sm transition-colors hover:text-primary ${
                  item.active ? "text-primary font-medium" : "text-muted-foreground"
                } cursor-pointer`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        )}
        
        <div className="flex items-center gap-4">
          <Link href="/checkout">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 px-1 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          
          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
          
          {/* Call to Action Button - Desktop only */}
          {!isMobile && (
            <Link href="/templates">
              <Button>Lihat Templates</Button>
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && isMenuOpen && (
        <nav className="container mx-auto px-4 py-4 bg-white border-t flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className={`block py-2 ${
                item.active ? "text-primary font-medium" : "text-muted-foreground"
              } cursor-pointer`}>
                {item.label}
              </span>
            </Link>
          ))}
          <Link href="/templates">
            <Button className="w-full mt-2">Lihat Templates</Button>
          </Link>
        </nav>
      )}
    </header>
  );
}