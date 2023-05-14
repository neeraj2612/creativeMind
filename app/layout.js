import './globals.css'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'


export default function Layout({ children }) {
  return (
         <div>
            <Nav  />
            
            <main>{children}</main>
        </div>
  )
}
