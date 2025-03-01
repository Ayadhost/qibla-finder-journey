
import React, { useState } from 'react';
import { useQibla } from '../hooks/useQibla';
import Header from '../components/Header';
import QiblaCompass from '../components/QiblaCompass';
import LocationInfo from '../components/LocationInfo';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  const {
    qiblaDirection,
    distance,
    latitude,
    longitude,
    deviceOrientation,
    isLoading,
    error,
    refreshLocation
  } = useQibla();
  
  const [isCalibrating, setIsCalibrating] = useState(false);
  
  const handleCalibrate = () => {
    setIsCalibrating(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-accent/20 px-4 overflow-x-hidden">
      <div className="max-w-lg w-full mx-auto py-6 flex flex-col items-center min-h-screen">
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className="flex-1 w-full flex flex-col items-center justify-center py-6">
          {error ? (
            <div className="w-full max-w-md glass-card rounded-2xl p-6 text-center">
              <div className="text-red-500 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h2 className="text-xl font-medium mb-2">لا يمكن تحديد الموقع</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <button
                onClick={refreshLocation}
                className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                حاول مرة أخرى
              </button>
            </div>
          ) : (
            <>
              {/* Compass */}
              <QiblaCompass
                qiblaDirection={qiblaDirection}
                deviceOrientation={deviceOrientation}
                isCalibrating={isCalibrating}
                setIsCalibrating={setIsCalibrating}
              />
              
              {/* Calibrate button */}
              <button
                onClick={handleCalibrate}
                disabled={isCalibrating || isLoading}
                className="mb-8 py-2 px-6 rounded-full bg-muted text-muted-foreground text-sm transition-all hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isCalibrating ? 'جاري المعايرة...' : 'معايرة البوصلة'}
              </button>
              
              {/* Location information */}
              <LocationInfo
                latitude={latitude}
                longitude={longitude}
                qiblaDirection={qiblaDirection}
                distance={distance}
                isLoading={isLoading}
                onRefresh={refreshLocation}
              />
              
              {/* Instruction text */}
              <div className="mt-6 text-center text-sm text-muted-foreground animate-slide-up delay-200">
                <p>قم بتحريك هاتفك في شكل رقم 8 لمعايرة البوصلة</p>
                <p className="mt-1">لأفضل النتائج، استخدم التطبيق في مكان خالٍ من التداخل المغناطيسي</p>
              </div>
            </>
          )}
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
      
      {/* Background decorative elements */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -z-10 animate-float"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10 animate-float delay-200"></div>
      <div className="fixed top-1/3 left-1/4 w-32 h-32 bg-primary/5 rounded-full filter blur-3xl -z-10 animate-float delay-500"></div>
    </div>
  );
};

export default Index;
