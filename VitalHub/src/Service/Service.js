import axios from "axios";

// Declara a porta da api

const portaApi = '4466';

//Declarar o ip da maquina


const ip = '192.168.21.111';

//Definir a base da url de acesso da api

const apiUrlLocal = `http://${ip}:${portaApi}/api`

//configurar axios

const api = axios.create({
    baseURL : apiUrlLocal,
})

export default api;