import React from 'react'
// import { Link }from 'react-router-dom'

import { Container, Row, Col, Button, Form, Input, Label, FormGroup } from 'reactstrap'

export async function getStaticProps() {
    return {
        props: {
            title: "Sign up",
            hideHeader: true,
            hideFooter: true,
            noPaddingTop: true
        },
    }
}
const signUp = () => {
    return (
        <Container fluid className="px-3">
          <Row className="min-vh-100 justify-content-center">
            <Col md="8" lg="6" xl="5" className="d-flex align-self-center">
                <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
                    <div className="mb-4">             
                      <h2>Sign up</h2>
                    </div>
                    <Form className="form-validate">
                        <FormGroup>
                            <Label for="loginUsername" className="form-label">
                                Email Adress
                        </Label>
                            <Input
                                name="loginUsername"
                                id="loginUsername"
                                type="email"
                                placeholder="name@address.com"
                                autoComplete="off"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Label
                                for="loginPassword"
                                className="form-label"
                            >
                                Password
                            </Label>
                            <Input
                                name="loginPassword"
                                id="loginPassword"
                                type="email"
                                placeholder="Password"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Label
                                for="loginPassword2"
                                className="form-label"
                            >
                                Confirm your password
                            </Label>
                            <Input
                                name="loginPassword2"
                                id="loginPassword2"
                                type="email"
                                placeholder="Password"
                                required
                            />
                        </FormGroup>
                        <Button
                            size="lg"
                            color="primary"
                            block
                        >
                            Sign up
                        </Button>
                        <hr
                            data-content="OR"
                            className="my-3 hr-text letter-spacing-2"
                        />
                        <Button
                            color="outline-muted"
                            block
                            className="btn-social mb-3"
                        >
                            <i className="fa-2x fa-google fab btn-social-icon" />
                            <span className="d-none d-sm-inline">
                              Connect with Google
                            </span>
                        </Button>
                    </Form>
                </div>
              </Col>
              {/* <Col md="4" lg="6" xl="7" className="d-none d-md-block mt-2">
                <div
                    // style={{ backgroundImage: "url(/content/img/undraw_through_the_desert_fcin.svg)" }}
                  //  className="bg-cover h-100 mr-n3"
                >
                </div>
                </Col> */}
          </Row>
        </Container>
    )
}

export default signUp;
