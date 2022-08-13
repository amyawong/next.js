// this file is under the path pages\cars\[id].js

// [param].js ---> dynamic route
// cars/:id
// i.e. cars/tesla, cars/lambo, cars/whatever

// goes from cars/index.js (home page or /cars) ->  cars/[id].js (or /cars/:id)



import { useRouter } from "next/router"; // hook that allows us to query parameters from the URL (in this example it is id from cars/:id, but can give any name)
// import Image from "next/image" // to render images
import Head from "next/head" 
  // for search engine optimization to allow for adding an seo friendly title and meta tags to the head of document
  // anything inside the <Head></Head> component will be rendered out to the head of the document


export default function Car({ car }) { // have to pass in { car } so taht the server can have a source fo data for image source
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
    <Head>
      <title>{car.color} {car.id}</title>
    </Head>
      <h1>Hello {id}</h1>
      <img src={car.image} />
      {/* <Image src={car.image} alt="car image" layout="fill" />   */}
      {/* when using <Image /> for next, must pass in an alt and width && height || layout property, then configure settings in next.config.js
      instructions: https://nextjs.org/docs/messages/next-image-unconfigured-host */}
    </>
  );
}



// /* STATIC GENERATION
// - drawbacks: data may become stale (i.e. if data on server changes, you need to rebuild and redeploy your site for chagnes to be reflected); hard to scale to many pages (will be slow and difficult to prerender if site has a million pages)
// - ideal use is for data that doesn't change often and for sites with relatively low number of total pages (i.e. a blog)
// - used to fetch data from a database (in this demo it is the json files with car names)
// - getStaticProps() is used to fetch data for the Car component; it is what tells Next to prerender the page
// - called prerendering because html is generated at build time
// - Next will automatically call this function then send the results as props to the component itself
// - what we are doing is fetching the json for the indivdiual car so it can be used in the html UI for the car page by passing in { params } */
// export async function getStaticProps({ params }) {
//   const req = await fetch(`http://localhost:3000/${params.id}.json`);
//     // in this case, we need the id from the URL to know which car was requested which we can get from the params argument in the function
//     // then we can use the fetch api to make a request to localhost to make a request to rquest the json file with that id

//   const data = await req.json(); // then convert what was fetched into json

//   return {
//     props: { car: data },
//   };
//   // final step is to return an object that has a props property where each prop can then be accessed by the component
//   // in component code, we can destructure the car prop and then use it in the jsx
// }


// /* SERVER SIDE GENERATION
// - since we are using a dynamic route, we need to prerender all the car ids by letting next know those ids in advance
// - getStaticPaths() tells Next which dynamic pages to render
// - can also request data from an api or database, which then returns a paths object that contains an array with every route for this dynamic url 
// - if you look on dev tools in Sources, you can see the fully rendered html before it was touched by JavaScript*/
// export async function getStaticPaths () {
//   const req = await fetch('http://localhost:3000/cars.json');
//   const data = await req.json();

//   const paths = data.map(car => {
//     return { params: { id: car }}
//   })
//   // in this demo, there are only three routes (tesla, lambo, and ford) which get mapped to an array of objects 
//   // which then return them from the function along with additional options like fallback behavior

//   return {
//     paths,
//     fallback: false,
//   }
// }

/* SERVER-SIDE-RENDERING
- drawbacks: slower; inefficient data caching; need to have a server to respond to requests (as opposed to caching everything on a global cdn)
- idea is to generate each page at request time; content is generated on a server when requested by the user
- ideal use is for when data changes constantly as it ensures the end user will always get the latest and greatest data from whatever data source happens to be
- getServerSideProps() does the same as getStaticProps except it does it on every request instead of a build time
- if getServerSideProps is being used, you can comment out getStaticProps() and getStaicPaths() */
export async function getServerSideProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();
  return {
    props: { car: data },
  };
}