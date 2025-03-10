
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="w-full py-4 px-6 flex justify-center items-center animate-fade-in relative">
      <div className="absolute right-4 top-4">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          aria-label={theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
        >
          {theme === 'dark' ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-primary" />
          )}
        </button>
      </div>
      <div className="text-center">
        <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2 animate-pulse-subtle">
          بسم الله الرحمن الرحيم
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-secondary tracking-tight">
          <span className="text-primary">تحديد</span> اتجاه القبلة
        </h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          تحديد اتجاه القبلة في أي مكان بالعالم
        </p>
      </div>
    </header>
  );
};

export default Header;
