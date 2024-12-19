const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getContacts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch contacts');
  return response.json();
};

export const getContact = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch contacts');
  return response.json();
}

export const createContact = async (contact: any) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
  if (!response.ok) throw new Error('Failed to create contact');
  return response.json();
};

export const updateContact = async (id: number, contact: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
  if (!response.ok) throw new Error('Failed to update contact');
  return response.json();
};

export const deleteContact = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete contact');
};
