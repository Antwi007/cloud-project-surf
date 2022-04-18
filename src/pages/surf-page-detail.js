import React, { useEffect, useState }from 'react'

import {
    Container,
    Row,
    Col,
    Form,
    Button,
    FormGroup,
} from 'reactstrap'

import UseWindowSize from '../hooks/UseWindowSize'

import data from '../data/surf-details.json'

import MapSurf from '../components/MapSurf'

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

    const size = UseWindowSize()

    useEffect(() => {

        setMapLoaded(true)

        setTap(size.width > 700 ? true : false)
        setDragging(size.width > 700 ? true : false)
    }, [size.width])

    const groupByN = (n, data) => {
        let result = [];
        for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
        return result;
    };

    const groupedAmenities = data.amenities && groupByN(3, data.amenities)

    return (
        <React.Fragment>
            <section>
                <Container className="py-5 mt-4">
                    <Row>
                        <Col lg="8">
                            <div className="text-block">
                                <p className="text-primary">
                                    <i className="fa-map-marker-alt fa mr-1" />
                                    &nbsp;{data.location && data.location}
                                </p>
                                {data.title &&
                                    <h1>
                                        {data.title}
                                    </h1>
                                }
                                {data.category &&
                                    <div className="text-muted text-uppercase mb-4">
                                        {data.category}
                                    </div>
                                }
                                {data.tags &&
                                    <ul className="list-inline text-sm mb-4">
                                        {data.tags.map(tag =>
                                            <li
                                                key={tag.value}
                                                className="list-inline-item mr-3"
                                            >
                                               Surf-Score <i className={`fa fa-star mr-1 text-secondary`} /> {tag.value}
                                            </li>
                                        )}
                                    </ul>
                                }
                                <h6 className="mb-3">Location Description</h6>
                                <p className="text-muted font-weight-light">Welcome to Luigi's! We're excited you can join us at this wonderful beach for surfing </p>
                                <p className="text-muted font-weight-light">A vast Sandy Beach on the edge of the place where people do those things</p>
                            </div>
                            {data.amenities &&
                                <React.Fragment>
                                    <div className="text-block">
                                        <h4 className="mb-4">Beach Details</h4>
                                        <Row>
                                            {groupedAmenities && groupedAmenities.map(amenityBlock =>
                                                <Col key={amenityBlock[0].value} md="6">
                                                    <ul className="list-unstyled text-muted">
                                                        {amenityBlock.map(amenity =>
                                                            <li
                                                                key={amenity.value}
                                                                className="mb-2">
                                                                <span className="txt-sm">  {amenity.value} : { amenity.icon}</span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </Col>
                                            )}
                                        </Row>
                                    </div>
                                </React.Fragment>
                            }
                            <div className="text-block">
                                <h3 className="mb-4">Location</h3>
                                <div className="map-wrapper-300 mb-3">
                                    {mapLoaded &&
                                        <MapSurf
                                            className="h-100"
                                            center={[40.732346, -74.0014247]}
                                            circlePosition={[40.732346, -74.0014247]}
                                            circleRadius={500}
                                            zoom={14}
                                            dragging={dragging}
                                            tap={tap}
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
                                src={`/content/img/surf_photo_2.jpeg`} 
                                alt={data.name}
                                style={{ width : "100%"}}
                                className="my-3"
                                />
                                <hr className="my-4" />
                                <Form
                                    id="booking-form"
                                    method="get"
                                    action="#"
                                    autoComplete="off"
                                    className="form"
                                >
                                    <FormGroup>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            block
                                        >
                                            Visit Website
                                        </Button>
                                    </FormGroup>
                                </Form>
                                <hr className="my-4" />
                                <div className="text-center">
                                    <p>
                                        <a href="/" className="text-secondary text-sm">
                                            <i className="fa fa-heart" />
                                    &nbsp;Save this Surf Location
                                     </a>
                                    </p>
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
