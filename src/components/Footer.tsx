
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 mt-6 text-center animate-fade-in">
      <div className="flex items-center justify-center mb-2">
        <div className="w-10 h-[1px] bg-muted-foreground/30"></div>
        <div className="mx-4 text-xs text-muted-foreground/50">لنصلي في الاتجاه الصحيح</div>
        <div className="w-10 h-[1px] bg-muted-foreground/30"></div>
      </div>
      <p className="text-xs text-muted-foreground/70">
        © {currentYear} تحديد اتجاه القبلة - جميع الحقوق محفوظة
      </p>
    </footer>
  );
};

export default Footer;
