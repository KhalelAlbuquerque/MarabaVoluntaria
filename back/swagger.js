import swaggerAutogen from'swagger-autogen'

const swaggerAutogenInv = swaggerAutogen()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/routesPaths/authRoutes.js',
                        './routes/routesPaths/userRoutes.js',
                        './routes/routesPaths/postRoutes.js']

swaggerAutogenInv(outputFile, endpointsFiles)