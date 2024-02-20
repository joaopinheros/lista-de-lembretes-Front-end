import './form.css';
import { useState } from 'react'; 
import { useLembreteDataMutate } from '../../hooks/useLembreteDataMutate';

interface FormProps {
    name: string;
    date: string;
    description: string;
}

export function Form(props: FormProps) {
    // Declaração dos estados do formulário utilizando o hook useState
    const [name, setName] = useState(props.name || ''); 
    const [date, setDate] = useState(props.date || ''); 
    const [description, setDescription] = useState(props.description || ''); 

    // Obtém a função mutate do hook personalizado useLembreteDataMutate
    const lembreteDataMutate = useLembreteDataMutate();

    // Função para lidar com o envio do formulário
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Previne o comportamento padrão de envio do formulário
        
        // Chama a função mutate passando os dados do formulário
        lembreteDataMutate.mutate({ name, date, description });

        // Limpa os campos do formulário
        setName('');
        setDate('');
        setDescription('');
    };
    
    // Função para lidar com a alteração da data
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0];
    
        // Verifica se a data selecionada é maior ou igual à data atual
        if (selectedDate >= currentDate) {
            setDate(selectedDate);
        } else {
            alert('Selecione uma data válida.');
            // Limpa o valor da entrada de data
            setDate('');
        }
    };
    
    // Retorna o JSX do formulário
    return (
        <div className="form-body">
            <form className="input-container" onSubmit={handleSubmit}>
                <label htmlFor="name"> Nome</label>
                <input
                    type="text"
                    placeholder="Digite o nome do lembrete"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="date">Data</label>
                <input
                    type="date"
                    placeholder="Data"
                    value={date}
                    onChange={handleDateChange}
                />
                <label htmlFor="description">Descrição</label>
                <textarea
                    placeholder="Digite uma Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button type="submit">Criar</button>
            </form>
        </div>
    );
}
