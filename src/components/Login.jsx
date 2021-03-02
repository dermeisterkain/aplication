import React, {useState} from 'react';
import axios from 'axios';

export default function Login({setLogeado,setToken}) {
    const [datos, setDatos] = useState({usuario:'',password:''});
    const [error, setError] = useState(false);
    const {usuario,password} = datos;
    const presetDatos = e => {
        setDatos({
            ...datos,[e.target.name]:e.target.value
        });
    };
    const mandarDatos = async e => {
        e.preventDefault();
        const respuesta = await axios.post('https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication',
            {Body: {
                Username: usuario,
                Password: password
            }});
        if(respuesta.data.IsOK){
            setLogeado(true);
            setError(false);
            setToken(respuesta.data.Body.Token);
        } else {
            setError(true);
        }

    };
    return (
        <div className="card m-5">
            <h1 className="card-title text-center mt-3">Inicio de Sesión</h1>
            <div className="card-body">
                <form onSubmit={mandarDatos}>
                    <label className="form-label">Usuario</label>
                    <input className="form-control" type="text"
                        name="usuario" value={usuario} onChange={presetDatos}/>
                    <label className="form-label">Password</label>
                    <input className="form-control" type="text"
                        name="password" value={password} onChange={presetDatos}/>
                    <input className="btn btn-primary w-100 mt-3" type="submit"/>
                    {error && <div className="alert alert-danger mt-3">
                        Sus datos son incorrectos, verifique su información e intente nuevamente
                    </div>}
                </form>
            </div>
        </div>
    )
}
