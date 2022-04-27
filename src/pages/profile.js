import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, CardHeader, Badge } from 'reactstrap';
import SurfingService from '../apis/SurfingService';

import data from '../data/user-profile.json';
import geoJSON from '../data/surf-results-page.json';
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
    const [localProfilePic, setLocalProfilePic] = useState(null)

    console.log(surfProfile)

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

    var profileImage = null;
    if (localProfilePic) {
        profileImage = <img
            src={localProfilePic}
            alt=""
            className="d-block avatar avatar-xxl p-2 mb-2"
            style={{ marginLeft: '5vh' }}
        />
    }
    else if (surfProfile.profilePic) {
        profileImage = <img
            src={surfProfile.profilePic}
            alt=""
            className="d-block avatar avatar-xxl p-2 mb-2"
            style={{ marginLeft: '5vh' }}
        />
    } else {
        profileImage = <img
            src={`/content/img/${data.avatar}`}
            alt=""
            className="d-block avatar avatar-xxl p-2 mb-2"
            style={{ marginLeft: '5vh' }}
        />
    }

    var profilePicNameDiv = null;
    if (surfProfile.fullName) {
        profilePicNameDiv = <input
            type='text'
            onChange={(e) => {
                var tempSurfProfile = { ...surfProfile, fullName: e.target.value }
                dispatch(putSurfAccountDetails(tempSurfProfile));
                setChanged(true)
            }}
            value={surfProfile.fullName}
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
    } else {
        profilePicNameDiv = <input
            type='text'
            onChange={(e) => {
                var tempSurfProfile = { ...surfProfile, fullName: e.target.value }
                dispatch(putSurfAccountDetails(tempSurfProfile));
                setChanged(true)
            }}
            value={authProfile.fullName}
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
    }

    var locationDiv = null;
    if (surfProfile.location) {
        locationDiv = <input
            type='text'
            onChange={(e) => {
                var tempSurfProfile = { ...surfProfile, location: e.target.value }
                dispatch(putSurfAccountDetails(tempSurfProfile));
                setChanged(true)
            }}
            value={surfProfile.location}
            style={{
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'center',
                fontSize: 14,
                alignSelf: 'center'
            }}
        />
    } else {
        locationDiv = <input
            type='text'
            onChange={(e) => {
                var tempSurfProfile = { ...surfProfile, location: e.target.value }
                dispatch(putSurfAccountDetails(tempSurfProfile));
                setChanged(true)
            }}
            value={"Los Angeles, CA"}
            style={{
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'center',
                fontSize: 14,
                alignSelf: 'center'
            }}
        />
    }

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

    var titleDiv = null;
    if (surfProfile.title) {
        titleDiv = <input
            type='text'
            onChange={(e) => {
                var tempSurfProfile = { ...surfProfile, title: e.target.value }
                dispatch(putSurfAccountDetails(tempSurfProfile));
                setChanged(true)
            }}
            value={surfProfile.title}
            style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontWeight: 'bold',
                marginLeft: '-0.3vh',
            }}
        />
    } else {
        titleDiv = <input
            type='text'
            onChange={(e) => {
                var tempSurfProfile = { ...surfProfile, title: e.target.value }
                dispatch(putSurfAccountDetails(tempSurfProfile));
                setChanged(true)
            }}
            value={"Hello!"}
            style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontWeight: 'bold',
                marginLeft: '-0.3vh',
            }}
        />
    }

    var mantraDiv = null;
    if (surfProfile.mantra) {
        mantraDiv = <input
            type='text'
            onChange={(e) => {
                var tempSurfProfile = { ...surfProfile, mantra: e.target.value }
                dispatch(putSurfAccountDetails(tempSurfProfile));
                setChanged(true)
            }}
            class='text-muted'
            value={surfProfile.mantra}
            style={{
                border: 'none',
                backgroundColor: 'transparent',
                width: '100%',
                marginLeft: '-0.3vh',
                fontColor: 'gray',
            }}
        />
    } else {
        mantraDiv = <input
            type='text'
            onChange={(e) => {
                var tempSurfProfile = { ...surfProfile, mantra: e.target.value }
                dispatch(putSurfAccountDetails(tempSurfProfile));
                setChanged(true)
            }}
            class='text-muted'
            value={"Hello there fam!"}
            style={{
                border: 'none',
                backgroundColor: 'transparent',
                width: '100%',
                marginLeft: '-0.3vh',
                fontColor: 'gray',
            }}
        />
    }

    var nameShownText = null;
    if (surfProfile.fullName) {
        nameShownText = surfProfile.fullName + "'s Favorites"
    } else if (authProfile.fullName) {
        nameShownText = authProfile.fullName + "'s Favorites"
    } else {
        nameShownText = "'s Favorites"
    }

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
                                            {profileImage}
                                        </div>
                                        <form>
                                            <input
                                                type='file'
                                                title=" "
                                                onChange={(e) => {
                                                    dispatch(putProfilePic(e.target.files[0]));
                                                    setLocalProfilePic(URL.createObjectURL(e.target.files[0]));
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
                                            {profilePicNameDiv}
                                        </form>
                                    </h5>
                                    <p className="text-muted text-sm mb-0">
                                        <form>
                                            {locationDiv}
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
                                    {titleDiv}
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
                                            {mantraDiv}
                                        </form>
                                    </p>
                                </div>
                            </div>
                            <div className="text-block">
                                <h4 className="mb-5">
                                    {nameShownText}
                                </h4>
                                {(surfProfile.favorites && surfProfile.favorites.length > 0) ?
                                    <Row>
                                        {surfProfile.favorites.map(listing => {
                                            var name = null;

                                            if (data["beach_name"] !== undefined) {
                                                name = data["beach_name"]
                                            } else if (data["lesson_name"] !== undefined) {
                                                name = data["lesson_name"]
                                            } else if (data["shop_name"] !== undefined) {
                                                name = data["shop_name"]
                                            }
                                            return <Col sm="6" lg="4" className="mb-30px hover-animate" key={name}>
                                                <CardSurf data={listing} />
                                            </Col>
                                        }
                                        )}
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

