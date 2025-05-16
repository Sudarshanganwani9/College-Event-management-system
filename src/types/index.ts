
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  capacity: number;
  registeredCount: number;
}

export interface Registration {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  eventId: string;
  registrationDate: string;
}
