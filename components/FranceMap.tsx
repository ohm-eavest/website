// components/FranceMap.tsx
"use client";

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { consultantsByRegion } from '../app/lib/placeholder-data';

interface FranceMapProps {
    onRegionClick: (regionId: string) => void;
    selectedRegion?: string;
    showMiniMap?: boolean;
    consultantMode?: boolean; // New prop for consultant modal display
}

// Using a more specific French regions TopoJSON for better accuracy
const FRANCE_REGIONS_URL = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson';

const FranceMap: React.FC<FranceMapProps> = ({ 
    onRegionClick, 
    selectedRegion, 
    showMiniMap = false,
    consultantMode = false
}) => {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

    // Mapping from GeoJSON region names to our region IDs
    const regionNameMapping: { [key: string]: string } = {
        'Bretagne': 'bretagne',
        'Normandie': 'normandie',
        'Hauts-de-France': 'hauts-de-france',
        'Grand Est': 'grand-est',
        'Île-de-France': 'ile-de-france',
        'Centre-Val de Loire': 'centre-val-de-loire',
        'Pays de la Loire': 'pays-de-la-loire',
        'Bourgogne-Franche-Comté': 'bourgogne-franche-comte',
        'Nouvelle-Aquitaine': 'nouvelle-aquitaine',
        'Auvergne-Rhône-Alpes': 'auvergne-rhone-alpes',
        'Occitanie': 'occitanie',
        "Provence-Alpes-Côte d'Azur": 'provence-alpes-cote-azur',
        'Corse': 'corse'
    };

    const handleRegionClick = (regionId: string) => {
        if (consultantsByRegion[regionId]) {
            onRegionClick(regionId);
        }
    };

    const getRegionFill = (regionId: string) => {
        const hasConsultants = consultantsByRegion[regionId];
        const isSelected = selectedRegion === regionId;
        const isHovered = hoveredRegion === regionId;

        // In consultant mode, only show color for the selected region
        if (consultantMode) {
            if (isSelected) return '#3B82F6'; // Blue for the consultant's region
            return 'transparent'; // All other regions transparent
        }

        // Normal mode behavior
        if (isSelected) return '#3B82F6'; // Blue for selected
        if (isHovered) return hasConsultants ? '#60A5FA' : '#F3F4F6'; // Light blue for hover if has consultants, light gray if not
        return 'transparent'; // Transparent by default
    };

    const getRegionOpacity = (regionId: string) => {
        const isHovered = hoveredRegion === regionId;
        const isSelected = selectedRegion === regionId;
        
        // In consultant mode, only the selected region should be visible
        if (consultantMode) {
            return isSelected ? 0.8 : 0;
        }
        
        // Normal mode behavior
        if (isSelected || isHovered) return 0.8;
        return 0; // Fully transparent by default
    };

    const getRegionCursor = (regionId: string) => {
        return consultantsByRegion[regionId] ? 'pointer' : 'default';
    };

    // Function to extract region ID from geography properties
    const getRegionId = (geo: any): string => {
        const regionName = geo.properties?.nom || geo.properties?.name || geo.properties?.NAME;
        return regionNameMapping[regionName] || regionName?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'unknown';
    };

    const mapComponent = (
        <ComposableMap
            projection="geoMercator"
            projectionConfig={{
                scale: showMiniMap ? 1760 : 2640,
                center: [8, 46.5], // Move France to the left
            }}
            width={1404}
            height={1053}
            role=""
            aria-label=""
            style={{
                ...(consultantMode ? {
                    width: '100%',
                    height: 'auto',
                    maxWidth: '1200px',
                    maxHeight: '60vh',
                } : {
                    width: '1404px',
                    height: '1053px',
                    minWidth: '1404px',
                    minHeight: '1053px',
                }),
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
            }}
        >
            <Geographies geography={FRANCE_REGIONS_URL}>
                {({ geographies }) =>
                    geographies.map(geo => {
                        const regionId = getRegionId(geo);
                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={getRegionFill(regionId)}
                                fillOpacity={getRegionOpacity(regionId)}
                                stroke="#FDE047"
                                strokeWidth={1}
                                style={{
                                    default: {
                                        cursor: getRegionCursor(regionId),
                                        transition: 'all 0.2s ease',
                                    },
                                    hover: {
                                        cursor: getRegionCursor(regionId),
                                    },
                                    pressed: {
                                        cursor: getRegionCursor(regionId),
                                    },
                                }}
                                onMouseEnter={() => setHoveredRegion(regionId)}
                                onMouseLeave={() => setHoveredRegion(null)}
                                onClick={() => handleRegionClick(regionId)}
                            />
                        );
                    })
                }
            </Geographies>
        </ComposableMap>
    );

    // If it's in consultant mode, always show without container
    if (consultantMode) {
        return mapComponent;
    }

    // If it's a mini map (used elsewhere), return without container
    if (showMiniMap) {
        return mapComponent;
    }

    // For full maps, wrap in styled container
    return (
        <div className="bg-transparent rounded-lg p-4 shadow-sm">
            {mapComponent}
        </div>
    );
};

export default FranceMap;