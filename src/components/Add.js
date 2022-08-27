import React, { useState, useEffect, Component } from 'react';
import { useHistory } from "react-router-dom";
import GoogleMapReact from 'google-map-react';

const axios = require('axios');

let Add = () =>  {

    const [place, setPlace] = useState(null);
    const [picture, setPicture] = useState(null);
    const [carne, setCarne] = useState(null);
    const [ingredientes, setIngredientes] = useState(null);
    const [pan, setPan] = useState(null);
    const [originalidad, setOriginalidad] = useState(null);
    const [proporcionalidad, setProporcionalidad] = useState(null);
    const [guarnicion, setGuarnicion] = useState(null);
    const [precio, setPrecio] = useState(null);
    const [nota, setNota] = useState(null);
    const [comments, setComments] = useState(null);
    const [id, setId] = useState(null);
    const [lat, setLat] = useState(40.41725);
    const [lng, setLng] = useState(-3.70442);
    const [zoom, setZoom] = useState(11)

    const [blobPicture, setBlobPicture] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false);

    let history = useHistory();

    const handleMap = (e) => {
      setLat(e.lat);
      setLng(e.lng);
      setZoom(16)
    }

    const MapMarker = () => (
      <div className="map--marker">
        <i className="fas fa-map-marker-alt m-1"></i>{nota}
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
            onClick={handleMap}
          >
            <MapMarker 
              lat={lat} 
              lng={lng} 
            />
          </GoogleMapReact>
        );
      }
    }

    const formatPrecio = (value) => {
      let dotValue = value.replace(/,/g, '.')
      let intValue = parseFloat(dotValue)
      setPrecio(intValue);
      setNota(calcNota());
    }

    const calcNota = () => {
      
      let notaPrecio = 0

      if (precio < 7) {
          notaPrecio = 10
      } else if (precio < 8) {
          notaPrecio = 9
      } else if (precio < 9) {
          notaPrecio = 8
      } else if (precio < 10) {
          notaPrecio = 7
      } else if (precio < 11) {
          notaPrecio = 6
      } else if (precio < 12) {
          notaPrecio = 5
      } else if (precio < 13) {
          notaPrecio = 4
      } else if (precio < 14) {
          notaPrecio = 3
      } else if (precio < 15) {
          notaPrecio = 2
      } else if (precio < 16) {
          notaPrecio = 1
      } else {
          notaPrecio = 0
      }

      let total = 0

      if (carne > 0) {total++}
      if (ingredientes > 0) {total++}
      if (pan > 0) {total++}
      if (originalidad > 0) {total++}
      if (proporcionalidad > 0) {total++}
      if (guarnicion > 0) {total++}
      if (notaPrecio >= 0) {total++}

      
      let sum = carne+ingredientes+pan+originalidad+proporcionalidad+guarnicion+notaPrecio
      let average = sum/total
      return Number.parseFloat(average).toFixed(2)
    }

    const handleChange = (e) => {
        switch (e.target.id) {
          case 'place':
            setPlace(e.target.value);
            break;
          case 'carne':
            setCarne(e.target.value/10);
            break;
          case 'ingredientes':
            setIngredientes(e.target.value/10);
            break;
          case 'pan':
            setPan(e.target.value/10);
            break;
          case 'originalidad':
            setOriginalidad(e.target.value/10);
            break;
          case 'proporcionalidad':
            setProporcionalidad(e.target.value/10);
            break;
          case 'guarnicion':
            setGuarnicion(e.target.value/10);
            break;
          case 'precio':
            formatPrecio(e.target.value);
            break;
          case 'comments':
            setComments(e.target.value);
            break;
          default:
            break;
        }
        setNota(calcNota());
    }

    const getLocalUser = (userName) => {
      return localStorage.getItem('BurgerUser');
    }

    const getId = () => {
      axios
        .get(process.env.REACT_APP_API_URL+'/getId')
        .then((res) => {
          if (res.data.length === 0) {
            setId(0)
          } else {
            setId(res.data.id+1)
          }
        })
        .catch((e) => {
          console.log(e);
          setId(0)
        })
    }

    let user = getLocalUser()

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
      });
    }

    useEffect(() => {
        user = getLocalUser();
        getId();
        getLocation()
    },[]);

    const uploadCloudinary = (file) => {
      const formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);
        formData.append("upload_preset", process.env.REACT_APP_CLOUD_UPLOAD_PRESET)
      setLoading(true)
      axios
        .post(process.env.REACT_APP_CLOUD_URL, formData)
        .then((res) => {
          console.log(res.data)
          setPicture(res.data.secure_url);
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        });
    };

    const handlePicture = (e) => {
      setBlobPicture(URL.createObjectURL(e.target.files[0]))
      uploadCloudinary(e.target.files[0])
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      setNota(calcNota());
      setLoading(true);

      let date = new Date();
      let data = {
        'date': date,
        'place': place,
        'user': user,
        'location': [lat, lng],
        'picture': picture,
        'carne': carne,
        'ingredientes': ingredientes,
        'pan': pan,
        'originalidad': originalidad,
        'proporcionalidad': proporcionalidad,
        'guarnicion': guarnicion,
        'precio': precio,
        'comments': comments,
        'id': id,
        'nota': parseFloat(nota)
      }

      axios
        .post(process.env.REACT_APP_API_URL+'/add', data)
        .then((res) => {
          setLoading(false)
          setModal(true)
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        });
    }

    const goBack = () => {
      history.push("/");
    }

    const closeModal = () => {
      setModal(false)
    }

    return (
    <div className="App">
        <header className="App-header m-4">
        <div className="d-flex justify-content-between my-4">
          <div className="mx-4">
              {user}, add a new<span className="light"> post</span>
          </div>
          <div className="mx-4">
            <a href="/"><i className="far fa-window-close red btn--close"></i></a>
          </div>
        </div>
        { blobPicture ? <img src={blobPicture} className="img--burger m-3" alt="burger" /> : ''}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="place" className="form-label">Place</label>
                <input type="text" className="form-control" id="place" aria-describedby="placeHelp" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="picture" className="form-label">Picture</label>
                    <input type="file" accept="image/*" className="form-control" onChange={handlePicture} required/>
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Carne: <span className="light">{ (carne === 0) ? 'N/A' : carne }</span></label>
              <input type="range" id="carne" className="slider" min="0" max="100" step="5" onChange={handleChange}/>
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Ingredientes: <span className="light">{ (ingredientes === 0) ? 'N/A' : ingredientes }</span></label>
              <input type="range" id="ingredientes" className="slider" min="0" max="100" step="5" onChange={handleChange}/>
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Pan: <span className="light">{ (pan === 0) ? 'N/A' : pan }</span></label>
              <input type="range" id="pan" className="slider" min="0" max="100" step="5" onChange={handleChange}/>
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Originalidad: <span className="light">{ (originalidad === 0) ? 'N/A' : originalidad }</span></label>
              <input type="range" id="originalidad" className="slider" min="0" max="100" step="5" onChange={handleChange}/>
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Proporcionalidad: <span className="light">{ (proporcionalidad === 0) ? 'N/A' : proporcionalidad }</span></label>
              <input type="range" id="proporcionalidad" className="slider" min="0" max="100" step="5" onChange={handleChange} />
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Guarnicion: <span className="light">{ (guarnicion === 0) ? 'N/A' : guarnicion }</span></label>
              <input type="range" id="guarnicion" className="slider" min="0" max="100" step="5" onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="place" className="form-label">Precio: <span className="light">{ precio ? precio+' €' : '' }</span></label>
                <div className="input-group"><input type="number" step="any" className="form-control" id="precio" aria-describedby="placeHelp"  min="0" onChange={handleChange} required />
                <span className="input-group-text">€</span></div>
            </div>
            <div className="mb-3">
              <label htmlFor="comments" className="form-label">Comments<span className="light"></span></label>
              <textarea id="comments" rows="4" className="form-control" onChange={handleChange}/>
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Nota final: {(nota) ? <span className="light">{nota}</span> : ''}</label>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <div className="mb-2" style={{width: '100%', height: '300px'}}>
                <Map/>
              </div>
            </div>
            <div className="w-100">
              <a href="/"><button type="button" className="btn btn-secondary m-2 btn--form">Cancel</button></a>
              { loading ? <button className="btn btn-secondary m-2 btn--form">Loading...</button> : <button type="submit" className="btn btn-info m-2 btn--form" style={ { opacity: carne && ingredientes && pan && originalidad && proporcionalidad &&guarnicion ? '1' : '0.5' } }>Submit</button> }
            </div>
        </form>
        <div className="modal" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalTitle" aria-hidden="true" style={ { display: modal ? 'block' : 'none' } }> 
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title dark" id="exampleModalLongTitle">{user}, post created!</h5>
                <button type="button" className="btn--close" aria-label="Close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body light">
                <img src={blobPicture} className="img--burger m-3" alt="burger" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Add more</button>
                <button type="button" className="btn btn-info m-2" onClick={goBack}>See all</button>
              </div>
            </div>
          </div>
        </div>
        </header>
    </div>
    );
}

export default Add;


