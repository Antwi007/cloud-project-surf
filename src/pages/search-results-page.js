import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
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
import SurfingService  from '../apis/SurfingService'
import CardSurf from '../components/CardSurf'
import surf_json from '../data/surf-results-page.json'
import MapSurf from '../components/MapSurf'

const SearchResultsPage = () => {
  const router = useLocation();
  const surfingObject = new SurfingService();
  const [searchKey, setSearchKey] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [tap, setTap] = useState(false)
  const [hoverCard, setHoverCard] = useState(null)
  const [surfData, setSurfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNearby, setIsNearby] = useState(false); 
  
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

  var option_dict = {
    "Surf Breaks" : "beaches",
    "Surf Lessons" : "lessons",
    "Surf Rentals" : "“surfshops”"
  }
  const [searchType, setSearchType] = useState(data.options[0])
  
  const handleSearchKeyChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleTypeChange = (e, useStateHook) => {
    setSearchType(data.options.find((el) => el.value === e.value));
  };
  const size = UseWindowSize();

  const handleSubmit = async (e) => {
    e.preventDefault();
    getSurfResults();
  };

  useEffect(() => {

    setMapLoaded(true)

    setTap(size.width > 700 ? true : false)
    setDragging(size.width > 700 ? true : false)
    }, [size.width])

  
  useEffect(() => {
    
    let routerSearchKey = null;
    let routerOption = null;
    
    if (router.query.option) {
      routerSearchKey = router.query.searchKey;
      setSearchKey(routerSearchKey);
    }

    if (router.query.option) {

      routerOption= router.query.option;
      setSearchType(routerOption);
    }

    if (router.query.option && router.query.option) {
      getSurfResults(routerSearchKey, routerOption)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    
  const getSurfResults = async (routerSearchKey, routerOption) => {
    try {
      const params = {};

      if(routerSearchKey){
        params["location"] = routerSearchKey;
      }else if(searchKey){
        params["location"] = searchKey;
      }

      if(routerOption){
        params["search-type"] = option_dict[routerOption];
      }else if(searchType){
        params["search-type"] = option_dict[searchType];
      }

      params["is_nearby"] = isNearby;


      const resp = await surfingObject.getSurfData(params);

      if (!resp) {
        setSurfData([]);
        return;
      }

      var obj = JSON.parse(resp.body);
      var res = []
      
      for(var i in obj) {
          res.push(obj[i]);
      }
      setSurfData(res);

    } catch (error) {
      setSurfData([]);
    } finally {
      setLoading(false);
    }

  };

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
            <Form onSubmit={handleSubmit}>
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
                    name="search-type"
                    id="form_length"
                    options={data.options}
                    value={searchType}
                    isSearchable
                    className="form-control dropdown bootstrap-select"
                    classNamePrefix="selectpicker"
                    onChange={(e) => handleTypeChange(e, setSearchType)}
                  />
                </div>
              </div>
            </Form>
            <hr className="my-4" />
            <Row>
              {surfData && surfData.map(loc =>
                  <Col
                      key={loc.beach_name}
                      sm="6"
                      className="mb-5 hover-animate"
                      onMouseEnter={() => onCardEnter(loc.beach_name)}
                      onMouseLeave={() => onCardLeave()}
                  >
                      {console.log(loc.beach_name)}
                      <CardSurf data={loc} />
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
