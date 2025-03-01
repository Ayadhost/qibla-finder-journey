
import React, { useEffect, useState, useRef } from 'react';
import { Compass, MapPin } from 'lucide-react';

interface QiblaCompassProps {
  qiblaDirection: number | null;
  deviceOrientation: number | null;
  isCalibrating: boolean;
  setIsCalibrating: (value: boolean) => void;
}

const QiblaCompass: React.FC<QiblaCompassProps> = ({
  qiblaDirection,
  deviceOrientation,
  isCalibrating,
  setIsCalibrating
}) => {
  const [rotation, setRotation] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const compassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If we have both qibla direction and device orientation
    if (qiblaDirection !== null && deviceOrientation !== null) {
      // Calculate the rotation angle needed to point to qibla
      // The needle should point to qibla when the device is properly oriented
      let needleRotation = qiblaDirection - deviceOrientation;
      
      // Normalize to 0-360 degrees
      needleRotation = ((needleRotation % 360) + 360) % 360;
      
      setRotation(needleRotation);
    } else if (qiblaDirection !== null) {
      // If we only have qibla direction but no device orientation
      setRotation(qiblaDirection);
    }
  }, [qiblaDirection, deviceOrientation]);

  // Handle calibration animation
  useEffect(() => {
    if (isCalibrating) {
      setAnimationClass('animate-spin-slow');
      
      const timer = setTimeout(() => {
        setAnimationClass('');
        setIsCalibrating(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isCalibrating, setIsCalibrating]);

  // Compass appearance classes
  const ringClasses = `compass-ring ${animationClass} w-72 h-72 border-gray-200/50`;
  const innerRingClasses = `compass-ring ${animationClass} w-64 h-64 border-gray-300/50`;
  const innerMostRingClasses = `compass-ring ${animationClass} w-56 h-56 border-gray-400/50`;
  
  // Needle direction style
  const needleStyle = {
    transform: `rotate(${rotation}deg)`
  };

  return (
    <div className="relative flex justify-center items-center my-8 animate-float">
      {/* Outer decorative rings */}
      <div className={ringClasses} style={{ top: 'calc(50% - 144px)', left: 'calc(50% - 144px)' }} />
      <div className={innerRingClasses} style={{ top: 'calc(50% - 128px)', left: 'calc(50% - 128px)' }} />
      <div className={innerMostRingClasses} style={{ top: 'calc(50% - 112px)', left: 'calc(50% - 112px)' }} />
      
      {/* Main compass container */}
      <div 
        ref={compassRef}
        className={`relative w-48 h-48 rounded-full glass-card flex items-center justify-center ${animationClass}`}
      >
        {/* Cardinal directions */}
        <div className="absolute top-2 text-xs font-medium text-gray-600">N</div>
        <div className="absolute right-2 text-xs font-medium text-gray-600">E</div>
        <div className="absolute bottom-2 text-xs font-medium text-gray-600">S</div>
        <div className="absolute left-2 text-xs font-medium text-gray-600">W</div>
        
        {/* Compass icon */}
        <div className="text-primary/80">
          <Compass size={32} />
        </div>
        
        {/* Qibla symbol - centered in compass */}
        <div className="absolute">
          {/* Using MapPin instead of Kaaba since Kaaba is not available */}
          <MapPin size={20} className="text-primary" />
        </div>
        
        {/* Qibla direction needle */}
        <div 
          className="compass-needle absolute w-full h-4"
          style={needleStyle}
        >
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg" />
            <div className="absolute top-1/2 right-5 -translate-y-1/2 w-[calc(50%-20px)] h-1 bg-primary rounded-r-full" />
            <div className="absolute top-1/2 left-5 -translate-y-1/2 w-4 h-1 bg-gray-400 rounded-l-full" />
            
            {/* Red triangle pointer */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2">
              <div 
                className="w-0 h-0 border-t-8 border-l-8 border-b-8 border-transparent border-l-red-600"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Compass decoration - small dots around */}
      {[...Array(36)].map((_, i) => (
        <div 
          key={i} 
          className={`absolute w-1 h-1 rounded-full ${i % 9 === 0 ? 'bg-primary' : 'bg-gray-300'}`}
          style={{
            top: `calc(50% + ${Math.sin(i * 10 * Math.PI / 180) * 120}px)`,
            left: `calc(50% + ${Math.cos(i * 10 * Math.PI / 180) * 120}px)`
          }}
        />
      ))}
      
      {/* Information text */}
      <div className="absolute -bottom-10 text-center">
        <p className="text-sm text-muted-foreground">
          {deviceOrientation !== null 
            ? 'اتجاه القبلة'
            : 'اتجاه القبلة من الشمال'}
        </p>
      </div>
    </div>
  );
};

export default QiblaCompass;
