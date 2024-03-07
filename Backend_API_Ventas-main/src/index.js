import app from "./app.js";
import AuthRoutes from "./routes/authentication.routes.js";
app.listen(4000)



console.log(`Server listening on Port 4000`)

app.use('/api', AuthRoutes)