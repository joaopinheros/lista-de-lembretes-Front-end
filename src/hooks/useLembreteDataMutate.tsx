import { useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { LembreteData } from '../interface/LembreteData';

// URL da API
const API_URL = 'http://localhost:8080';

// Função para enviar dados para o servidor
const postData = async (data: LembreteData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/lembrete', data);
    return response;
}

export function useLembreteDataMutate(){
    const queryClient = useQueryClient();
    // Utiliza o hook useMutation para executar a mutação
    const mutate = useMutation({
        mutationFn: postData, // Função de mutação que envia os dados
        retry: 2, // Número de tentativas em caso de falha
        onSuccess: () => {
            // Invalida as queries relacionadas aos dados do lembrete para forçar uma recarregamento
            queryClient.invalidateQueries(["lembrete-data"] as InvalidateQueryFilters);
        }
    })

    return mutate;
}
