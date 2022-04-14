import React, {useEffect, useState} from 'react'

import {
    Container,
    Row,
    Col,
    Form,
    Label,
    Input
} from 'reactstrap'

import Select from 'react-select'

import CardSurf from '../components/CardSurf'
import surf_json from '../data/surf-results-page.json'

const SearchResultsPage = () => {
  const [searchKey, setSearchKey] = useState("");
  const data = {
    "options": [{
          "value": "small",
          "label": "Surf Breaks"
      },
      {
          "value": "medium",
          "label": "Surf Lessons"
      },
      {
          "value": "large",
          "label": "Surf Rentals"
      }
    ]
  }
  const [provider, setProvider] = useState(data.options[0])
  
  const handleSearchKeyChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleProviderChange = (e, useStateHook) => {
    setProvider(data.options.find((el) => el.value === e.value));
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg="6" className="py-4 p-xl-5">
            <h2 className="mt-6 mb-4"> Results Page</h2>
            <hr className="my-4" />
            <Form>
              <div className="mb-4">
                  <Label for="form_search" className="form-label">
                    Keyword
                  </Label>
                  <div className="input-label-absolute input-label-absolute-right">
                    <div className="label-absolute">
                      <i className="fa fa-search" />
                    </div>
                      <Input
                        type="search"
                        name="search"
                        placeholder="Keywords"
                        id="form_search"
                        className="pr-4"
                        value={searchKey}
                        onChange={handleSearchKeyChange}
                      />
                  </div>
                </div>
                <div className="mb-4">
                <Label for="form_length" className="form-label">
                  Search Category
                </Label>
                <div>
                  <Select
                    name="provider"
                    id="form_length"
                    options={data.options}
                    value={provider}
                    isSearchable
                    className="form-control dropdown bootstrap-select"
                    classNamePrefix="selectpicker"
                    onChange={(e) => handleProviderChange(e, setProvider)}
                  />
                </div>
              </div>
            </Form>
            <hr className="my-4" />
            <Row>
            {surf_json.features && surf_json.features.map(room =>
                <Col
                    key={room.properties.name}
                    sm="6"
                    className="mb-5 hover-animate"
                >
                    <CardSurf data={room.properties} />
                </Col>
            )}
            </Row>
          </Col>
          <Col
            lg="6"
            className="map-side-lg pr-lg-0" 
          > 
            <p>Ayo where you at</p>
          </Col>
        </Row>
      </Container>
     </React.Fragment>
  )
}

export default SearchResultsPage
