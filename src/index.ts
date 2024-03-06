import app from "./app";

const PORT : string | undefined = process.env.PORT;
app.listen(PORT , () :void => {
   console.log(`Server is listening to PORT ${ PORT }`)
})
   