
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-center items-center animate-fade-in">
      <div className="text-center">
        <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2 animate-pulse-subtle">
          بسم الله الرحمن الرحيم
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-secondary tracking-tight">
          <span className="text-primary">قبلة</span> فايندر
        </h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          تحديد اتجاه القبلة في أي مكان بالعالم
        </p>
      </div>
    </header>
  );
};

export default Header;
