'use client';

import React, { useEffect } from 'react';

const WHATSHOT_UMBRELLA_IMG = '/places/umbrella-falls.jpg';
const FALLBACK_WATERFALL = '/places/bhandardara.jpg';

export const LeafletMap = ({
  places = [],
  center = [19.5441, 73.7661],
  zoom = 11
}) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamically import Leaflet on client side
    import('leaflet').then((L) => {
      // Fix default Leaflet icon paths
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      const container = L.DomUtil.get('akole-leaflet-map');
      if (container != null) {
        container._leaflet_id = null;
      }

      const map = L.map('akole-leaflet-map').setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      places.forEach((place) => {
        if (place.latitude && place.longitude) {
          let thumbnail = place.images && place.images.length > 0 ? place.images[0] : FALLBACK_WATERFALL;
          if (place.name && place.name.toLowerCase().includes('umbrella')) {
            thumbnail = WHATSHOT_UMBRELLA_IMG;
          }

          const feeText = place.entryFee > 0 ? `₹${place.entryFee}` : 'Free Entry';

          const marker = L.marker([place.latitude, place.longitude]).addTo(map);

          const popupContent = `
            <div style="font-family: system-ui, -apple-system, sans-serif; padding: 2px; max-width: 240px; border-radius: 12px; overflow: hidden;">
              <div style="position: relative; width: 100%; height: 110px; border-radius: 8px; overflow: hidden; background-color: #0f172a;">
                <img src="${thumbnail}" referrerpolicy="no-referrer" onerror="this.src='${FALLBACK_WATERFALL}'" alt="${place.name}" style="width: 100%; height: 100%; object-fit: cover;" />
                <span style="position: absolute; top: 6px; right: 6px; background-color: #f59e0b; color: #020617; font-weight: 800; font-size: 10px; padding: 2px 8px; border-radius: 9999px;">
                  ${feeText}
                </span>
              </div>
              <div style="padding-top: 8px;">
                <h4 style="font-weight: 800; font-size: 15px; color: #0f172a; margin: 0 0 2px 0; font-family: sans-serif;">${place.name}</h4>
                <p style="font-size: 11px; color: #059669; font-weight: 700; margin: 0 0 6px 0;">📍 ${place.location.split(',')[0]}</p>
                <p style="font-size: 11px; color: #475569; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">
                  ${place.description}
                </p>
                <a href="/places/${place.id}" style="display: block; width: 100%; text-align: center; background-color: #020617; color: #fbbf24; padding: 8px 12px; border-radius: 8px; font-size: 11px; text-decoration: none; font-weight: 800; text-transform: uppercase; tracking: 0.05em; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                  View Details &rarr;
                </a>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent);
        }
      });
    });
  }, [places, center, zoom]);

  return (
    <div className="w-full h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-white/30">
      <div id="akole-leaflet-map" className="w-full h-full" />
    </div>
  );
};
