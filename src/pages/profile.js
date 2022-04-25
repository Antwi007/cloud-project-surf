import React from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardHeader, Badge } from 'reactstrap'
import history from '../history';
import SurfingService from '../apis/SurfingService';

import data from '../data/user-profile.json';
import geoJSON from '../data/surf-results-page.json';
import sadSurf from '../components/images/sad_surf3.jpeg';

import { getAccountDetails, putProfilePic, putSurfAccountDetails } from '../actions';

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

class profile extends React.Component {
    constructor() {
        super();
        this.state = {
            changed: false,
            location: null,
            fullName: null,
            title: null,
            mantra: null,
            profilePic: null,
            profilePicChanged: null,
            firstName: null,
            favorites: [],
        }
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleFullNameChange = this.handleFullNameChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleMantraChange = this.handleMantraChange.bind(this)
        this.handleProfilePicChange = this.handleProfilePicChange.bind(this)
    }

    componentDidMount() {
        this.unblock = history.block(() => {
            if (this.state.changed) {
                const { profilePicChanged, changed, ...copy } = this.state
                this.props.putSurfAccountDetails(copy)
                // surfingObject.putSurfingAccount(this.props.auth.userId, this.state)
            }
            if (this.state.profilePicChanged) {
                surfingObject.putProfilePic(this.props.auth.userId, this.props.surfProfile.profilePic)
            }
            return true;
        });
    }
    componentWillUnmount() {
        this.unblock();
    }

    handleLocationChange = (e) => {
        this.setState({
            location: e.target.value,
            changed: true
        })
    }

    handleFullNameChange = (e) => {
        this.setState({
            fullName: e.target.value,
            changed: true
        })
    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
            changed: true
        })
    }

    handleMantraChange = (e) => {
        this.setState({
            mantra: e.target.value,
            changed: true
        })
    }

    handleProfilePicChange = (e) => {
        this.setState({
            profilePicChanged: true,
            profilePic: e
        })
        this.props.putProfilePic(e);
    }

    render() {
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
        </div>;
        return this.props.auth.isSignedIn ? (
            <section className="py-5">
                <Container className="mt-6 ">
                    <Row>
                        <Col lg="3" className="mr-lg-auto">
                            <Card className="border-0 shadow mb-6 mb-lg-0">
                                <CardHeader className="bg-gray-100 py-4 border-0 text-center">
                                    <a className="d-inline-block">
                                        <div>
                                            <img
                                                src={this.props.surfProfile.profilePic ?
                                                    URL.createObjectURL(this.props.surfProfile.profilePic)
                                                    : `/content/img/${data.avatar}`}
                                                alt=""
                                                className="d-block avatar avatar-xxl p-2 mb-2"
                                                style={{ marginLeft: '5vh' }}
                                            />
                                        </div>
                                        <form>
                                            <input
                                                type='file'
                                                title=" "
                                                onChange={(e) => this.handleProfilePicChange(e.target.files[0])}
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
                                                onChange={(e) => this.handleFullNameChange(e)}
                                                defaultValue={this.props.surfProfile.fullName || this.props.auth.fullName}
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
                                                onChange={(e) => this.handleLocationChange(e)}
                                                defaultValue={this.props.surfProfile.location || data.location}
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
                        </Col>
                        <Col lg="9" className="pl-lg-5">
                            <h1 className="hero-heading mb-0">
                                <form>
                                    <input
                                        type='text'
                                        onChange={(e) => this.handleTitleChange(e)}
                                        defaultValue={this.props.surfProfile.title || "Hello!"}
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
                                                onChange={(e) => this.handleMantraChange(e)}
                                                class='text-muted'
                                                defaultValue={this.props.surfProfile.mantra || "Welcome to my page Fam!"}
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
                                    {this.state.fullName ?? (this.props.surfProfile.fullName || this.props.auth.fullName)}'s Favorites
                                </h4>
                                {this.state.favorites.length > 0 ?
                                    <Row>
                                        {geoJSON.features.map(listing =>
                                            <Col sm="6" lg="4" className="mb-30px hover-animate" key={listing.properties.name}>
                                                <CardSurf data={listing.properties} />
                                            </Col>
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
            </section >   
        ) : notLoggedIn
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        surfProfile: state.surfProfile,
    };
};

export default connect(
    mapStateToProps,
    { getAccountDetails, putProfilePic, putSurfAccountDetails }
)(profile);



