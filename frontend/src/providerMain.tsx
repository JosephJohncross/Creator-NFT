import { ReactNode } from 'react';
import HeaderMain from './components/header/header-main';
import MiddlewareProvider from './middleware';
import Web3Provider from './providers/web3.provider';
import { Analytics } from "@vercel/analytics/react"

const Provider = ({ children }: { children: ReactNode }) => {

  return (
    <>
        <Web3Provider>
            <Analytics />
            <MiddlewareProvider>
                <HeaderMain />
                {children}
            </MiddlewareProvider>
        </Web3Provider>
    </>
  );
};

export default Provider;
