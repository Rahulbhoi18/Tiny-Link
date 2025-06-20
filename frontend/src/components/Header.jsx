import { Link2, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TinyLink</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <Button variant="outline" className="bg-white text-gray-900">
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="bg-white text-gray-900">
                  Sign In
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
