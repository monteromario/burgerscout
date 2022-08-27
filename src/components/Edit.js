import React, { useState, useEffect, Component } from 'react';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import GoogleMapReact from 'google-map-react';

const axios = require('axios');

let Edit = () =>  {

    let { _id } = useParams();

    const [place, setPlace] = useState('');
    const [location, setLocation] = useState([]);
    const [picture, setPicture] = useState('');
    const [carne, setCarne] = useState(5);
    const [ingredientes, setIngredientes] = useState(5);
    const [pan, setPan] = useState(5);
    const [originalidad, setOriginalidad] = useState(5);
    const [proporcionalidad, setProporcionalidad] = useState(5);
    const [guarnicion, setGuarnicion] = useState(5);
    const [precio, setPrecio] = useState(5);
    const [nota, setNota] = useState(5);
    const [comments, setComments] = useState(null);
    const [id, setId] = useState(5);
    const [date, setDate] = useState(null);
    const [user, setUser] = useState(null);
    const [lat, setLat] = useState(40.41725);
    const [lng, setLng] = useState(-3.70442);
    const [zoom, setZoom] = useState(11);

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

      if (precio < 3) {
          notaPrecio = 10
      } else if (precio < 4) {
          notaPrecio = 9
      } else if (precio < 5) {
          notaPrecio = 8
      } else if (precio < 6) {
          notaPrecio = 7
      } else if (precio < 7) {
          notaPrecio = 6
      } else if (precio < 8) {
          notaPrecio = 5
      } else if (precio < 9) {
          notaPrecio = 4
      } else if (precio < 10) {
          notaPrecio = 3
      } else if (precio < 11) {
          notaPrecio = 2
      } else if (precio < 12) {
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
          case 'location':
            setLocation(e.target.value);
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
          case 'date':
            setDate(e.target.value+'T10:00:00.000Z');
            break;
          case 'comments':
            setComments(e.target.value);
            break;
          default:
            break;
        }
        setNota(calcNota());
    }

    const getData = () => {
      axios
        .get(process.env.REACT_APP_API_URL+'/getDataById/'+_id)
        .then((res) => {
          setPlace(res.data[0].place);
          setLat(res.data[0].location[0]);
          setLng(res.data[0].location[1]);
          setPicture(res.data[0].picture);
          setCarne(res.data[0].carne);
          setIngredientes(res.data[0].ingredientes);
          setPan(res.data[0].pan);
          setOriginalidad(res.data[0].originalidad);
          setProporcionalidad(res.data[0].proporcionalidad);
          setGuarnicion(res.data[0].guarnicion);
          setPrecio(res.data[0].precio);
          setNota(res.data[0].nota);
          setId(res.data[0].id);
          setDate(res.data[0].date);
          setUser(res.data[0].user);
          setComments(res.data[0].comments);
        })
        .catch((e) => {
          console.log(e)
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const uploadCloudinary = (file) => {
      const formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);
        formData.append("upload_preset", process.env.REACT_APP_CLOUD_UPLOAD_PRESET)
      setLoading(true)
      axios
        .post(process.env.REACT_APP_CLOUD_URL, formData)
        .then((res) => {
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

      let data = {
        '_id': _id,
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
        'id': id,
        'comments': comments,
        'nota': parseFloat(nota)
      }

      axios
        .post(process.env.REACT_APP_API_URL+'/edit', data)
        .then((res) => {
          setLoading(false)
          setModal(true)
          console.log(res)
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
        <div className="d-flex justify-content-between">
          <div className="mx-4">
              editing<span className="light"> {place}</span>
          </div>
          <div className="mx-4">
            <a href="/"><i className="far fa-window-close red btn--close"></i></a>
          </div>
        </div>
        { blobPicture ? <img src={blobPicture} className="img--burger m-3" alt="burger" /> : <img src={picture} className="img--burger m-3" alt="burger" />}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="place" className="form-label">Place</label>
                <input type="text" className="form-control" id="place" aria-describedby="placeHelp" value={place} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="picture" className="form-label">Picture</label>
                    <input type="file" accept="image/*" className="form-control" onChange={handlePicture} />
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Carne: <span className="light">{ (carne === 0) ? 'N/A' : carne }</span></label>
              <input type="range" id="carne" className="slider" min="0" max="100" step="5" value={carne*10} onChange={handleChange}/>
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Ingredientes: <span className="light">{ (ingredientes === 0) ? 'N/A' : ingredientes }</span></label>
              <input type="range" id="ingredientes" className="slider" min="0" max="100" step="5" value={ingredientes*10} onChange={handleChange}/>
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Pan: <span className="light">{ (pan === 0) ? 'N/A' : pan }</span></label>
              <input type="range" id="pan" className="slider" min="0" max="100" step="5" value={pan*10} onChange={handleChange}/>
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Originalidad: <span className="light">{ (originalidad === 0) ? 'N/A' : originalidad }</span></label>
              <input type="range" id="originalidad" className="slider" min="0" max="100" step="5" value={originalidad*10} onChange={handleChange}/>
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Proporcionalidad: <span className="light">{ (proporcionalidad === 0) ? 'N/A' : proporcionalidad }</span></label>
              <input type="range" id="proporcionalidad" className="slider" min="0" max="100" step="5" value={proporcionalidad*10} onChange={handleChange} />
            </div>
            <div className="slidecontainer mb-3">
              <label htmlFor="grade" className="form-label">Guarnicion: <span className="light">{ (guarnicion === 0) ? 'N/A' : guarnicion }</span></label>
              <input type="range" id="guarnicion" className="slider" min="0" max="100" step="5" value={guarnicion*10} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="place" className="form-label">Precio: <span className="light">{ precio ? precio+' €' : '' }</span></label>
                <div className="input-group"><input type="number" step="any" className="form-control" id="precio" aria-describedby="placeHelp"  min="0" value={precio} onChange={handleChange} required />
                <span className="input-group-text">€</span></div>
            </div>
            <div className="mb-3">
              <label htmlFor="comments" className="form-label">Comments<span className="light"></span></label>
              <textarea id="comments" rows="4" className="form-control" value={comments} onChange={handleChange}/>
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
            <div className="mb-3">
                <label htmlFor="date" className="form-label mx-2">Date: </label>
                {date ? <input id="date" type="date" value={date.slice(0,10)} onChange={handleChange} /> : ''}
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
                <h5 className="modal-title dark" id="exampleModalLongTitle">{user}, post updated!</h5>
                <button type="button" className="btn--close" aria-label="Close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body light">
                { blobPicture ? <img src={blobPicture} className="img--burger m-3" alt="burger" /> : <img src={picture} className="img--burger m-3" alt="burger" /> }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Continue editing</button>
                <button type="button" className="btn btn-info m-2" onClick={goBack}>See all</button>
              </div>
            </div>
          </div>
        </div>
        </header>
    </div>
    );
}

export default Edit;


