import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
    Container,
    Row,
    Col,
    Form,
    Label,
    Input,
    Button
} from 'reactstrap'

import Select from 'react-select'
import UseWindowSize from '../hooks/UseWindowSize'
import SurfingService  from '../apis/SurfingService'
import CardSurf from '../components/CardSurf'
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
  const [center, setCenter] = useState([40.5842, -73.99967]);
  const [status, setStatus] = useState(0)
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
    "Surf Rentals" : "surfshops"
  }

  var id_dict = {
    "beaches" : "surfline_id",
    "lessons" : "shop_id",
    "surfshops" : "shop_id"
  }
  const [searchType, setSearchType] = useState(data.options[0])
  const [searchOption, setSearchOption] = useState(data.options[0].label)
  
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

  var lon_dict = {
    "beaches" : "beach_lon",
    "lessons" : "shop_lon",
    "surfshops" : "shop_lon"
  }

  var lat_dict = {
    "beaches" : "beach_lat",
    "lessons" : "shop_lat",
    "surfshops" : "shop_lat"
  }

  useEffect(() => {

    setMapLoaded(true)

    setTap(size.width > 700 ? true : false)
    setDragging(size.width > 700 ? true : false)
   
    }, [size.width])

  
  useEffect(() => {

    let routerSearchKey = null;
    let routerOption = null;
    let routerIsNearby = null;
    let routerLat = null;
    let routerLon = null;

    if (typeof router.query !== 'undefined' && router.query.searchKey) {
      routerSearchKey = router.query.searchKey;
      setSearchKey(routerSearchKey);
    }

    if (typeof router.query !== 'undefined' && router.query.option) {
      routerOption= router.query.option;
      setSearchOption(routerOption);
    }

    if (typeof router.query !== 'undefined' && router.query.isNearby){
      routerIsNearby = router.query.isNearby;
      setIsNearby(routerIsNearby);
    }
    if (typeof router.query !== 'undefined' && router.query.nearby_lat) {
      routerLat = router.query.nearby_lat;
    }
    if (typeof router.query !== 'undefined' && router.query.nearby_lon) {
      routerLon = router.query.nearby_lon;
    }
    if (typeof router.query !== 'undefined' && router.query.option && router.query.option) {
      getSurfResults(routerSearchKey, routerOption, routerIsNearby, routerLat, routerLon)
    }
    
  }, [])
    
  async function getSurfResults(routerSearchKey, routerOption, routerIsNearby, routerLat, routerLon) {
    try {
      const params = {}

      if (routerSearchKey) {
        params["location"] = routerSearchKey
      } else if (searchKey) {
        params["location"] = searchKey
      }

      if (routerOption) {
        params["search-type"] = option_dict[routerOption]
      } else if (searchType) {
        params["search-type"] = option_dict[searchType.label]
        setSearchOption(searchType.label)
        console.log("search type:", searchOption)
      }

      if(routerIsNearby) {
        params["is_nearby"] = routerIsNearby
      } else if (!isNearby) {
        params["is_nearby"] = isNearby
      }
     
      if(routerLat) {
        params["nearby_lat"] = routerLat;
      }
      if(routerLon) {
        params["nearby_lon"] = routerLon;
      }

      console.log("params there I go: ", params);

      const resp = await surfingObject.getSurfData(params)
      
      console.log(resp)
      setStatus(resp.statusCode)
      if (!resp) {
        setSurfData([])
        return
      }

      var obj = JSON.parse(resp.body)
      var res = []

      for (var i in obj) {
        res.push(obj[i])
      }
      setSurfData(res)
      console.log("search type:", searchOption)
      console.log("initial center", center)

      if(resp.statusCode === 200){
        var location = res[0]
        const option = params["search-type"]
        console.log("search Option 1:", option)
        console.log("latitude: ", lat_dict[option_dict[searchOption]])
        setCenter([location[lat_dict[option]], location[lon_dict[option]]])
      }

      console.log("center after call:", center)
      
    } catch (error) {
      setSurfData([])
    } finally {
      setLoading(false)
    }

  }

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
                <div className="mb-4">
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
                <div className="mb-4">
                  <Button type="submit" color="primary" onClick={handleSubmit}>
                    <i className="fas fa-search mr-1" />
                    Search
                  </Button>
              </div>
              </div>
            </Form>
            <hr className="my-4" />
            <Row>
              {surfData.length > 0 && console.log("Yes we got results", surfData[0])}
              {surfData && status === 200 && surfData.map(loc =>
                  <Col
                      key={loc[id_dict[option_dict[searchOption]]]}
                      sm="6"
                      className="mb-5 hover-animate"
                      onMouseEnter={() => onCardEnter(loc[id_dict[option_dict[searchOption]]])}
                      onMouseLeave={() => onCardLeave()}
                  >
                      <CardSurf data={loc} type={option_dict[searchOption]}/>
                  </Col>
              )}
            </Row>
          </Col>
          <div id="map">
          <Col
            lg="6"
            className="mt-1 map-side-lg pr-lg-0" 
          > 
              {console.log("search page center", center, searchOption)}
              {!loading && status === 200 && center[0] !== 'undefined' && mapLoaded &&
                  <MapSurf
                      className="map-full shadow-left"
                      center={center}
                      zoom={14}
                      dragging={dragging}
                      tap={tap}
                      geoJSON={surfData}
                      hoverCard={hoverCard}
                      type={option_dict[searchOption]}
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
