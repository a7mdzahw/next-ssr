import Head from "next/head";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <h1>DEXEF Home Page</h1>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  // checking user login state and redirect if not logged in
  if (!req.cookies.token) {
    return {
      redirect: {
        destination: "/login",
        fallback: "blocking",
      },
    };
  } else {
    return {
      props: { user: true },
    };
  }
}
