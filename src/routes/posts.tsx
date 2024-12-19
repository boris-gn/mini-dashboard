import * as React from 'react'
import { Outlet, createFileRoute } from '@tanstack/react-router'

import ContactList from '@/components/ContactList'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useContacts } from '@/hooks/useContacts'

export const Route = createFileRoute('/posts')({
  component: PostsComponent,
})

function PostsComponent() {
  const { contacts } = useContacts()
  const [searchTerm, setSearchTerm] = React.useState('')

  return (
    <div className="flex gap-4 h-screen">
      <aside className='w-full max-w-sm bg-slate-100 h-full'>
        <div className='border-b p-4 flex gap-4'>
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full"
            contClassName="flex-1"
            icon
          />
          <Button
            text='New'
          />
        </div>
        <ContactList contacts={contacts} searchTerm={searchTerm} />
      </aside>
      <hr />
      <Outlet />
    </div>
  )
}
