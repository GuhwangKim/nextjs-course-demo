import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
      <meta
        name="description"
        content="Browe a huge list"
      ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://jeeho:ACQRiecdUa0lPGNa@cluster0.836vwfq.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })), // 컴포넌트 props로 사용할 준비하게 됨
    },
    revalidate: 10, //페이지를 다시 생성할 때까지 NEXT JS가 기다리는 시간
  };
}

// export async function getServerSideProps() {
//   //fetch data from API
//   // 서버에서 실행됨 (클라이언트X)
//   const req = context.req; // request 에 접근
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
