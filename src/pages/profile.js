import React from 'react'

import { Container, Row, Col, Card, CardHeader, Badge } from 'reactstrap'

import data from '../data/user-profile.json'
import geoJSON from '../data/surf-results-page.json'

import CardSurf from '../components/CardSurf'

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

const profile = () => {

    return (
        <section className="py-5">
            <Container className="mt-6 ">
                <Row>
                    <Col lg="3" className="mr-lg-auto">
                        <Card className="border-0 shadow mb-6 mb-lg-0">
                            <CardHeader className="bg-gray-100 py-4 border-0 text-center">
                                <a href="/" className="d-inline-block">
                                    <img src={`/content/img/${data.avatar}`} alt="" className="d-block avatar avatar-xxl p-2 mb-2" />
                                </a>
                                <h5>{data.firstname} {data.lastname}</h5>
                                <p className="text-muted text-sm mb-0">
                                    {data.location}
                                </p>
                            </CardHeader>
                        </Card>
                    </Col>
                    <Col lg="9" className="pl-lg-5">
                        <h1 className="hero-heading mb-0">Hello, I'm {data.firstname}!</h1>
                        <div className="text-block">
                            <p>
                                <Badge color="secondary-light">
                                    Joined in {data.date}
                                </Badge>
                            </p>
                            <div dangerouslySetInnerHTML={{ __html: data.content }} />
                        </div>
                        <div className="text-block">
                            <h4 className="mb-5">
                                {data.firstname}'s Favorites
                            </h4>
                            <Row>
                                {geoJSON.features.map(listing =>
                                    <Col sm="6" lg="4" className="mb-30px hover-animate" key={listing.properties.name}>
                                        <CardSurf data={listing.properties} />
                                    </Col>
                                )}

                            </Row>
                        </div>
                    </Col>
                </Row>

            </Container>
        </section>
    )
}

export default profile;
