import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Row, Col, Button, Form, Input, Label, FormGroup} from 'reactstrap'

export async function getStaticProps() {
    return {
        props: {
            title: "Sign in",
            hideHeader: true,
            hideFooter: true,
            noPaddingTop: true
        },
    }
}

const logIn = () => {
    return (
        <Container fluid className="px-3">
            <Row className="min-vh-100 justify-content-center">
                <Col md="8" lg="6" xl="5" className="d-flex align-items-center">
                    <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
                        <div className="mb-5">
                            <h2>Welcome back</h2>
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
                                <Row>
                                    <Col>
                                        <Label for="loginPassword" className="form-label">
                                            Password
                                        </Label>
                                    </Col>
                                    <Col xs="auto">
                                        <a href="/" className="form-text small">
                                            Forgot password?
                                        </a>
                                    </Col>
                                </Row>
                                <Input
                                    name="loginPassword"
                                    id="loginPassword"
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
                                Sign in
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
                                Connect
                                <span className="d-none d-sm-inline">
                                    with Google
                                </span>
                            </Button>
                            <hr className="my-4" />
                            <p className="text-center">
                                <small className="text-muted text-center">
                                    Don't have an account yet?&nbsp;
                                    <Link href="/signup">
                                        Sign Up
                                    </Link>
                                </small>
                            </p>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container >
    )
}

export default logIn;
