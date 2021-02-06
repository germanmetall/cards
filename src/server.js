const fastify = require('fastify')({ logger: true })

fastify.get('/', async (request, reply) => {
    return reply.sendFile("../dist/Cards/index.html");
})

const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()