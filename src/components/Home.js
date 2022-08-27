import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import logo_grey from '../logo-grey.svg';
import LazyLoad from 'react-lazyload';
const axios = require('axios');

let Home = () =>  {

    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const [modal, setModal] = useState(false);
    const [deleted, setDelete] = useState([]);

    const getLocalUser = (userName) => {
        return localStorage.getItem('BurgerUser');
    }

    const clearLocalUser = () => {
        localStorage.removeItem('BurgerUser');
    }

    const handleDeleteClic = (e) => {
        setModal(true);
        setDelete([e.target.id, e.target.accessKey])
    }

    const handleDelete = () => {
        axios
        .get(process.env.REACT_APP_API_URL+'/delete/'+deleted[0])
        .then(() => {
            setModal(false)
            getData()
        })
        .catch((e) => {
            console.log(e)
        })
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

    const getDataByNota = () => {
        axios.get(process.env.REACT_APP_API_URL+'/getDataByNota')
        .then((res) => {
            console.log(res)
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

    const getDataByDate = () => {
        axios.get(process.env.REACT_APP_API_URL+'/getDataByDate')
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

    const getDataByCarne = () => {
        axios.get(process.env.REACT_APP_API_URL+'/getDataByCarne')
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

    const getDataByguarnicion = () => {
        axios.get(process.env.REACT_APP_API_URL+'/getDataByguarnicion')
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

    const getDataBypan = () => {
        axios.get(process.env.REACT_APP_API_URL+'/getDataBypan')
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

    const getDataByOriginalidad = () => {
        axios.get(process.env.REACT_APP_API_URL+'/getDataByOriginalidad')
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

    const getDataByProporcionalidad = () => {
        axios.get(process.env.REACT_APP_API_URL+'/getDataByProporcionalidad')
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

    const getDataByGuarnicion = () => {
        axios.get(process.env.REACT_APP_API_URL+'/getDataByGuarnicion')
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

    const getDataByPrecio = () => {
        axios.get(process.env.REACT_APP_API_URL+'/getDataByPrecio')
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

    const getDataByUser = () => {
        axios.get(process.env.REACT_APP_API_URL+'/getDataByUser/'+user)
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

    const getDataByTop = () => {
        axios.get(process.env.REACT_APP_API_URL+'/getTop/5')
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

    const handleSearch = (e) => {
        axios.get(process.env.REACT_APP_API_URL+'/getDataByPlace/'+e.target.value)
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

    const closeModal = (e) => {
        setModal(false)
    }

    useEffect(() => {
        setUser(getLocalUser())
        getData()
    }, []);

    return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark nav--sticky px-2 pb-3">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon btn--menu"></span>
        </button>
        <a className="navbar-brand white" href="/"><img src={logo_grey} alt="Logo" className="logo--menu App-logo-small"/></a>
        { user === 'Guest' ? '' :
        <a href="/add"><div className="light add--icon"><i className="fas fa-plus-circle"></i></div></a>
        }
        <div className="collapse navbar-collapse" id="navContent">
            <div className="nav--content px-2">
                <div>
                    <ul className="navbar-nav ml-auto mt-2 text-left">
                        <li className="nav-item active">
                            <a className="nav-link" onClick={getDataByNota}><i className="fas fa-sort-amount-down light"></i> Nota</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={getDataByDate}><i className="fas fa-sort-amount-down light"></i> Date</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={getDataByPrecio}><i className="fas fa-sort-amount-down light"></i> Precio</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="navbar-nav mt-2 text-center">
                    { user === 'Guest' ? '' :
                        <li className="nav-item active">
                            <a className="nav-link" onClick={getDataByUser}><i className="fas fa-user-tag light"></i> {user}'s</a>
                        </li>
                    }
                        <li className="nav-item">
                            <a className="nav-link"><i className="fas fa-search light"></i> Search</a>
                        </li>
                        <li className="nav-item">
                            <div className="div--search nav-link"><input type="text" id="search" className="input--search" onChange={handleSearch}/></div>
                        </li>
                    </ul>
                </div>
                <div className="width--fit">
                    <ul className="navbar-nav mt-2 text-right">
                        <li className="nav-item active">
                            <a className="nav-link" onClick={getDataByTop}><i className="fas fa-award light"></i> Top5</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/map"><i className="fas fa-map-marked-alt light"></i> Map</a>
                        </li>
                        <li className="nav-item">
                            <a href="/" onClick={clearLocalUser} className="nav-link logout--link"><i className="fas red fa-power-off"></i> Exit</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <div className="App">
        <header className="App-header">
        { data ? '' : 
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <p className="mt-3">
                    <strong>loading</strong><span className="light">...</span>
                </p>
            </div>
        }
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 m-2 w-100">
            { data ? data.map((data) => (
                <div className="col" key={data.id}>
                    <div className="card h-100">
                        <LazyLoad height={350} offset={100}>
                        <img src={data.picture} className="card-img-top" alt={data.place} />
                        </LazyLoad>
                        <div className="card-body">
                            <h5 className="card-title dark mb-4 no--wrap left"><a href={'https://www.google.es/maps?q='+data.location}><i className="fas fa-map-marker-alt light"></i></a> <span className="span--title center">{data.place}</span> <span className="span--user div--right" title={data.user}> <small>{data.user.charAt(0)}</small></span></h5>
                            <div className="d-flex justify-content-around">
                                <div className="dark w-50 mb-1">Nota: <span className="span--number">{data.nota}</span></div>
                                <div className="dark w-50">Precio: <span className="span--number">{data.precio} €</span></div>
                            </div>
                            <div className="mt-2">
                                <table className="table table-bordered mb-0">
                                    <tbody>
                                        <tr>
                                        <td><small>Carne: { (data.carne === 0) ? 'N/A' : data.carne }</small></td>
                                        <td><small>Proporcionalidad: { (data.proporcionalidad === 0) ? 'N/A' : data.proporcionalidad }</small></td>
                                        </tr>
                                        <tr>
                                        <td><small>pan: { (data.pan === 0) ? 'N/A' : data.pan }</small></td>
                                        <td><small>Originalidad: { (data.originalidad === 0) ? 'N/A' : data.originalidad }</small></td>
                                        </tr>
                                        <tr>
                                        <td><small>ingredientes: { (data.ingredientes === 0) ? 'N/A' : data.ingredientes }</small></td>
                                        <td><small>Guarnicion: { (data.guarnicion === 0) ? 'N/A' : data.guarnicion }</small></td>
                                        </tr>
                                        { data.comments ? 
                                        <tr>
                                        <td colSpan="2"><small>{data.comments}</small></td>
                                        </tr>
                                         : <></>}
                                    </tbody>
                                </table>
                            </div>
                            <small>
                            <div className="dark mt-3 mb-0 d-flex justify-content-between">
                                <div>
                                    <i className="fas fa-user light"></i> <span className="grey"> {data.user}</span>
                                </div>
                                { data.user === user ? 
                                <><div>
                                    <a href={'/edit/'+data._id} className="link--edit"><i className="fas fa-edit red"></i> <span className="grey"> Edit</span></a>
                                </div><div id={data._id} accessKey={data.place} onClick={handleDeleteClic}>
                                    <i className="fas fa-trash-alt red" id={data._id} accessKey={data.place}></i> <span className="grey" id={data._id} accessKey={data.place}> Delete</span>
                                </div></>
                                : ''
                                }
                                <div>    
                                    <i className="far fa-calendar-alt light"></i> <span className="grey"> {data.date.slice(0,10)}</span>
                                </div>
                            </div>
                            </small>
                        </div>
                    </div>
                </div>
            )) : '' }
        </div>
        <div className="my-2">
        <a href="#top"><i className="far fa-arrow-alt-circle-up light"></i><button className="Btn-link mx-2" href="#" > Back to top </button></a>
        </div>
        <div className="modal" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalTitle" aria-hidden="true" style={ { display: modal ? 'block' : 'none' } }> 
        <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title dark" id="exampleModalLongTitle"><i className="fas fa-exclamation-triangle light"></i> {user}, are you sure?</h5>
            <button type="button" className="btn--close" aria-label="Close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div className="modal-body dark">
            <p>Post "{deleted[1]}" will be permanently deleted. This action cannot be reverted.</p>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            <button type="button" className="btn btn-danger m-2" onClick={handleDelete}>Delete</button>
            </div>
        </div>
        </div>
        </div>
    </header>
    </div>
    </>
    );
}

export default Home;


