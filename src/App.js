import React, {useState} from 'react';
import Login from './components/Login';
import Tabla from './components/Tabla';
import Formulario from './components/Formulario';

function App() {
	
	const [logeado, setLogeado] = useState(false);
	const [token, setToken] = useState(null);
	const [agregandoUsuario, setAgregandoUsuario] = useState(false);
	
	return (
		<>
			{!logeado && <Login setLogeado={setLogeado} setToken={setToken}/>}
			{(logeado && !agregandoUsuario) && <Tabla token={token} setAgregandoUsuario={setAgregandoUsuario}/>}
			{agregandoUsuario && <Formulario setAgregandoUsuario={setAgregandoUsuario}/>}
		</>
	);
}

export default App;
