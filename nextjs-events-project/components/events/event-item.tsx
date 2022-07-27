import React from 'react'

type Props = {
    id: string,
    title: string,
    description: string,
}

const EventItem : React.FC<Props> = ({ item }) => {
  return (
    <li key={item.id}>{item.title}</li>
  )
}

export default EventItem