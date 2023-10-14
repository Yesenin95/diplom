import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, Tooltip } from '@chakra-ui/react';
import styles from "../styles/navbar.module.css"
export default function Navbar() {
   const { data: session } = useSession();
   const [isMobile, setIsMobile] = useState(false);
   
   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 768);
      }

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return (
      <nav className={styles.nav}>
         {isMobile ? (
            <MobileNav session={session} />
         ) : (
            <DesktopNav session={session} />
         )}
      </nav>
   );
}

function DesktopNav({ session }:any) {
   return (
      <div className={styles.desktopNav}>
         <Link href="/" className={styles.Link}>
            Главная
         </Link>
         <Link href="/mypages/contactsPage" className={styles.Link}>
            Контакты
         </Link>
         <Link href="/mypages/aboutPage" className={styles.Link}>
            О нас
         </Link>
         <Link href="/mypages/cartPage" className={styles.Link}>
            Корзина
            
         </Link>

         {session ? (
            <SignOutButton />
         ) : (
            <AuthButtons />
         )}
      </div>
   );
}

function MobileNav({ session }: any) {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className={styles.mobileNav}>
         <button onClick={() => setIsOpen(!isOpen)}>
            Меню
         </button>

         {isOpen && (
            <div className={styles.mobileMenu}>
               <Link className={styles.Link} href="/">
                  <span>Главная</span>
               </Link>
               <Link className={styles.Link} href="/mypages/contactsPage">
                  Контакты
               </Link>
               <Link className={styles.Link} href="/mypages/aboutPage">
                  О нас
               </Link>
               <Link className={styles.Link} href="/mypages/cartPage">
                  Корзина
               </Link>
               {session ? (
                  <SignOutButton />
               ) : (
                  <AuthButtons />
               )}
            </div>
         )}
      </div>
   );
}

function AuthButtons() {
   return (
      <>
         <Link href="/signin/page">
            <button className={styles.button}>Войти</button>
         </Link>
      </>
   );
}

function SignOutButton() {
   const { data: session } = useSession();

   return (
      <>
         <button className={styles.button}  onClick={() => signOut()}>
            Выйти
         </button>
         <div className={styles.profileLink}>
            <Tooltip label={session?.user?.name}>
               {session?.user?.image ? (
                  <Avatar src={session.user.image} />
               ) : (
                  <Avatar src={undefined} />
               )}
            </Tooltip>
            <Link href="/mypages/profilePage">
               <button className={styles.button}>Профиль</button>
            </Link>
         </div>
      </>
   );
}