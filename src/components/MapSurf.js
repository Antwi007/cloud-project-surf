import React, {  useState } from "react"
import { Link } from "react-router-dom"
import { MapContainer, Marker, Popup, TileLayer, Tooltip, Circle } from 'react-leaflet'
import L from "leaflet";
import MarkerIcon from './images/marker.svg'
import MarkerIconHighlight from './images/marker-hover.svg'


const MapSurf = (props) => {

    let tileLayers = []

    tileLayers[1] = { tiles: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', subdomains: 'abcd' }
    tileLayers[2] = { tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
    tileLayers[3] = { tiles: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png', attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
    tileLayers[4] = { tiles: 'https://mapserver.mapy.cz/base-m/{z}-{x}-{y}', attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://seznam.cz">Seznam.cz, a.s.</a>' }
    tileLayers[5] = { tiles: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', subdomains: 'abcd' }
    tileLayers[6] = { tiles: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia maps</a>' }

    const [hover, setHover] = useState(false)
    const [focus, setFocus] = useState(true)

    const icon = L.icon({
        iconUrl: MarkerIcon,
        shadowUrl: '',
        iconRetinaUrl: MarkerIcon,
        iconSize: [25, 37.5],
        popupAnchor: [0, -18],
        tooltipAnchor: [0, 19]
    })

    const highlightIcon = L.icon({
        iconUrl: MarkerIconHighlight,
        shadowUrl: '',
        iconRetinaUrl: MarkerIconHighlight,
        iconSize: [25, 37.5],
        popupAnchor: [0, -18],
        tooltipAnchor: [0, 19]
    })

    const markers = props.geoJSON && props.geoJSON?.map(feature =>
        [
            feature.beach_lat,
            feature.beach_lon
        ]
    )

    return (
        <MapContainer
            center={props.center}
            zoom={props.zoom}
            scrollWheelZoom={focus}
            bounds={props.geoJSON ? markers : null}
            className={props.className}
            dragging={props.dragging}
            tap={props.tap}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
        >
            <TileLayer
                url={tileLayers[1].tiles}
                attribution={tileLayers[1].attribution}

            />
            {props.geoJSON && props.geoJSON?.map(feature => {
                const data = feature
                return (
                        <Marker
                            key={data.surfline_id}
                            icon={hover === data.surfline_id || props.hoverCard === data.surfline_id ? highlightIcon : icon}
                            opacity={0}
                            position={[
                                data.beach_lat, data.beach_lon]}
                            onMouseEnter={() => {
                                setHover(data.id)
                            }}
                            onMouseLeave={() => {
                                setHover(false)
                            }}
                        >
                            <Tooltip
                                permanent={true}
                                interactive={true}
                                direction="top"
                                className={`map-custom-tooltip ${hover === data.surfline_id || props.hoverCard === data.surfline_id ? 'active' : ''}`}

                            >
                                {data.beach_name}
                            </Tooltip>

                            <Popup className="map-custom-popup" maxWidth="600" minWidth="200">

                                <div className="popup-rental">
                                    {data.thumbnail ?
                                        <div
                                            className={`image d-none d-md-block`}
                                            style={{ backgroundImage: `url(${data.thumbnail})` }}
                                        />
                                        :
                                        <div className="image" />
                                    }
                                    <div className="text">
                                        {data.beach_name &&
                                            <h6>
                                                <Link to="/surf-page-detail"> {data.beach_name} </Link>
                                            </h6>
                                        }
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                )
            }
            )}
            {props.markerPosition &&
                <Marker
                    position={props.markerPosition}
                    icon={icon}
                />
            }
            {props.circlePosition &&
                <Circle
                    center={props.circlePosition}
                    color={'#4E66F8'}
                    fillColor={'#8798fa'}
                    opacity={.5}
                    radius={props.circleRadius}
                    weight={2}
                />
            }
        </MapContainer>
    )
}

export default MapSurf;
