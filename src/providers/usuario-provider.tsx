
import React, { createContext, useContext, useState } from 'react';

// Crie o contexto
export type Usuario = { nome: string, imagem: string }
const UsuarioContext = createContext<{ usuario: Usuario, setUsuario?: any }>({ usuario: { nome: '', imagem: '' } });

// Crie o provedor (UsuarioProvider)
export const UsuarioProvider = ({ children }: any) => {
  const [usuario, setUsuario] = useState<Usuario>({ nome: '', imagem: '' });

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// Crie um hook personalizado para acessar o contexto
export const useUsuarioContext = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error('useUsuario deve ser usado dentro do UsuarioProvider');
  }
  return context;
};