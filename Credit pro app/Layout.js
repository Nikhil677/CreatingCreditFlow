import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Moon, Sun, Wallet, Users, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navigationItems = [
    {
      title: "Dashboard",
      url: createPageUrl("Dashboard"),
      icon: Wallet,
    },
    {
      title: "Customers",
      url: createPageUrl("Customers"),
      icon: Users,
    },
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <style>{`
        :root {
          --background: 0 0% 100%;
          --foreground: 222.2 84% 4.9%;
          --card: 0 0% 100%;
          --card-foreground: 222.2 84% 4.9%;
          --primary: 221.2 83.2% 53.3%;
          --primary-foreground: 210 40% 98%;
        }
        
        .dark {
          --background: 222.2 84% 4.9%;
          --foreground: 210 40% 98%;
          --card: 222.2 84% 8%;
          --card-foreground: 210 40% 98%;
          --primary: 217.2 91.2% 59.8%;
          --primary-foreground: 222.2 47.4% 11.2%;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white text-lg">Credit Manager</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Track your credits</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-full"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </header>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white text-xl">Credit Manager</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Business Tool</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    location.pathname === item.url
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-72 min-h-screen">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 z-50">
          <div className="flex items-center justify-around p-2">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200 ${
                  location.pathname === item.url
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}