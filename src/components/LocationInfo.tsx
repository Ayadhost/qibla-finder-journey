
import React from 'react';
import { MapPin, Navigation, Globe } from 'lucide-react';
import { formatCoordinate } from '../utils/qiblaCalculations';

interface LocationInfoProps {
  latitude: number | null;
  longitude: number | null;
  qiblaDirection: number | null;
  distance: number | null;
  isLoading: boolean;
  onRefresh: () => void;
}

const LocationInfo: React.FC<LocationInfoProps> = ({
  latitude,
  longitude,
  qiblaDirection,
  distance,
  isLoading,
  onRefresh
}) => {
  return (
    <div className="glass-card rounded-2xl p-5 w-full max-w-md mx-auto shadow-lg animate-slide-up">
      <div className="flex flex-col space-y-4">
        {/* Location */}
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <MapPin size={18} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground">الموقع الحالي</h3>
            {isLoading ? (
              <div className="h-4 w-36 bg-gray-200 animate-pulse rounded mt-1"></div>
            ) : latitude && longitude ? (
              <p className="text-sm font-medium">
                {formatCoordinate(latitude, "latitude")}, {formatCoordinate(longitude, "longitude")}
              </p>
            ) : (
              <p className="text-sm text-red-500">غير متاح</p>
            )}
          </div>
        </div>

        {/* Qibla Direction */}
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Navigation size={18} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground">اتجاه القبلة</h3>
            {isLoading ? (
              <div className="h-4 w-20 bg-gray-200 animate-pulse rounded mt-1"></div>
            ) : qiblaDirection !== null ? (
              <p className="text-sm font-medium">{qiblaDirection.toFixed(1)}° من الشمال</p>
            ) : (
              <p className="text-sm text-red-500">غير متاح</p>
            )}
          </div>
        </div>

        {/* Distance to Kaaba */}
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Globe size={18} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground">المسافة إلى الكعبة</h3>
            {isLoading ? (
              <div className="h-4 w-28 bg-gray-200 animate-pulse rounded mt-1"></div>
            ) : distance !== null ? (
              <p className="text-sm font-medium">{distance.toLocaleString()} كيلومتر</p>
            ) : (
              <p className="text-sm text-red-500">غير متاح</p>
            )}
          </div>
        </div>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="mt-2 py-2 px-4 rounded-lg bg-primary text-white font-medium text-sm transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed w-full flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جاري التحديث...
            </>
          ) : (
            'تحديث الموقع'
          )}
        </button>
      </div>
    </div>
  );
};

export default LocationInfo;
