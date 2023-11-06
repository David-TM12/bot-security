import axios from 'axios';
import 'dotenv/config';

const baseUrl = process.env.BASE_URL;


export async function consultaApiViaCep(cep){
    try{
        const url = `${baseUrl}/${cep}/json/`
        const res = await axios.get(url);
        return res.data;
    }catch(error){
        throw error;
    }
}