'use client'

import { getTickets } from '@/services/getTickets.services';
import { useEffect, useState } from 'react';
import { sortByDate } from '@/utils/timeUtils.utils';

//components
import TicketItem from '../ticketItem/TicketItem';

// types
import { Ticket } from '@/types/Tickets.types';
 
// styles
import styles from './ToolsMenu.module.scss';

const ToolsMenu : React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getTickets();
        const sortedTickets = data.sort((a, b) => sortByDate(a.createdAt, b.createdAt));

        setTickets(sortedTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToolsMenu;