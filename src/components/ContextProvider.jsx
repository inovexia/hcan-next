'use client';
import { createContext, useState } from 'react';

export const MyContext = createContext();

export default function ContextProvider({ children }) {
  const [value, setValue] = useState(null);

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}
