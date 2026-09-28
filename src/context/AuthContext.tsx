import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
  logado: boolean;
  entrar: (usuario: string, senha: string) => boolean;
  sair: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [logado, setLogado] = useState(false);

  function entrar(usuario: string, senha: string): boolean {
    if (usuario === 'admin' && senha === '1234') {
      setLogado(true);
      return true;
    }
    return false;
  }

  function sair() {
    setLogado(false);
  }

  return (
    <AuthContext.Provider value={{ logado, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth precisa estar dentro de um AuthProvider');
  return contexto;
}