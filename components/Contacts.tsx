import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/сontact.module.css';
import router from 'next/router';
import {
   MdPhone,
   MdEmail,
   MdLocationOn,
   MdFacebook,
} from 'react-icons/md';
import { BsGithub, BsDiscord } from 'react-icons/bs';
import Link from 'next/link';

export default function Contact() {
   const [isMessageSent, setMessageSent] = useState(false);
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
   });

   const handleFormSubmit = () => {
      setMessageSent(true);
      setFormData({
         name: '',
         email: '',
         message: '',
      });
   };
   const goBack = () => {
      router.back();
   };
   useEffect(() => {
      const isFormFilled =
         formData.name.trim() !== '' &&
         formData.email.trim() !== '' &&
         formData.message.trim() !== '';

      setIsButtonDisabled(!isFormFilled);
   }, [formData]);
   return (
      <>
         <Head>
            <title>Контакты</title>
         </Head>
         <button onClick={goBack} className={styles.buttonBack}>&larr; Назад</button>
         <div className={styles.container}>
            <div>
               <div className={styles.left}>
                  <h2>
                     Связаться с нами
                  </h2>
                  <div className={styles.btn}>
                     <Link href="tel:+7999999999" className={styles.button}>
                        <MdPhone color="#1970F1" size="20px" />
                        +7999999999
                     </Link>
                     <Link href="mailto:nikolatrofik@gmail.com" className={styles.button}>
                        <MdEmail color="#1970F1" size="20px" />
                        SweetLife
                     </Link>
                     <a className={styles.button}
                        href="https://www.google.com/maps/place/53.485542,49.316099"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <MdLocationOn color="#1970F1" size="20px" />
                        Лесопарковое ш., 42, Тольятти, Самарская обл.
                     </a>
                  </div>
                  <div className={styles.socialIcons}>
                     <MdFacebook size="28px" className={styles.icon} />
                     <BsGithub size="28px" className={styles.icon} />
                     <BsDiscord size="28px" className={styles.icon} />
                  </div>
               </div>
            </div>
            <div>
               <div>
                  <form className={styles.form}>
                     <div className={styles.formDiv}>
                        <label htmlFor="name">Твое имя</label>
                        <input
                           className={styles.input}
                           type="text"
                           id="name"
                           value={formData.name}
                           onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                           }
                           placeholder="Введите Имя"
                        />
                     </div>
                     <div className={styles.formDiv}>
                        <label htmlFor="email">Email</label>
                        <input
                           className={styles.input}
                           type="email"
                           id="email"
                           value={formData.email}
                           onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                           }
                           placeholder="Введите Email"
                        />
                     </div>
                     <div className={styles.formDiv}>
                        <label htmlFor="message" >Message</label>
                        <textarea
                        className={styles.textarea}
                           placeholder="Введите свое сообщение"
                           id="message"
                           value={formData.message}
                           onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                           }
                        />
                     </div>
                     <button
                        type="button"
                        className={styles.btnForm}
                        onClick={handleFormSubmit}
                        disabled={isButtonDisabled}
                     >
                        Send Message
                     </button>
                     {isMessageSent && (
                        <p className={styles.text}>Message sent successfully!</p>
                     )}
                  </form>
               </div>
            </div>
         </div>
      </>
   );
}
