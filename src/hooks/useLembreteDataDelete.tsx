import { useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

// URL da API
const API_URL = 'http://localhost:8080';

// Função para excluir dados de lembrete
const deleteData = async (id: number): AxiosPromise<any> => {
  const response = await axios.delete(API_URL + `/lembrete/${id}`);
  return response;
};

export function useLembreteDataDelete() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteData,
    retry: 2,
    onSuccess: () => {
      // Invalida as queries relacionadas aos dados do lembrete após a exclusão bem-sucedida
      queryClient.invalidateQueries(["lembrete-data"] as InvalidateQueryFilters);
    }
  });

  return mutate;
}
