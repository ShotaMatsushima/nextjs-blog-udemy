import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post.js";

import Link from "next/link";
import Layout, { siteTitle } from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

//SSGの場合
export async function getStaticProps() {
  const allPostsData = await getPostsData(); //id,title, date, thumbnail

  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context) {
// return {
//   props: {
//     //コンポーネントに渡すためのprops
//   }
// }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <section className={utilStyle.headingMd}>
        <p>私の名前は松嶋翔太、エンジニアですね。</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>エンジニアブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={thumbnail} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <p className={utilStyle.boldText}>{title}</p>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
