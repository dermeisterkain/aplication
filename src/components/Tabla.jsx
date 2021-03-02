import React, {useState} from 'react';
import axios from 'axios';

export default function Tabla({token,setAgregandoUsuario}) {
    const [registros, setRegistros] = useState([]);
    const [filtro, setFiltro] = useState('');

    const traerDatos = async () => {
        var axios = require('axios');
        var config = {
            method: 'post',
            url: 'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers',
            headers: { 
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InVzcl9wcnVlYmExIiwibmFtZWlkIjoiNyIsIm5iZiI6MTYxNDYzOTg1OSwiZXhwIjoxNjE0NzI2MjU5LCJpYXQiOjE2MTQ2Mzk4NTksImlzcyI6IkF1dGVudGljYWNpb25PbkJvYXJkaW5nU2VydmljZSIsImF1ZCI6IkRlZmF1bHRBdWRpZW5jZSJ9.F0I6i4q91cSNmbBMoEev0tEKZY4Z4ob0IbdDeU1E3nI'
            },
            data : {
                "Body":{"SearchText":filtro}
            }
        };
        axios(config)
            .then(function (response) {
                if (response.data.IsOK){
                    setRegistros(response.data.Body);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    const agregarUsuario = () => {
        setAgregandoUsuario(true);
    }

    return (
        <>
            <div className="row m-3">
                <div className="col-6">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Buscar"
                            name="filtro" value={filtro} onChange={e=>{setFiltro(e.target.value)}}/>
                        <button className="btn btn-outline-primary" onClick={traerDatos}>OK</button>
                    </div>
                </div>
                <div className="col-6">
                    <button className="btn btn-outline-primary" onClick={agregarUsuario}>Agregar Usuario</button>
                </div>
            </div>
            <table className="m-5">
                <thead>
                    <tr className="bg-dark text-white">
                        <th className="p-3 text-center" scope="col">Nombre</th>
                        <th className="p-3 text-center" scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map( registro => 
                        <tr key={registro.Id}>
                            <td>{registro.Name}</td>
                            <td>{registro.Email}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>

    )
}

