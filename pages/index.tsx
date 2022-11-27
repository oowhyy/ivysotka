
import Head from 'next/head';
import Image from 'next/image';
import dbConnect from '../server/lib/dbConnect';
import styles from '../styles/Home.module.css'
import Resident from '../server/models/Resident'
import mongoose from 'mongoose'
import { promises } from 'stream';
import Link from 'next/link';

export default function Home() {

   return (
      <div className={styles.container}>

         <nav>
            <div className={styles.card}>
               <Link href={'/residents'}><h2>Жильцы</h2></Link>
            </div>
            <div className={styles.card}>
               <Link href={'/residents'}><h2>Заявки</h2></Link>
            </div>
            <div className={styles.card}>
               <Link href={'/residents'}><h2>Оплата</h2></Link>
            </div>

         </nav>
      </div>
   )
}

export const getServerSideProps = async () => {
   try {

      const conn = await dbConnect();
      console.log(conn)

      let docCount = await Resident.countDocuments().exec();
      if (docCount == 0) {
         Promise.all([
            Resident.create({ name: 'user1', email: 'user1@mail.test' }),
            Resident.create({ name: 'user2', email: 'user2@mail.test' }),
            Resident.create({ name: 'user3', email: 'user3@mail.test' }),
            Resident.create({ name: 'user4', email: 'user4@mail.test' }),
            Resident.create({ name: 'user5', email: 'user5@mail.test' }),
         ]).then(() => console.log('Added residents'))
      }

      return {
         props: {

         },
      };
   } catch (error) {
      console.log(error);
      return {
         notFound: true,
      };
   }
};
