import { Box, Flex, Avatar, Input, Button, VStack } from '@chakra-ui/react';
import { Session } from 'next-auth';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
type ProfileFormProps = {
   session: Session | null;
};
export default function ProfileForm({ session }: ProfileFormProps) {
   const name = session?.user?.name || '';
   const [editing, setEditing] = useState(false);
   const [firstName, setFirstName] = useState(name.split(' ')[0]);
   const [lastName, setLastName] = useState(name.split(' ')[1] || '');
   const [avatar, setAvatar] = useState(session?.user?.image || ''); // Используем state для пути к аватарке

   const handleEditToggle = () => {
      setEditing(!editing);
   };

   const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFirstName(e.target.value);
   };

   const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setLastName(e.target.value);
   };

   const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
      const inputElement = e.target as HTMLInputElement;
      const file = inputElement.files?.[0];

      if (file) {
         // Добавьте здесь логику загрузки аватарки на сервер и получения пути
         setAvatar(URL.createObjectURL(file));
      }
   };

   return (
      <Flex align="center">
         <Avatar size="2xl" src={avatar} mb={4} />
         <VStack align="flex-start" ml={4}>
            {editing ? (
               <>
                  <Input
                     value={firstName}
                     onChange={handleFirstNameChange}
                     size="sm"
                     placeholder="Имя"
                  />
                  <Input
                     value={lastName}
                     onChange={handleLastNameChange}
                     size="sm"
                     placeholder="Фамилия"
                  />
                  <Input type="file" onChange={handleAvatarUpload} mb={4} />
               </>
            ) : (
               <>
                  <Box>{firstName}</Box>
                  <Box>{lastName}</Box>
               </>
            )}
            <Button size="sm" onClick={handleEditToggle}>
               {editing ? 'Сохранить' : 'Редактировать'}
            </Button>
            <Button>
               <Link href={"/mypages/orderConfirmation"}>
                  Страница заказов
               </Link>
            </Button>
         </VStack>
      </Flex>
   );
}

