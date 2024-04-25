
// If we have a server in heroku, we can do:
const prod={
    url:{
        API_URL:'https://myapp.herokuapp.com'
    }
}

const dev={
    url:{
        API_URL:'http://localhost:5000'
    }
}

/* API_URL:'http://localhost:5204' */
export const config=process.env.NODE_ENV==='development'? dev:prod;

