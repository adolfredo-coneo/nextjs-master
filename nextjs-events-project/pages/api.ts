export const getAllEvents = async () => {
  const response = await fetch(
    'https://nextjs-course-47bf8-default-rtdb.firebaseio.com/events.json'
  );

  const data = await response.json();

  const transformedEvents = Object.keys(data).map((key) => ({
    ...data[key],
    id: key,
  }));

  return transformedEvents;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (eventId: string) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === eventId);
};

export const getFilteredEvents = async (dateFilter: {
  year: any;
  month: any;
}) => {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
