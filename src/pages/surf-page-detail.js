import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';

import {
    Container,
    Row,
    Col,
    Form,
    Button,
    FormGroup,
} from 'reactstrap'

import UseWindowSize from '../hooks/UseWindowSize';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MapSurf from '../components/MapSurf'
import Swiper from '../components/Swiper'
import SurfingService from '../apis/SurfingService';
import { putSurfAccountDetails } from '../actions';

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


const SurfPageDetail = () => {
    const [mapLoaded, setMapLoaded] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [tap, setTap] = useState(false)
    const [details, setDetails] = useState({})
    const [nearbyBeaches, setNearbyBeaches] = useState([])
    const [favoriteAdded, setFavoriteAdded] = useState(false)

    const [isSurfBreak, setIsSurfBreak] = useState(false);

    const [loading, setLoading] = useState(true);
    const location = useLocation()
    const { query, search_type } = location.state

    const size = UseWindowSize()

    const dispatch = useDispatch();
    const surfProfile = useSelector(state => state.surfProfile)
    const userId = useSelector(state => state.auth.userId)

    useEffect(() => {

        setMapLoaded(true)

        setTap(size.width > 700 ? true : false)
        setDragging(size.width > 700 ? true : false)

        if (surfProfile.favorites) {
            setFavoriteAdded(surfProfile.favorites.includes(query.surfline_id))
        }
    }, [size.width, surfProfile])

    async function getSurfResults(surf_id) {
        try {
            const params = {}

            if (surf_id) {
                params["id"] = surf_id;
            }
            const resp = await surfingObject.getSurfDetails(params)
            if (resp.statusCode === 200) {
                if ("surfline-data" in resp.body){
                    setIsSurfBreak(true)
                }
                setDetails(resp.body);
            }

        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
          }
    }

    async function sendDetailsEmail() {
        try {
            const params = {}
  
            // params["user_id"] = "aschreiber1";
            params["user_id"] = userId;
            params["type"] = search_type;
            params["body"] = (isSurfBreak) ? details : query;                        
            
            const resp = await surfingObject.sendEmail(params)

            
            if (resp === true) {
                alert('Successfully sent email, please check in a few minutes.')
                return
            } else {
                alert('Sorry there was a problem. Please try again later.')
                return
            }

        } catch (error) {
            console.log(error);
            alert('Sorry there was a problem. Please try again later.');
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

    useEffect(() => {
        if (search_type === "beaches") {
            getSurfResults(query["surfline_id"]);
        }

        if (search_type === "lessons" || search_type === "surfshops") {
            if (query["nearest_beaches"]) {
                var obj = JSON.parse(query["nearest_beaches"])
                var res = []
                for (var i in obj) {
                    res.push(obj[i])
                }
                setNearbyBeaches(res)
            }
        }
    }, [])

    return (
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
                                {/* <p className="text-primary">
                                        <i className="fa-map-marker-alt fa mr-1" />
                                        &nbsp;{data.location && data.location}
                                    </p> */}
                                {option_dict[search_type] &&
                                    <div className="text-muted text-uppercase mb-4">
                                        {option_dict[search_type]}
                                    </div>
                                }
                                {search_type === "beaches" && query["surf_score"] &&
                                    <p>
                                        Surf-Score <i className={`fa fa-star mr-1 text-secondary`} /> {query.surf_score.toFixed(2)}
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
                                            <Col>
                                                Weather
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
                            {search_type === "beaches" && <h4 className="mb-4 mt-2">Nearby restaurants</h4>}
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
                                <Swiper
                                    className="swiper-container-mx-negative pt-3 pb-5"
                                    perView={1}
                                    spaceBetween={20}
                                    roundLengths
                                    md={2}
                                    lg={3}
                                    xl={5}
                                    data={details["yelp-data"]["restaurants"]}
                                    cards
                                />
                            }
                            {(search_type === "lessons" || search_type === "surfshops") && <h4 className="mb-4 mt-2">Nearby Beaches</h4>}
                            {(search_type === "lessons" || search_type === "surfshops") &&
                                <Swiper
                                    className="swiper-container-mx-negative pt-3 pb-5"
                                    perView={1}
                                    spaceBetween={20}
                                    roundLengths
                                    md={2}
                                    lg={3}
                                    xl={5}
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
                                            geoJSON={[query]}
                                            type={search_type}
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
                                    src={query.thumbnail}
                                    alt={query[name_dict[search_type]]}
                                    style={{ width: "100%" }}
                                    className="my-3"
                                />
                                <hr className="my-4" />
                                {(search_type === "lessons" || search_type === "surfshops") &&
                                    <Form
                                        id="booking-form"
                                        method="get"
                                        action="#"
                                        autoComplete="off"
                                        className="form"
                                    >

                                        <FormGroup>
                                            <a href={query["yelp_url"]}>
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    block
                                                >
                                                    Visit Website

                                                </Button>
                                            </a>
                                        </FormGroup>
                                    </Form>
                                }
                                {(search_type === "lessons" || search_type === "surfshops") &&
                                    <hr className="my-4" />
                                }
                                <div className="text-center">
                                    <p>
                                        {favoriteAdded ?
                                            <button
                                                onClick={async () => {
                                                    var tempFavs = surfProfile.favorites.filter(function(loc) { 
                                                        return loc !== query.surfline_id
                                                    })
                                                    var tempSurfProfile = { ...surfProfile, favorites: tempFavs }
                                                    dispatch(putSurfAccountDetails(tempSurfProfile));
                                                    setFavoriteAdded(false);
                                                    await surfingObject.deleteFavorites(userId, query.surfline_id);
                                                }}
                                                style={{ border: 'none', backgroundColor: 'transparent' }}
                                            >
                                                <a className="text-secondary text-sm">
                                                    <i className="fa fa-heart" />
                                                    &nbsp;Surf Location added to Favorites!
                                                </a>
                                            </button> :
                                            <>
                                            <button
                                                onClick={async () => {
                                                    var tempFavs = surfProfile.favorites ?? []
                                                    tempFavs.push(query.surfline_id)
                                                    var tempSurfProfile = { ...surfProfile, favorites: tempFavs }
                                                    dispatch(putSurfAccountDetails(tempSurfProfile));
                                                    setFavoriteAdded(true);
                                                    await surfingObject.putFavorites(userId, query.surfline_id);
                                                }}
                                                style={{ border: 'none', backgroundColor: 'transparent' }}
                                            >
                                                <a className="text-secondary text-sm text-muted">
                                                    <i className="fa fa-heart" />
                                                    &nbsp;Add Surf Location to Favorites
                                                </a>
                                                
                                            </button>
                                            
                                            </>
                                        }
                                        
                                    </p><Button color="primary" onClick={sendDetailsEmail}>Email me details</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )

}

export default SurfPageDetail;
