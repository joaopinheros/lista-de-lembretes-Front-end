import React from 'react';
import { useLembreteDataDelete } from '../../hooks/useLembreteDataDelete';
import { LembreteData } from '../../interface/LembreteData';
import { useLembreteData } from '../../hooks/useLembreteData';
import './list.css';

interface ReminderListProps {
  data: LembreteData[];
}

// Função para formatar a data no formato DD/MM/AAAA
const  formatarData = (dataString: string) => {
  const [ano, mes, dia] = dataString.split('-');
  return `${dia}/${mes}/${ano}`;
};


const ReminderList: React.FC<ReminderListProps> = ({ data }) => {
  const lembreteDataDelete = useLembreteDataDelete(); // Função de deleção
  const { data: fetchedData } = useLembreteData();

  // Combinação dos dados locais com os dados obtidos da API
  const mergedData = [...data, ...(fetchedData || [])];

  // Filtro para lembretes vazios ou com valores inválidos
  const filteredData = mergedData.filter((reminder) => {
    return reminder.id !== undefined && reminder.name.trim() !== '' && reminder.date.trim() !== '';
  });

  // Organizando os lembretes por datas
  const remindersByDate: { [date: string]: LembreteData[] } = {};

  filteredData.forEach((reminder) => {
    // Verificação se já existe uma lista de lembretes para essa data
    if (!remindersByDate[reminder.date]) {
      remindersByDate[reminder.date] = [];
    }
    // Adicionar o lembrete à lista correspondente à sua data
    remindersByDate[reminder.date].push(reminder);
  });

  // Ordenar as datas dos lembretes
  const sortedDates = Object.keys(remindersByDate).sort();

  return (
    <div>
      {sortedDates.map((date) => (
        <div key={date}>
          <h2 className="formatar-data">{formatarData(date)}</h2>
          {/* Renderizar os lembretes apenas se houverem lembretes para essa data */}
          {remindersByDate[date].map((reminder) => (
            <div className="reminder-item" key={reminder.id}>
              {/* Adicionar um evento onClick para deletar o lembrete */}
              <button
                className="delete-button"
                onClick={() => reminder.id !== undefined && lembreteDataDelete.mutate(reminder.id)}>
                x
              </button>
              <div className="reminder-info">
                <h3 className="name">{reminder.name}</h3>
                <p className="data">Data: {formatarData(reminder.date)}</p>
                <p className="description">{reminder.description}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ReminderList;
