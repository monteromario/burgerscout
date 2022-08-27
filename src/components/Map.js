import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import GoogleMapReact from 'google-map-react';
import logo_grey from '../logo-grey.svg';
const axios = require('axios');


function Map() {

  const [data, setData] = useState(null);
  const [lat, setLat] = useState(40.41725);
  const [lng, setLng] = useState(-3.70442);
  const [zoom, setZoom] = useState(5);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false)

  const handleClic = (e) => {
    axios
        .get(process.env.REACT_APP_API_URL+'/getDataById/'+e.target.id)
        .then((res) => {
          setSelected(res.data[0])
          setLat(res.data[0].location[0])
          setLng(res.data[0].location[1])
          setZoom(14)
          setModal(true)
        })
        .catch((e) => {
          console.log(e)
        });
  }
  
  const MapMarker = ({ text, id }) => (
      <div className="map--marker" id={id} onClick={handleClic}>
        <i className="fas fa-map-marker-alt m-1" id={id}></i>{text}
      </div>
    );

  class Map extends React.Component {
    static defaultProps = {
      center: {lat: lat, lng: lng},
      zoom: zoom
    };

    render() {
      return (
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        >
        { data ? data.map( data => <MapMarker 
            lat={data.location[0]} 
            lng={data.location[1]}
            text={data.nota}
            id={data._id}
            key={data._id}
          />) : ''}
          
        </GoogleMapReact>
      );
    }
  }

  let history = useHistory();

  const goBack = () => {
    history.push("/");
  }

  const closeModal = (e) => {
        setModal(false)
    }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
    });
  }

    const getData = () => {
      axios.get(process.env.REACT_APP_API_URL+'/getData')
      .then((res) => {
        if (res.data.length === 0) {
          setData(null)
        } else {
          setData(res.data)
        }
      })
      .catch((e) => {
        console.log(e);
      })
    }

    useEffect(() => {
      getData();
      getLocation()
    },[]);
  
  return (
    <div className="App mx-3">
      <header className="App-header">
        <div className="mb-3">
          <a className="" onClick={goBack}><img src={logo_grey} alt="Logo" className="logo--menu"/></a>
        </div>
        <div className="" style={{width: '100%', height: 'calc(100vh - 80px)'}}>
          <Map/>
        </div>
        { selected ?
        <div className="modal" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalTitle" aria-hidden="true" style={ { display: modal ? 'block' : 'none' } }> 
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title dark" id="exampleModalLongTitle"><i className="fas fa-map-marker-alt light"></i> {selected.place} <small className="span--user--map" title={selected.user}>{selected.user.charAt(0)}</small></h5>
                <button type="button" className="btn--close" aria-label="Close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body dark">
                <div className="d-flex">
                  <div className="map--img--bg" style={{ backgroundImage: `url(${selected.picture})` }}>
                        { selected.picture ? <img src={selected.picture} alt={selected.place} className="map--img--bg" /> : <img lassName="map--img--bg" alt="loading"/> }
                  </div>
                  <div>
                    <p><span className="light mx-2">Nota: </span><span className="span--number">{selected.nota}</span></p>
                    <p><span className="light mx-2">Precio: </span>{selected.precio}€</p>
                  </div>
                </div>
                <div className="mt-2">
                  <small>
                    <span className="light mx-2">C:</span><span>{selected.carne} </span>
                    <span className="light mx-2">T:</span><span>{selected.ingredientes} </span>
                    <span className="light mx-2">G:</span><span>{selected.pan} </span>
                    <span className="light mx-2">O:</span><span>{selected.originalidad} </span>
                    <span className="light mx-2">P:</span><span>{selected.proporcionalidad} </span>
                    <span className="light mx-2">S:</span><span>{selected.guarnicion} </span>
                  </small>
                </div>
                  { selected.comments ? <div className=""><small>{selected.comments}</small></div> : '' }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
        : '' }
      </header>
    </div>
  );
}

export default Map;


