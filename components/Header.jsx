"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Culture Check", href: "/ai-checker" },
    { name: "Video Tool", href: "/trend" },
    { name: "Strategy Crafter", href: "/strategy" },
    { name: "Video Translate", href: "/translate" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-between ${
        isScrolled ? "shadow-2xl bg-white" : "shadow-lg bg-white"
      }`}
    >
      <div className="w-full px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold nav-text">JustMarketing</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname.includes(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-200 font-medium ${
                    isActive
                      ? "text-blue-600 underline underline-offset-4"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Logout Button */}
          <div className="hidden md:flex">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="nav-text hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border border-slate-200 rounded-lg mt-2 shadow-lg">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600 underline underline-offset-4"
                        : "text-slate-700 hover:text-blue-600"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <div className="px-3 py-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
