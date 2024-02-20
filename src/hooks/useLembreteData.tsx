import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { LembreteData } from '../interface/LembreteData';

// Definindo a URL da API
const API_URL = 'http://localhost:8080';

// Função para buscar os dados dos lembretes
const fetchData = async (): AxiosPromise<LembreteData[]> => {
    const response = axios.get(API_URL + '/lembrete');
    return response;
}

export function useLembreteData(){
    // Utilizando o hook useQuery para fazer a requisição e gerenciar o estado dos dados
    const query = useQuery({
        queryFn: fetchData, // Função que realiza a requisição
        queryKey: ['lembrete-data'], // Chave única para identificar a query
        retry: 2 // Número máximo de tentativas de retry em caso de falha na requisição
    })

    return {
        ...query,
        data: query.data?.data 
    }
}
