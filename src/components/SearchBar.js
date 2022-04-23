import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
    Row,
    Col,
    Form,
    Input,
    Label,
    Button,

} from 'reactstrap'
import Select from 'react-select'

const SearchBar = (props) => {

    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            borderStyle: 'transparent',
        }),
        indicatorSeparator: (provided, state) => ({
            display: 'none'
        }),
        menu: (provided, state) => ({
            ...provided,
            color: 'red',
            border: '0 solid #fff',
            boxShadow: '0 0 1.2rem rgba(0, 0, 0, .15)',

        })
    }

  const [searchKey, setSearchKey] = useState("");
  const [option, setOption] = useState(null);

  const router = useHistory();

  const handleSubmit = async (event) => {

    event.preventDefault();
    let query = {};
    query["searchKey"] = searchKey;
    query["option"] = option;
    query["isNearby"] = false;

    router.push({
        pathname: '/search-results-page',
        query,
      });
  };

  const handleChange = selectedOption => {
    // console.log(selectedOption);
    // console.log(`Option selected:`, selectedOption);
    setOption(selectedOption.label);
  };

    return (
        <div className="search-bar mt-5 p-3 p-lg-1 pl-lg-4" style={{ width: '78%', maxWidth: 800, margin: '0 auto' }}>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col
                         lg="5" className="d-flex align-items-center form-group"
                    >
                        <div className="input-label-absolute input-label-absolute-right w-100">
                            <Label
                                for="location"
                                className="label-absolute">
                                <i className="fa fa-crosshairs" />
                                <span className="sr-only">City</span>
                            </Label>
                            <Input
                            type="text"
                            name="search"
                            placeholder="Where would u like to go?"
                            className="border-0 shadow-0"
                            onChange={(e) => setSearchKey(e.target.value)}
                            />
                        </div>
                    </Col>
                    <Col
                        lg="4"
                        md="12"
                        className="d-flex align-items-center form-group no-divider"
                    >
                        <Select
                            id="reactselect"
                            options={props.options}
                            placeholder="Categories"
                            className="selectpicker"
                            classNamePrefix="selectpicker"
                            styles={customSelectStyles}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col
                        lg="3"
                        className={props.btnMb ? `mb-${props.btnMb}` : ``}
                    >
                        <Button
                            type="submit"
                            color="primary"
                            className="btn-block h-100 rounded-xl btn btn-primary"
                        >
                            Search
                      </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
};
export default SearchBar;
