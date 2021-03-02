import React, {useState} from 'react';
import axios from 'axios';

export default function Formulario({setAgregandoUsuario}) {
    const [datos, setdatos] = useState({nombre:'',correo:''});
    const [error, setError] = useState('');
    const {nombre,correo} = datos;
    const presetDatos = e => {
        setdatos({
            ...datos,[e.target.name]:e.target.value
        })
    }
    const mandarDatos = async e => {
        e.preventDefault();
        var axios = require('axios');
        var config = {
            method: 'post',
            url: 'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InVzcl9wcnVlYmExIiwibmFtZWlkIjoiNyIsIm5iZiI6MTYxNDYzOTg1OSwiZXhwIjoxNjE0NzI2MjU5LCJpYXQiOjE2MTQ2Mzk4NTksImlzcyI6IkF1dGVudGljYWNpb25PbkJvYXJkaW5nU2VydmljZSIsImF1ZCI6IkRlZmF1bHRBdWRpZW5jZSJ9.F0I6i4q91cSNmbBMoEev0tEKZY4Z4ob0IbdDeU1E3nI'
            },
            data : {
                "Body": {
                    "Tenant": null,
                    "UserName": datos.nombre,
                    "Password": "1*pruebas",
                    "Name": datos.nombre,
                    "FatherLastName": "BAUTISTA",
                    "MotherLastName": "PEREZ",
                    "Email": datos.correo,
                    "PhoneNumber": "1234567890",
                    "Metadata": null,
                    "Roles": [{
                            "Id": 2,
                            "Name": "Usuario Tradicional"
                        }]
                }
            }
        };
        axios(config)
            .then(function (response) {
                if (response.data.IsOK){
                    setAgregandoUsuario(false);
                } else {
                    setError(response.data.Messages);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <form onSubmit={mandarDatos} className="m-5 p-5">
            <label className="form-label">Nombre</label>
            <input className="form-control" type="text"
                name="nombre" value={nombre} onChange={presetDatos}/>
            <label className="form-label">Password</label>
            <input className="form-control" type="text"
                name="correo" value={correo} onChange={presetDatos}/>
            <input className="btn btn-primary w-100 mt-3" type="submit"/>
            {error && <div className="alert alert-danger mt-3">
                Verifica tu información: {error}
            </div>}
        </form>
    )
}
