import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/index.module.css";

export default function Home() {
   return (
      <div className={styles.container}>
         <div className={styles.imgContainer}>
            <Flex p={8} >
               <div className={styles.imageWrapper}>
                  <Image src={"/Fon.png"} height={350} width={400} alt={"Логотип"} />
                  <Image src={"/text.png"} height={350} width={400} alt={"Логотип"} />
               </div>
            </Flex>
         </div>
         <div className={styles.products}>
            <Flex>
               <ul className={`${styles.list} ${styles.horizontalList}`}>
                  <li>
                     <Link href="/products/cakes-page">
                        <Image src={"/cake.png"} height={200} width={150} alt={"Пироженные"} />
                        <p>Пироженные</p>
                     </Link>
                  </li>
                  <li>
                     <Link href="/products/capcakes-page">
                        <Image src={"/capcake.png"} height={200} width={150} alt={"Капкейки"} />
                        <p>Капкейки</p>
                     </Link>
                  </li>
                  <li>
                     <Link href="/products/konfeta-page">
                        <Image src={"/konfeta.png"} height={200} width={150} alt={"Конфеты"} />
                        <p>Конфеты</p>
                     </Link>
                  </li>
                  <li>
                     <Link href="/products/chokolates-page">
                        <Image src={"/chokolate.png"} height={200} width={150} alt={"Шоколад"} />
                        <p>Шоколад</p>
                     </Link>
                  </li>
                  <li>
                     <Link href="/products/rulet-page">
                        <Image src={"/rulet.png"} height={200} width={150} alt={"Рулеты"} />
                        <p>Рулеты</p>
                     </Link>
                  </li>
               </ul>
            </Flex>
         </div>
        
      </div>
   );
}
