import { Link } from '@tanstack/react-router';
import React from 'react';

import { Contact } from '@/types/ContactTypes';

interface ContactListProps {
  contacts: Contact[] | undefined;
  searchTerm: string;
  isLoading?: boolean;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, searchTerm, isLoading }) => {
  const filteredContacts = contacts?.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return !isLoading && (
    <ul className="list-disc p-4">
      {filteredContacts && filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <li key={contact.id} className="mb-2 text-black list-none">
            <Link
                 to="/posts/$postId"
                 params={{
                   postId: String(contact.id),
                 }}
              >
                {contact.name}
              </Link>
          </li>
        ))
      ) : (
        <li className="mb-2 text-black flex items-center justify-center list-none gap-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status" />
          <span>Loading...</span>
        </li>
      )}
    </ul>
  );
};

export default ContactList;
