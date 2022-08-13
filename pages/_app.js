// serves as main entry point into app
// every individual page will start from this template
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} /> // points to root url and is defined in index.js file
}

export default MyApp
