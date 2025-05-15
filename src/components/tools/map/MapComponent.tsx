import React, {useEffect, useRef} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOM from "react-dom/client";

interface Marker {
    lat: number;
    lng: number;
    popup?: string;
    popupContent?: React.ReactNode;
    iconUrl?: any;
}

interface Region {
    coordinates: any;
    color?: string;
    fillColor?: string;
    fillOpacity?: number;
}

interface MapComponentProps {
    center?: [number, number];
    zoom?: number;
    markers?: Marker[];
    regions?: Region[];
    className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
                                                       center = [35.6762, 51.4231],
                                                       zoom = 13,
                                                       markers = [],
                                                       regions = [],
                                                       className,
                                                   }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = L.map(
            mapRef.current,
            {
                attributionControl: false,
                zoomControl: false
            }).setView(
            center,
            zoom
        );

        const lightLayer = L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
        );
        lightLayer.addTo(map);

        const osm = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 18,
            }
        );

        const topomap = L.tileLayer(
            "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 18,
            }
        );
        const darkLayer = L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
        );

        const baseLayers = {
            "Light Theme": lightLayer,
            "Dark Theme": darkLayer,
            "Open Street Map": osm,
            "Topo Map": topomap,
        };

        const layerControl = L.control.layers(baseLayers).addTo(map);
        layerControl.setPosition("topleft");

        L.control.scale().addTo(map);

  
        markers.forEach((marker) => {
            const customIcon = L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [15, 15],
                iconAnchor: [0, 0],
                popupAnchor: [8, 0],
            });

            const leafletMarker = L.marker([marker.lat, marker.lng], {
                icon: customIcon,
            }).addTo(map);

            if (marker.popupContent) {
                const popupContainer = document.createElement("div");
                const root = ReactDOM.createRoot(popupContainer);
                root.render(<>{marker.popupContent}</>);
                leafletMarker.bindPopup(popupContainer);
            }
            else if (marker.popup) {
                const popupContent = `<div class="custom-popup">${marker.popup}</div>`;
                leafletMarker.bindPopup(popupContent);
            }
        });

        regions.forEach((region) => {
            const polygon = L.polygon(region.coordinates, {
                color: region.color || "red",
                fillColor: region.fillColor || "pink",
                fillOpacity: region.fillOpacity || 0.4,
            }).addTo(map);

            // map.fitBounds(polygon.getBounds());
        });

        return () => {
            map.remove();
        };
    }, [center, zoom, markers, regions]);

    return (
        <div
            ref={mapRef}
            style={{height: "100%", width: "100%"}}
            className={className || ""}
        />
    );
};

export default MapComponent;
