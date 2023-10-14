import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function PrivateRoute({ children, requireSession }: { children: React.ReactNode; requireSession: boolean }) {
   const { data: session } = useSession();
   const router = useRouter();
   useEffect(() => {
      if ((requireSession && !session) || (!requireSession && session)) {
         router.push('/');
      }
   }, [session, router, requireSession]);

   return <>{children}</>;
}
