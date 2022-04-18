import React, { useEffect, useState } from 'react'

import {
    Container,
    Row,
    Col,
    Form,
    Label,
    Input
} from 'reactstrap'

import Select from 'react-select'
import UseWindowSize from '../hooks/UseWindowSize'

import CardSurf from '../components/CardSurf'
import surf_json from '../data/surf-results-page.json'
import MapSurf from '../components/MapSurf'

const SearchResultsPage = () => {
  const [searchKey, setSearchKey] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [tap, setTap] = useState(false)
  const [hoverCard, setHoverCard] = useState(null)
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
  const size = UseWindowSize();

  

  useEffect(() => {

    setMapLoaded(true)

    setTap(size.width > 700 ? true : false)
    setDragging(size.width > 700 ? true : false)
    }, [size.width])

    
    
    const onCardEnter = (id) => {
        setHoverCard(id)
    }
    const onCardLeave = () => {
      setHoverCard(null)
     }

  return (
    <React.Fragment>
      <Container fluid>
        <Row className="mt-6">
          <Col lg="6" className="py-4 p-xl-5">
            <h2 className="mb-4"> Results Page</h2>
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
              {surf_json.features && surf_json.features.map(loc =>
                  <Col
                      key={loc.properties.name}
                      sm="6"
                      className="mb-5 hover-animate"
                      onMouseEnter={() => onCardEnter(loc.properties.id)}
                      onMouseLeave={() => onCardLeave()}
                  >
                      
                      <CardSurf data={loc.properties} />
                  </Col>
              )}
            </Row>
          </Col>
          <div id="map">
          <Col
            lg="6"
            className="mt-1 map-side-lg pr-lg-0" 
          > 
              {mapLoaded &&
                  <MapSurf
                      className="map-full shadow-left"
                      center={[40.73723, -73.99967]}
                      zoom={14}
                      dragging={dragging}
                      tap={tap}
                      geoJSON={surf_json}
                      hoverCard={hoverCard}
                  />
              }
          </Col>
          </div>
        </Row>
      </Container>
     </React.Fragment>
  )
}

export default SearchResultsPage
