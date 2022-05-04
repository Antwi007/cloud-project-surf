import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import SurfingService from '../apis/SurfingService'
import CardSurf from '../components/CardSurf'
import MapSurf from '../components/MapSurf'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import sadSurf from '../components/images/sad_surf3.jpeg';
import { putSurfKeyword, putSurfData, putSurfSearchParams } from '../actions';
import ErrorBoundary from '../components/ErrorBoundary';

const surfingObject = new SurfingService();

const SearchResultsPage = () => {
  const surfSearch = useSelector(state => state.surfSearch);
  const surfSearchParams = useSelector(state => state.surfSearch.surfSearchParams);
  const dispatch = useDispatch();

  const router = useLocation();
  const [searchKey, setSearchKey] = useState(surfSearch.keyword);
  const [mapLoaded, setMapLoaded] = useState(false)
  const [dragging, setDragging] = useState(surfSearchParams.dragging || false)
  const [tap, setTap] = useState(surfSearchParams.tap || false)
  const [hoverCard, setHoverCard] = useState(surfSearchParams.hoverCard || null)
  const [surfData, setSurfData] = useState(surfSearch.surfData);
  const [loading, setLoading] = useState(
    router.query !== undefined ? true
      : (surfSearch.surfData) ? false
        : null);
  const [center, setCenter] = useState(surfSearchParams.center || [40.5842, -73.99967]);
  const [status, setStatus] = useState(surfSearchParams.status || 0);
  const postsPerPage = 10;
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
    "Surf Breaks": "beaches",
    "Surf Lessons": "lessons",
    "Surf Rentals": "surfshops"
  }

  var id_dict = {
    "beaches": "surfline_id",
    "lessons": "shop_id",
    "surfshops": "shop_id"
  }
  const [searchType, setSearchType] = useState(surfSearchParams.searchType || data.options.find((el) => el.label === router.query.option))
  const [searchOption, setSearchOption] = useState(surfSearchParams.searchOption || router.query.option)

  const handleSearchKeyChange = (e) => {
    setSearchKey(e.target.value);
    dispatch(putSurfKeyword(e.target.value));
  };

  const handleTypeChange = (e) => {
    setSearchType(data.options.find((el) => el.value === e.value));
    dispatch(putSurfSearchParams(["searchType", data.options.find((el) => el.value === e.value)]))
  };
  const size = UseWindowSize();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getSurfResults();
  };

  var lon_dict = {
    "beaches": "beach_lon",
    "lessons": "shop_lon",
    "surfshops": "shop_lon"
  }

  var lat_dict = {
    "beaches": "beach_lat",
    "lessons": "shop_lat",
    "surfshops": "shop_lat"
  }

  useEffect(() => {

    setMapLoaded(true)

    setTap(size.width > 700 ? true : false)
    setDragging(size.width > 700 ? true : false)
    dispatch(putSurfSearchParams(["dragging", size.width > 700 ? true : false]))
    dispatch(putSurfSearchParams(["tap", size.width > 700 ? true : false]))
  }, [size.width])


  useEffect(() => {
    window.scrollTo(0, 0)

    let routerSearchKey = null;
    let routerOption = null;
    let routerIsNearby = null;
    let routerLat = null;
    let routerLon = null;

    if (typeof router.query !== 'undefined' && router.query.searchKey) {
      routerSearchKey = router.query.searchKey;
      setSearchKey(routerSearchKey);
      dispatch(putSurfKeyword(routerSearchKey));
    }

    if (typeof router.query !== 'undefined') {
      if (!router.query.option) {
        router.query["option"] = "Surf Breaks"
      }
      routerOption = router.query.option;
      setSearchType(data.options.find((el) => el.label === routerOption));
      setSearchOption(routerOption);
      dispatch(putSurfSearchParams(
        ["searchOption", routerOption]
      ))
    }

    if (typeof router.query !== 'undefined' && router.query.isNearby) {
      routerIsNearby = router.query.isNearby;
    }
    if (typeof router.query !== 'undefined' && router.query.nearby_lat) {
      routerLat = router.query.nearby_lat;
    }
    if (typeof router.query !== 'undefined' && router.query.nearby_lon) {
      routerLon = router.query.nearby_lon;
    }
    if (typeof router.query !== 'undefined' && router.query.option) {
      getSurfResults(routerSearchKey, routerOption, routerIsNearby, routerLat, routerLon)
    }

  }, [])

  async function getSurfResults(routerSearchKey, routerOption, routerIsNearby, routerLat, routerLon) {
    try {
      setLoading(true);
      dispatch(putSurfSearchParams(
        ["loading", true]
      ))
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
        dispatch(putSurfSearchParams(
          ["searchOption", searchType.label]
        ))
        console.log("search type:", searchOption)
      }

      if (routerSearchKey || searchKey.length > 0) {
        params["is_nearby"] = false
      } else {
        params["is_nearby"] = router.query.isNearby
      }

      /* if (routerIsNearby) {
        params["is_nearby"] = routerIsNearby
      } else if (!isNearby) {
        params["is_nearby"] = isNearby
      } */

      if (routerLat) {
        params["nearby_lat"] = routerLat;
      }
      if (routerLon) {
        params["nearby_lon"] = routerLon;
      }

      console.log("params there I go: ", params);

      const resp = await surfingObject.getSurfData(params)

      console.log(resp)
      if (!resp) {
        setSurfData([])
        dispatch(putSurfData([]));
        setLoading(false)
        dispatch(putSurfSearchParams(["loading", false]))
        return
      }

      setStatus(resp.statusCode)
      dispatch(putSurfSearchParams(
        ["status", resp.statusCode]
      ))

      if (resp.statusCode !== 200) {
        setSurfData([])
        dispatch(putSurfData([]));
        setLoading(false)
        dispatch(putSurfSearchParams(
          ["loading", false]
        ))
        return
      }

      var obj = JSON.parse(resp.body)
      var res = []

      for (var i in obj) {
        res.push(obj[i])
      }
      setSurfData(res)
      dispatch(putSurfData(res))

      if (resp.statusCode === 200) {
        var location = res[0]
        const option = params["search-type"]
        console.log("search Option 1:", option)
        console.log("latitude: ", lat_dict[option_dict[searchOption]])
        setCenter([location[lat_dict[option]], location[lon_dict[option]]])
        dispatch(putSurfSearchParams(["center", [location[lat_dict[option]], location[lon_dict[option]]]]));
      }

      console.log("center after call:", center)
      // console.log("finally call", surfSearchParams)

    } catch (error) {
      setSurfData([])
      dispatch(putSurfData([]))
    } finally {
      setLoading(false)
      dispatch(putSurfSearchParams(
        ["loading", false]
      ))
    }

  }

  const onCardEnter = (id) => {
    setHoverCard(id)
    dispatch(putSurfSearchParams(
      ["hoverCard", id]
    ))
  }
  const onCardLeave = () => {
    dispatch(putSurfSearchParams(
      ["hoverCard", null]
    ))
  }

  // console.log("search results page", surfData)

  return (
    <ErrorBoundary>
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
                      onChange={(e) => handleSearchKeyChange(e)}
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
                      onChange={(e) => handleTypeChange(e)}
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
                {loading &&
                  [...Array(postsPerPage)].map((el, index) => (
                    <Col key={index} sm="6" className="mb-5 hover-animate">
                      <Skeleton count={5} />
                    </Col>
                  ))
                }
              </Row>
              <Row>
                {surfData.length > 0 && console.log("Yes we got results", surfData[0])}
                {surfData && status === 200 && surfData.map(loc => {
                  return <Col
                    key={loc[id_dict[option_dict[searchOption]]]}
                    sm="6"
                    className="mb-5 hover-animate"
                    onMouseEnter={() => onCardEnter(loc[id_dict[option_dict[searchOption]]])}
                    onMouseLeave={() => onCardLeave()}
                  >
                    <CardSurf data={loc} type={option_dict[searchOption]} />
                  </Col>
                }
                )}
              </Row>
              {(!loading && surfData.length === 0) &&
                <div class="card text-center" style={{ border: 'none', flexDirection: 'row' }}>
                  <img
                    src={sadSurf}
                    alt=""
                    style={{ border: 'none', width: '50%', marginRight: '10%' }}
                  />
                  <h2 style={{ alignSelf: 'center', width: '40%', marginLeft: '-15%' }}>
                    No results for your search, please try a new location
                  </h2>
                </div>}
            </Col>
            <div id="map">
              <Col
                lg="6"
                className="mt-1 map-side-lg pr-lg-0"
              >
                {((loading === false) && (status === 200 || status === 204 || surfData.length > 0) && center[0] !== 'undefined' && mapLoaded) ?
                  <MapSurf
                    className="map-full shadow-left"
                    center={center}
                    zoom={14}
                    dragging={dragging}
                    tap={tap}
                    geoJSON={surfData}
                    hoverCard={hoverCard}
                    type={option_dict[searchOption]}
                  /> : null
                }
              </Col>
            </div>
          </Row>
        </Container>
      </React.Fragment>
    </ErrorBoundary>
  )
}

export default SearchResultsPage
