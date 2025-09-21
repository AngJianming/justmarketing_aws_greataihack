import { Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="footer-bg text-slate-700 border-t border-slate-200">
      <div className="max-w-8xl  px-12 py-7">
        <div className="flex justify-between">
          {/* Company Info */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">JustMarketing</h3>
            <p className="text-slate-600 leading-relaxed pb-3">
              Smart AI Localizer for adapting marketing content to be culturally relevant to Malaysia
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 mt-2 pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm">© 2025 JustMarketing. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-slate-500 hover:text-slate-900 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-slate-500 hover:text-slate-900 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/cookies" className="text-slate-500 hover:text-slate-900 text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
