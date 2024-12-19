import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { Contact } from '../types/ContactTypes';

import { createContact, deleteContact, getContacts, updateContact, getContact } from '../api/contactApi';

export const useContacts = () => {
  const queryClient = useQueryClient();

  const { data: contacts, ...query }: UseQueryResult<Contact[], Error> = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  const getContactById = (id: number): UseQueryResult<Contact, Error> => useQuery({
    queryKey: ['contact', id],
    queryFn: () => getContact(id),
  });

  const create: UseMutationResult<void, Error, Omit<Contact, 'id'>> = useMutation({
    mutationFn: createContact,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] }),
  });

  const update: UseMutationResult<void, Error, { id: number; contact: Partial<Contact> }> = useMutation({
    mutationFn: ({ id, contact }: { id: number; contact: Partial<Contact> }) => updateContact(id, contact),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] }),
  });

  const remove: UseMutationResult<void, Error, number> = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] }),
  });

  return { contacts, create, update, remove, getContactById, ...query };
};
