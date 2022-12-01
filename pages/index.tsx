
import Head from 'next/head';
import Image from 'next/image';
import dbConnect from '../server/lib/mongodb';
import styles from '../styles/Home.module.css'
import Resident from '../server/models/Resident'

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
               <Link href={'/requests'}><h2>Заявки</h2></Link>
            </div>
            <div className={styles.card}>
               <Link href={'/bills'}><h2>Оплата</h2></Link>
            </div>

         </nav>
      </div>
   )
}

