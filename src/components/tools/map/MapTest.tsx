// @ts-nocheck
import React, {useEffect, useRef, useState} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import ReactDOM from "react-dom/client";
import Loading from "../loading/Loading";

interface Marker {
    id: string;
    lat: number;
    lng: number;
    popup?: string | React.ReactNode;
    popupContent?: React.ReactNode;
    iconUrl?: string;
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
    enableMarkers?: boolean;
    enableRegions?: boolean;
    enableFullScreen?: boolean;
    enableMultiSelect?: boolean;
    enableLayerControl?: boolean;
    enableMapClick?: boolean;
    enableRegionCreation?: boolean;
    onRegionCreated?: (coordinates: [number, number][]) => void;
    onMapClick?: (latLng: { lat: number; lng: number }) => void;
    focusMarkerId?: string | number;
    focusRegionId?: string;
    className?: string;
    loading?: boolean;
    loadTime?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
                                                       center = [35.6762, 51.4231],
                                                       zoom = 13,
                                                       markers = [],
                                                       regions = [],
                                                       enableMarkers = true,
                                                       enableRegions = true,
                                                       enableMultiSelect = false,
                                                       enableFullScreen = true,
                                                       enableLayerControl = true,
                                                       enableMapClick = false,
                                                       enableRegionCreation = false,
                                                       onRegionCreated,
                                                       onMapClick,
                                                       focusMarkerId,
                                                       focusRegionId,
                                                       className,
                                                       loading = true,
                                                       loadTime = 0
                                                   }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const markersRef = useRef<L.Marker[]>([]);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const selectedMarkers = useRef<L.LatLng[]>([]);
    const currentPolygon = useRef<L.Polygon | null>(null);

    const [savedMapSettings, setSavedMapSettings] = useState({
        center: center,
        zoom: zoom,
    });

    const [inLoading, setInLoading] = useState(loading);

    useEffect(() => {
        setTimeout(() => {
            setInLoading(false);
        }, loadTime);
    }, []);
    useEffect(() => {
        const savedSettings = localStorage.getItem("mapSettings");
        if (savedSettings) {
            setSavedMapSettings(JSON.parse(savedSettings));
        }
    }, []);

    // useEffect(() => {
    //     if (!mapInstanceRef.current) return;
    //
    //     const map = mapInstanceRef.current;
    //
    //     const handleMapChange = () => {
    //         const center = map.getCenter();
    //         const zoom = map.getZoom();
    //
    //         const newSettings = {
    //             center: [center.lat, center.lng],
    //             zoom,
    //         };
    //         localStorage.setItem("mapSettings", JSON.stringify(newSettings));
    //     };
    //
    //     map.on("moveend", handleMapChange);
    //     map.on("zoomend", handleMapChange);
    //
    //     return () => {
    //         map.off("moveend", handleMapChange);
    //         map.off("zoomend", handleMapChange);
    //     };
    // }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = L.map(mapRef.current, {
            attributionControl: false,
            zoomControl: true,
        }).setView(savedMapSettings.center, savedMapSettings.zoom);

        mapInstanceRef.current = map;

        const lightLayer = L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            {
                attribution: "&copy; OpenStreetMap contributors",
            }
        ).addTo(map);

        const darkLayer = L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        );

        const osmLayer = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        );

        const topoLayer = L.tileLayer(
            "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        );

        const baseLayers = {
            "Light Theme": lightLayer,
            "Dark Theme": darkLayer,
            OpenStreetMap: osmLayer,
            "Topo Map": topoLayer,
        };

        if (enableLayerControl) {
            L.control.layers(baseLayers, null, {position: "topleft"}).addTo(map);
        }

        if (enableFullScreen) {
            L.control.fullscreen({position: "topleft"}).addTo(map);
        }

        if (enableMarkers) {
            markers.forEach((marker) => {
                const customIcon = L.icon({
                    iconUrl: marker.iconUrl || "/images/pointer.png",
                    iconSize: [15, 15],
                    iconAnchor: [8, 5],
                });

                const leafletMarker = L.marker([marker.lat, marker.lng], {
                    icon: customIcon,
                }).addTo(map);

                const handleMarkerClick = (leafletMarker: L.Marker) => {
                    const markerLatLng = leafletMarker.getLatLng();
                    const exists = selectedMarkers.current.some((latLng) =>
                        latLng.equals(markerLatLng)
                    );

                    if (exists) {
                        selectedMarkers.current = selectedMarkers.current.filter(
                            (latLng) => !latLng.equals(markerLatLng)
                        );

                        leafletMarker.setIcon(customIcon);

                        if (selectedMarkers.current.length < 3 && currentPolygon.current) {
                            map.removeLayer(currentPolygon.current);
                            currentPolygon.current = null;
                        }
                    } else {
                        selectedMarkers.current.push(markerLatLng);

                        leafletMarker.setIcon(
                            L.icon({
                                iconUrl: "/images/addZone.png",
                                iconSize: [15, 15],
                                iconAnchor: [8, 5],
                            })
                        );
                    }

                    if (selectedMarkers.current.length >= 3) {
                        const polygon = L.polygon(selectedMarkers.current, {
                            color: "red",
                            fillColor: "pink",
                            fillOpacity: 0.5,
                        }).addTo(map);

                        currentPolygon.current = polygon;

                        onRegionCreated &&
                        onRegionCreated(
                            selectedMarkers.current.map((latLng) => [
                                latLng.lat,
                                latLng.lng,
                            ])
                        );
                    }
                };

             if (enableRegionCreation) {
               leafletMarker.on("click", () =>
                 handleMarkerClick(leafletMarker)
               );
               if (marker.popupContent) {
                 const popupContainer = document.createElement("div");
                 const root = ReactDOM.createRoot(popupContainer);
                 root.render(marker.popupContent);
                 leafletMarker.bindPopup(popupContainer);

                 leafletMarker.on("mouseover", () => {
                   leafletMarker.openPopup();
                 });

                 leafletMarker.on("mouseout", () => {
                   leafletMarker.closePopup();
                 });
               }
             } else if (marker.popupContent) {
               const popupContainer = document.createElement("div");
               const root = ReactDOM.createRoot(popupContainer);
               root.render(marker.popupContent);
               leafletMarker.bindPopup(popupContainer);

               leafletMarker.on("mouseover", () => {
                 leafletMarker.openPopup();
               });

               leafletMarker.on("mouseout", () => {
                 leafletMarker.closePopup();
               });
             } else if (marker.popup) {
               leafletMarker.bindPopup(marker.popup);
             }

            });
        }

        if (enableRegions) {
            regions.forEach((region) => {
                L.polygon(region.coordinates, {
                    color: region.color || "red",
                    fillColor: region.fillColor || "pink",
                    fillOpacity: region.fillOpacity || 0.4,
                }).addTo(map);
            });
        }

        if (enableRegionCreation) {
            map.on("dblclick", () => {
                if (selectedMarkers.current.length > 2) {
                    const polygon = L.polygon(selectedMarkers.current, {
                        color: "blue",
                        fillColor: "cyan",
                        fillOpacity: 0.5,
                    }).addTo(map);

                    currentPolygon.current = polygon;

                    onRegionCreated &&
                    onRegionCreated(
                        selectedMarkers.current.map((latLng) => [latLng.lat, latLng.lng])
                    );

                    selectedMarkers.current = [];
                } else {
                    alert("برای رسم منطقه حداقل 3 مارکر انتخاب کنید.");
                }
            });
        }

        if (enableMapClick && onMapClick) {
            map.on("click", (e: L.LeafletMouseEvent) => {
                const latLng = {lat: e.latlng.lat, lng: e.latlng.lng};

                if (!enableMultiSelect) {
                    markersRef.current.forEach((marker) => map.removeLayer(marker));
                    markersRef.current = [];
                }

                const customIcon = L.icon({
                    iconUrl: "/images/pointer.png",
                    iconSize: [15, 15],
                    iconAnchor: [8, 6],
                });

                const newMarker = L.marker([latLng.lat, latLng.lng], {
                    icon: customIcon,
                }).addTo(map);
                markersRef.current.push(newMarker);

                const popupContainer = document.createElement("div");
                const root = ReactDOM.createRoot(popupContainer);
                root.render(
                  <div className="relative bg-[#FF7959] w-fit p-4 rounded-xl shadow-md text-white">
                    <h3>مختصات انتخابی:</h3>
                    <p>طول: {latLng.lng}</p>
                    <p>عرض: {latLng.lat}</p>
                    <button onClick={() => alert("Custom button clicked!")}>
                      Click Me
                    </button>
                  </div>
                );
                newMarker.bindPopup(popupContainer).openPopup();

                onMapClick(latLng);
            });
        }


        map.whenReady(() => {
            setInLoading(false);
        });

        return () => {
            map.remove();
        };
    }, [
        savedMapSettings.center,
        savedMapSettings.zoom,
        markers,
        regions,
        enableMarkers,
        enableRegions,
        enableFullScreen,
        enableLayerControl,
        enableMapClick,
        enableRegionCreation,
        onRegionCreated,
        onMapClick,
    ]);
    useEffect(() => {
        if (!mapInstanceRef.current || !focusMarkerId) return;

        const map = mapInstanceRef.current;
        const targetMarker = markers.find((marker) => marker.id === focusMarkerId);

        if (targetMarker) {
            const {lat, lng} = targetMarker;

            const leafletMarker =
                map._layers &&
                Object.values(map._layers).find(
                    (layer) =>
                        layer instanceof L.Marker &&
                        layer.getLatLng().lat === lat &&
                        layer.getLatLng().lng === lng
                );

            if (leafletMarker) {
                leafletMarker.openPopup();
            }

            map.setView([lat, lng], zoom);
        }
    }, [focusMarkerId, markers, zoom]);

    useEffect(() => {
        if (!mapInstanceRef.current || !focusRegionId || !regions.length) return;

        const map = mapInstanceRef.current;
        const targetRegion = regions.find(
            (region, index) => `region-${index}` === focusRegionId
        );

        if (targetRegion) {
            const bounds = L.latLngBounds(targetRegion.coordinates);
            map.fitBounds(bounds);
        }
    }, [focusRegionId, regions]);
    if (inLoading) {
        return (
            <div style={{height: "100%", width: "100%"}} className={className || ""}>
                <Loading/>
            </div>
        );
    }

    return (
        <div
            // data-aos={'fade'}
            ref={mapRef}
            style={{height: "100%", width: "100%"}}
            className={className || ""}
        />
    );
};

export default MapComponent;
