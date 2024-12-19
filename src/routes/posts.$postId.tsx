import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useContacts } from '../hooks/useContacts'
import Button from '@/components/Button';
import ContactForm from '@/components/ContactForm';

import imagePath from '../assets/dp.webp';

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
})

function PostComponent() {
  const postId = Number(Route.useParams().postId);
  const { getContactById, remove } = useContacts();
  const { data: contact, isLoading } = getContactById(postId);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleDelete = () => {
    remove.mutate(postId);
  };

  return (
    !isLoading && (
      !isEdit && contact ? (<div className="p-4 flex gap-4">
        <div className='w-40 rounded-2xl border h-fit'>
          <img className='rounded-2xl	' src={imagePath} alt="contact" />
        </div>
        <div>
          <h4 className="text-xl font-bold underline">{contact.name}</h4>
          <div className="text-sm">{contact.email}</div>
          <div className='pt-6'>
            <Button text="Edit" onClick={() => setIsEdit(!isEdit)} />
            <Button text="Delete" onClick={handleDelete} className='text-red-500 hover:bg-red-200 ml-2'/>
          </div>
        </div>
      </div> 
      ) : (
        <div><ContactForm setIsEdit={setIsEdit} /></div>
      )
    )
  )
}
