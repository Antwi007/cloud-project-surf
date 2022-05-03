import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, CardHeader, Badge } from 'reactstrap';
import SurfingService from '../apis/SurfingService';
import Skeleton from 'react-loading-skeleton'

import data from '../data/user-profile.json';
import sadSurf from '../components/images/sad_surf3.jpeg';

import { putProfilePic, putSurfAccountDetails } from '../actions';

import CardSurf from '../components/CardSurf';

const surfingObject = new SurfingService();

export async function getStaticProps() {
    return {
        props: {
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            loggedUser: true,
            title: "User Profile"
        },
    }
}

const Profile = () => {

    const dispatch = useDispatch();

    const surfProfile = useSelector(state => state.surfProfile)
    const authProfile = useSelector(state => state.auth)
    const isSignedIn = useSelector(state => state.auth.isSignedIn)
    const [changed, setChanged] = useState(false)
    const [profilePicChanged, setProfilePicChanged] = useState(false)
    const [favorites, setFavorites] = useState([]);
    const [profilePic, setProfilePic] = useState(null)
    const [fullName, setFullName] = useState(null);
    const [location, setLocation] = useState(null);
    const [title, setTitle] = useState(null);
    const [mantra, setMantra] = useState(null);
    const [loading, setLoading] = useState(true);

    // console.log("surf profile", surfProfile)

    /* async function getSurfResults(surf_id) {
        try {
            const params = {}

            if (surf_id) {
                params["id"] = surf_id;
            }
            const resp = await surfingObject.getSurfDetails(params)
            if (resp.statusCode === 200) {
                return resp.body
            }

        } catch (error) {
            console.log(error)
        }
    } */

    useEffect(async () => {
        var favoriteLocations = []
        for (var i = 0; i < surfProfile.favorites.length; i += 1) {
            var surfLocation = await surfingObject.getFavoriteLocation(surfProfile.favorites[i]);
            // var surfLocationData = await getSurfResults(surfLocation.id);
            // console.log("surf favorite", surfLocation, surfLocationData);
            favoriteLocations.push(surfLocation);
        }
        setFavorites(favoriteLocations);
        setLoading(false);
    }, [surfProfile.favorites])

    useEffect(() => {
        try {
            var u = URL.createObjectURL(surfProfile.profilePic);
            setProfilePic(u)
        } catch {
            setProfilePic(surfProfile.profilePic ? surfProfile.profilePic : `/content/img/${data.avatar}`)
        }
        setFullName((surfProfile.fullName && surfProfile.fullName !== "undefined") ? surfProfile.fullName : authProfile.fullName)
        setLocation((surfProfile.location && surfProfile.location !== "null") ? surfProfile.location : "Los Angeles, CA")
        setTitle((surfProfile.title && surfProfile.title !== "null") ? surfProfile.title : "Hello!")
        setMantra((surfProfile.mantra && surfProfile.mantra !== "null") ? surfProfile.mantra : "Hello there Fam!")
    }, [surfProfile])

    const notLoggedIn = <div class="card text-center"
        style={{
            border: 'none',
            flexDirection: 'row',
            width: '80%',
            marginTop: '8%',
        }}>
        <img
            src={sadSurf}
            alt=""
            style={{ border: 'none', width: '50%' }}
        />
        <h2 style={{ alignSelf: 'center', width: '50%' }}>
            You are not logged into our website.
            <br />
            <br />
            You can login using your Google Account from the top right!
        </h2>
    </div>

    const save = () => {
        if (changed) {
            surfingObject.putSurfingAccount(authProfile.userId, surfProfile)
        }
        if (profilePicChanged) {
            surfingObject.putProfilePic(authProfile.userId, surfProfile.profilePic)
        }

        setProfilePicChanged(false)
        setChanged(false)
    }

    var nameShownText = fullName ? fullName + "'s Favorites" : "'s Favorites"

    if (isSignedIn) {
        return (
            <section className="py-5">
                <Container className="mt-6 ">
                    <Row>
                        <Col lg="3" className="mr-lg-auto">
                            <Card className="border-0 shadow mb-6 mb-lg-0">
                                <CardHeader className="bg-gray-100 py-4 border-0 text-center">
                                    <a className="d-inline-block">
                                        <div>
                                            <img
                                                src={profilePic}
                                                alt=""
                                                className="d-block avatar avatar-xxl p-2 mb-2"
                                                style={{ marginLeft: '5vh' }}
                                            />
                                        </div>
                                        <form>
                                            <input
                                                type='file'
                                                title=" "
                                                onChange={(e) => {
                                                    console.log(e.target.files[0])
                                                    var u = URL.createObjectURL(e.target.files[0])
                                                    dispatch(putProfilePic(e.target.files[0]));
                                                    setProfilePic(u);
                                                    setProfilePicChanged(true);
                                                }}
                                                style={{
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    color: 'transparent',
                                                    marginLeft: '8vh',
                                                }}
                                            />
                                        </form>
                                    </a>
                                    <h5>
                                        <form>
                                            <input
                                                type='text'
                                                onChange={(e) => {
                                                    var tempSurfProfile = { ...surfProfile, fullName: e.target.value }
                                                    dispatch(putSurfAccountDetails(tempSurfProfile));
                                                    setChanged(true);
                                                    setFullName(e.target.value);
                                                }}
                                                value={fullName}
                                                style={{
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    textAlign: 'center',
                                                    fontSize: 18,
                                                    fontWeight: 'bold',
                                                    alignSelf: 'center',
                                                    marginTop: '1vh',
                                                }}
                                            />
                                        </form>
                                    </h5>
                                    <p className="text-muted text-sm mb-0">
                                        <form>
                                            <input
                                                type='text'
                                                onChange={(e) => {
                                                    var tempSurfProfile = { ...surfProfile, location: e.target.value }
                                                    dispatch(putSurfAccountDetails(tempSurfProfile));
                                                    setChanged(true);
                                                    setLocation(e.target.value);
                                                }}
                                                value={location}
                                                style={{
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    textAlign: 'center',
                                                    fontSize: 14,
                                                    alignSelf: 'center'
                                                }}
                                            />
                                        </form>
                                    </p>
                                </CardHeader>
                            </Card>
                            {(changed || profilePicChanged) ?
                                <div>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        style={{
                                            marginTop: '5%',
                                            marginLeft: '35%',
                                            width: '30%',
                                        }}
                                        onClick={() => save()}
                                    >
                                        Save
                                    </button>
                                </div> : <div>
                                    <button
                                        type="button"
                                        class="btn btn-dark"
                                        disabled={true}
                                        style={{
                                            marginTop: '5%',
                                            marginLeft: '35%',
                                            width: '30%',
                                        }}
                                        onClick={() => save()}
                                    >
                                        Save
                                    </button>
                                </div>
                            }
                        </Col>
                        <Col lg="9" className="pl-lg-5">
                            <h1 className="hero-heading mb-0">
                                <form>
                                    <input
                                        type='text'
                                        onChange={(e) => {
                                            var tempSurfProfile = { ...surfProfile, title: e.target.value }
                                            dispatch(putSurfAccountDetails(tempSurfProfile));
                                            setChanged(true)
                                            setTitle(e.target.value)
                                        }}
                                        value={title}
                                        style={{
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            fontWeight: 'bold',
                                            marginLeft: '-0.3vh',
                                        }}
                                    />
                                </form>
                            </h1>
                            <div className="text-block">
                                <p>
                                    <Badge color="secondary-light">
                                        Joined in {data.date}
                                    </Badge>
                                </p>
                                <div>
                                    <p class='text-muted'>
                                        <form>
                                            <input
                                                type='text'
                                                onChange={(e) => {
                                                    var tempSurfProfile = { ...surfProfile, mantra: e.target.value }
                                                    dispatch(putSurfAccountDetails(tempSurfProfile));
                                                    setChanged(true);
                                                    setMantra(e.target.value);
                                                }}
                                                class='text-muted'
                                                value={mantra}
                                                style={{
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    width: '100%',
                                                    marginLeft: '-0.3vh',
                                                    fontColor: 'gray',
                                                }}
                                            />
                                        </form>
                                    </p>
                                </div>
                            </div>
                            <div className="text-block">
                                <h4 className="mb-5">
                                    {nameShownText}
                                </h4>
                                {(!loading && surfProfile.favorites && surfProfile.favorites.length > 0) ?
                                    <Row>
                                        {favorites.map(listing => {
                                            var name = null;

                                            if (listing["beach_name"] !== undefined) {
                                                name = listing["beach_name"]
                                            } else if (listing["lesson_name"] !== undefined) {
                                                name = listing["lesson_name"]
                                            } else if (listing["shop_name"] !== undefined) {
                                                name = listing["shop_name"]
                                            }

                                            listing["beach_lat"] = listing["beach_lat"] ?? listing["lat"]
                                            listing["shop_lat"] =  listing["shop_lat"] ?? listing["lat"]

                                            listing["beach_lon"] = listing["beach_lon"] ?? listing["lon"]
                                            listing["shop_lon"] = listing["shop_lon"] ?? listing["lon"]

                                            listing["surfline_id"] = listing["surfline_id"] ?? listing["id"]

                                            // console.log("listing", listing)

                                            return <Col sm="6" lg="4" className="mb-30px hover-animate" key={name}>
                                                <CardSurf data={listing} />
                                            </Col>
                                        }
                                        )}
                                    </Row> :
                                    (loading && surfProfile.favorites && surfProfile.favorites.length > 0) ?
                                        <Row>
                                            {loading &&
                                                surfProfile.favorites.map((index) => (
                                                    <Col key={index} sm="6" className="mb-5 hover-animate">
                                                        <Skeleton count={5} />
                                                    </Col>
                                                ))
                                            }
                                        </Row> :
                                        <div class="card text-center" style={{ border: 'none', flexDirection: 'row' }}>
                                            <img
                                                src={sadSurf}
                                                alt=""
                                                style={{ border: 'none', width: '50%' }}
                                            />
                                            <h2 style={{ alignSelf: 'center', width: '50%' }}>
                                                You don't have any
                                                <br />
                                                favorite spots.
                                                <br />
                                                <br />
                                                Let's go find some!
                                            </h2>
                                        </div>
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    } else {
        return notLoggedIn;
    }
}

export default Profile;

