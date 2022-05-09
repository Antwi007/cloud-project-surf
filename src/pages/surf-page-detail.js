import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';

import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'

import UseWindowSize from '../hooks/UseWindowSize';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import '../scss/surfscore.scss';

import MapSurf from '../components/MapSurf'
import RSwiper from '../components/Swiper'
import SurfingService from '../apis/SurfingService';
import { putSurfAccountDetails } from '../actions';
import WeatherCard from '../components/WeatherCard';
import WindCard from '../components/WindCard';
import ErrorBoundary from '../components/ErrorBoundary';

const surfingObject = new SurfingService();

export async function getStaticProps() {
    return {
        props: {
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            title: 'Rooms detail'
        },
    }
}


const SurfPageDetail = (props) => {
    const [mapLoaded, setMapLoaded] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [tap, setTap] = useState(false)
    const [details, setDetails] = useState({})
    const [nearbyBeaches, setNearbyBeaches] = useState([])
    const [favoriteAdded, setFavoriteAdded] = useState(false)
    const [errorVisible, setErrorVisible] = useState(false);
    const [error, setError] = useState("");
    const [isSurfBreak, setIsSurfBreak] = useState(false);
    const [geoJSON, setGeoJSON] = useState([])
    const [addedRests, setAddedRests] = useState(false);
    const [hoverCard, setHoverCard] = useState(null);
    const [surfScoreColor, setSurfScoreColor] = useState("");
    const [thumbnail, setThumbnail] = useState(null)

    const [loading, setLoading] = useState(true);
    const location = useLocation()
    const { query, search_type } = location.state
    // console.log("query", query, "search type", search_type)

    const size = UseWindowSize()

    const dispatch = useDispatch();
    const surfProfile = useSelector(state => state.surfProfile)
    const authProfile = useSelector(state => state.auth);
    const userId = useSelector(state => state.auth.userId)

    useEffect(() => {
        setGeoJSON([query])
        var id = null;
        if (query.surfline_id) {
            id = query.surfline_id
        } else if (query.shop_id) {
            id = query.shop_id
        } else if (query.id) {
            id = query.id
        }
        setHoverCard(id)
    }, [props.location.id])

    useEffect(() => {
        setMapLoaded(true)

        setTap(size.width > 700 ? true : false)
        setDragging(size.width > 700 ? true : false)

        var id = null;
        if (query.surfline_id) {
            id = query.surfline_id
        } else if (query.shop_id) {
            id = query.shop_id
        } else if (query.id) {
            id = query.id
        }

        if (surfProfile.favorites) {
            setFavoriteAdded(surfProfile.favorites.includes(id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size.width, surfProfile, props.location.id])

    useEffect(() => {
        // console.log("called", addedRests, details["yelp-data"])
        if (!addedRests && details["yelp-data"] && details["yelp-data"]["restaurants"]) {
            var tempGeoJSON = [...geoJSON]
            for (let r of details["yelp-data"]["restaurants"]) {
                tempGeoJSON.push({
                    lat: r.coordinates.latitude,
                    lon: r.coordinates.longitude,
                    ...r
                })
            }
            setGeoJSON(tempGeoJSON)
            setAddedRests(true)
        }
    }, [details, props.location.id])

    async function getSurfResults(surf_id) {
        console.log("get surf results called", surf_id)
        try {
            const params = {}

            if (surf_id) {
                params["id"] = surf_id;
            }
            const resp = await surfingObject.getSurfDetails(params)
            // console.log("got it", resp)
            if (resp.statusCode === 200) {
                if ("surfline-data" in resp.body) {
                    setIsSurfBreak(true)
                }
                console.log(resp.body)
                setDetails(resp.body);
                setThumbnail(resp.body.thumbnail)
                                
                if (resp.body["surf-score"] <= 4) {
                    setSurfScoreColor("red")
                } else if (resp.body["surf-score"] <= 7) {
                    setSurfScoreColor("yellow")
                } else {
                    setSurfScoreColor("green")
                }
            }



        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function sendDetailsEmail() {
        try {

            if (userId === null) {
                setError('Please make sure you are signed in.')
                setErrorVisible(true)
                return
            }

            const params = {}

            // params["user_id"] = "aschreiber1";
            params["user_id"] = userId;
            params["type"] = search_type;
            params["body"] = (isSurfBreak) ? details : query;

            const resp = await surfingObject.sendEmail(params)

            if (resp === true) {
                setError('Successfully sent email, please check in a few minutes.')
                setErrorVisible(true)
                return
            } else {

                return
            }

        } catch (error) {
            setError('Sorry there was a problem. Please try again later.')
            setErrorVisible(true)
        }
        return
    }

    var name_dict = {
        "beaches": "beach_name",
        "lessons": "shop_name",
        "surfshops": "shop_name"
    }

    var option_dict = {
        "beaches": "Surf Breaks",
        "lessons": "Surf Lessons",
        "surfshops": "Surf Rentals"
    }

    var lon_dict = {
        "beaches": "beach_lon",
        "lessons": "shop_lon",
        "surfshops": "shop_lon"
    }

    var lat_dict = {
        "beaches": "beach_lat",
        "lessons": "shop_lat",
        "surfshops": "shop_lat"
    }

    useEffect(async () => {
        // console.log("use effeeeeeect", search_type, search_type === "lessons" || search_type === "surfshops")
        const id = query["surfline_id"] ?? query["id"]
        if (search_type === "beaches") {
            await getSurfResults(id);
        }
        if (search_type === "lessons" || search_type === "surfshops") {
            if (query["nearest_beaches"]) {
                var obj = JSON.parse(query["nearest_beaches"])
                var res = []
                for (var i in obj) {
                    const bData = await surfingObject.getFavoriteLocation(obj[i]["surfline_id"] ?? obj[i]["id"])
                    res.push({
                        ...bData,
                        ...obj[i],
                        beach_lon: bData.lon,
                        beach_lat: bData.lat
                    })
                }
                setNearbyBeaches(res)
            }
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.location.id, query])


    console.log()
    const dismissError = () => {
        setError("");
        setErrorVisible(false);
    };

    const onCardEnter = (id) => {
        setHoverCard(id)
    }
    const onCardExit = () => {
        setHoverCard(null)
    }

    return (
        <ErrorBoundary>
            <div key={props.location.id}>
                <React.Fragment>
                    <section>
                        <Container className="py-5 mt-6">
                            <Row>
                                <Col lg="8">
                                    <div className="text-block">
                                        {query[name_dict[search_type]] &&
                                            <h1>
                                                {query[name_dict[search_type]]}
                                            </h1>
                                        }
                                        {option_dict[search_type] &&
                                            <div className="text-muted text-uppercase mb-4">
                                                {option_dict[search_type]}
                                            </div>
                                        }
                                        {search_type === "beaches" && details["surf-score"] &&
                                            <p>
                                                Surf-Score <i className={`fa fa-star mr-1 text-secondary`} /> <span className={surfScoreColor}>{details["surf-score"].toFixed(2)}</span>
                                            </p>
                                        }
                                        {search_type === "lessons" &&
                                            <ul className="list-inline text-sm mb-4">
                                                <li
                                                    key={1}
                                                    className="list-inline-item mr-3"
                                                >
                                                    Rating ({query["number_reviews"]}) <i className={`fa fa-star mr-1 text-secondary`} /> {query["rating"]}
                                                </li>
                                            </ul>
                                        }
                                    </div>
                                    {search_type === "beaches" &&
                                        <React.Fragment>
                                            <div className="text-block">
                                                <h4 className="mb-4">Beach Details</h4>
                                                <Row>
                                                    {loading && search_type === "beaches" &&
                                                        [...Array(2)].map((el, index) => (
                                                            <Col key={index} sm="6" className="mb-5 hover-animate">
                                                                <Skeleton count={5} />
                                                            </Col>
                                                        ))
                                                    }
                                                    <Col md="4">
                                                        {Object.keys(details).length !== 0 &&
                                                            <WeatherCard data={details["weather-data"]}></WeatherCard>
                                                        }
                                                    </Col>
                                                    <Col className="w-50">
                                                        {Object.keys(details).length !== 0 &&
                                                            <WindCard data={details["surfline-data"]}></WindCard>
                                                        }
                                                    </Col>
                                                </Row>
                                            </div>
                                        </React.Fragment>
                                    }
                                    {(search_type === "lessons" || search_type === "surfshops") && <h4 className="mb-4 mt-2">Location Details</h4>}
                                    {(search_type === "lessons" || search_type === "surfshops") &&
                                        <section>
                                            <Container>
                                                <Row>
                                                    {query["address1"] && (
                                                        <Col md="4" className="text-center text-md-left mb-4 mb-md-0">
                                                            <div className="icon-rounded mb-4 bg-primary-light">
                                                                <svg className="svg-icon w-2rem h-2rem text-primary">
                                                                    <use xlinkHref="content/svg/orion-svg-sprite.svg#map-location-1" />
                                                                </svg>
                                                            </div>
                                                            <h3 className="h5">Address</h3>
                                                            <p className="text-muted">
                                                                {query["address1"]}
                                                                <br />
                                                                {query["city"] && query["city"]}, {query["state"] && query["state"]}, {query["zip_code"] && query["zip_code"]}
                                                                <br />
                                                                {query["phone_number"] && query["phone_number"]}
                                                            </p>
                                                        </Col>
                                                    )}
                                                </Row>
                                            </Container>
                                        </section>
                                    }
                                    <Row>
                                        {loading && search_type === "beaches" &&
                                            [...Array(2)].map((el, index) => (
                                                <Col key={index} sm="6" className="mb-5 hover-animate">
                                                    <Skeleton count={5} />
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                    {search_type === "beaches" && Object.keys(details).length !== 0 &&
                                        <>

                                            <h4 className="mb-4 mt-2">Nearby Shops</h4>
                                            <RSwiper
                                                data={details["yelp-data"]["surfshop"]}
                                                cards
                                                onCardEnter={onCardEnter}
                                                onCardExit={onCardExit}
                                            />
                                            <h4 className="mb-4 mt-2">Nearby Lessons</h4>
                                            <RSwiper
                                                data={details["yelp-data"]["surfschools"]}
                                                cards
                                                onCardEnter={onCardEnter}
                                                onCardExit={onCardExit}
                                            />
                                            <h4 className="mb-4 mt-2">Nearby restaurants</h4>
                                            <RSwiper
                                                data={details["yelp-data"]["restaurants"]}
                                                cards
                                                onCardEnter={onCardEnter}
                                                onCardExit={onCardExit}
                                            />
                                        </>
                                    }
                                    {(search_type === "lessons" || search_type === "surfshops") && <h4 className="mb-4 mt-2">Nearby Beaches</h4>}
                                    {(search_type === "lessons" || search_type === "surfshops") &&
                                        <RSwiper
                                            data={nearbyBeaches}
                                            type="beaches"
                                            center={[query[lat_dict[search_type]], query[lon_dict[search_type]]]}
                                            beaches
                                        />
                                    }
                                    <div className="text-block">
                                        <h3 className="mb-4">Location</h3>
                                        <div className="map-wrapper-300 mb-3">
                                            {mapLoaded &&
                                                <MapSurf
                                                    className="h-100"
                                                    center={[query[lat_dict[search_type]], query[lon_dict[search_type]]]}
                                                    circlePosition={[query[lat_dict[search_type]], query[lon_dict[search_type]]]}
                                                    circleRadius={500}
                                                    zoom={14}
                                                    dragging={dragging}
                                                    tap={tap}
                                                    geoJSON={geoJSON}
                                                    type={search_type}
                                                    hoverCard={hoverCard}
                                                />
                                            }
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4">
                                    <div
                                        style={{ top: "100px" }}
                                        className="p-4 shadow ml-lg-4 rounded sticky-top"
                                    >
                                        <img
                                            src={thumbnail ? thumbnail : query["thumbnail"]}
                                            alt={query[name_dict[search_type]]}
                                            style={{ width: "100%" }}
                                            className="my-3"
                                        />
                                        <hr className="my-4" />
                                        {(search_type === "lessons" || search_type === "surfshops") &&
                                            <Button
                                                type="submit"
                                                color="primary"
                                                block
                                                onClick={() => {
                                                    window.open(
                                                        query["yelp_url"],
                                                        '_blank'
                                                    )
                                                }}
                                            >
                                                Visit Website

                                            </Button>
                                        }
                                        {(search_type === "lessons" || search_type === "surfshops") &&
                                            <hr className="my-4" />
                                        }
                                        <div className="text-center">
                                            <p>
                                                {(favoriteAdded && authProfile.isSignedIn) ?
                                                    <button
                                                        onClick={async () => {
                                                            var id = null;
                                                            if (query.surfline_id) {
                                                                id = query.surfline_id
                                                            } else if (query.shop_id) {
                                                                id = query.shop_id
                                                            } else if (query.id) {
                                                                id = query.id
                                                            }
                                                            var tempFavs = surfProfile.favorites.filter(function (loc) {
                                                                return loc !== id
                                                            })
                                                            var tempSurfProfile = { ...surfProfile, favorites: tempFavs }
                                                            dispatch(putSurfAccountDetails(tempSurfProfile));
                                                            setFavoriteAdded(false);
                                                            await surfingObject.deleteFavorites(userId, id);
                                                        }}
                                                        style={{ border: 'none', backgroundColor: 'transparent' }}
                                                        disabled={!authProfile.isSignedIn}
                                                    >
                                                        <a className="text-secondary text-sm">
                                                            {authProfile.isSignedIn ?
                                                                <div>
                                                                    <i className="fa fa-heart" />
                                                                    &nbsp;Surf Location added to Favorites!
                                                                </div> :
                                                                <div>
                                                                    &nbsp;Login To Access Favorites
                                                                </div>}
                                                        </a>
                                                    </button> :
                                                    <>
                                                        <button
                                                            onClick={async () => {
                                                                var id = null;
                                                                if (query.surfline_id) {
                                                                    id = query.surfline_id
                                                                } else if (query.shop_id) {
                                                                    id = query.shop_id
                                                                } else if (query.id) {
                                                                    id = query.id
                                                                }
                                                                var tempFavs = surfProfile.favorites ?? []
                                                                tempFavs.push(id)
                                                                var tempSurfProfile = { ...surfProfile, favorites: tempFavs }
                                                                dispatch(putSurfAccountDetails(tempSurfProfile));
                                                                setFavoriteAdded(true);
                                                                await surfingObject.putFavorites(userId, id);
                                                            }}
                                                            style={{ border: 'none', backgroundColor: 'transparent' }}
                                                            disabled={!authProfile.isSignedIn}
                                                        >
                                                            <a className="text-secondary text-sm text-muted">
                                                                {authProfile.isSignedIn ?
                                                                    <div>
                                                                        <i className="fa fa-heart" />
                                                                        &nbsp;Add Surf Location to Favorites
                                                                    </div> :
                                                                    <div>
                                                                        &nbsp;Login To Access Favorites
                                                                    </div>}
                                                            </a>

                                                        </button>

                                                    </>
                                                }
                                            </p><Button
                                                color="primary"
                                                onClick={sendDetailsEmail}
                                                disabled={!authProfile.isSignedIn}
                                            >
                                                Email me details
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Modal
                                isOpen={errorVisible}
                                toggle={dismissError}
                                className="text-center"
                            >
                                <ModalHeader className="border-0" toggle={dismissError}></ModalHeader>
                                <ModalBody className="border-0">{error}</ModalBody>
                                <ModalFooter className="border-0">
                                    <Button color="primary" onClick={dismissError}>
                                        Ok
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </Container>
                    </section>
                </React.Fragment>
            </div>
        </ErrorBoundary>
    )

}

export default SurfPageDetail;
