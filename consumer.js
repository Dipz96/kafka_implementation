const { kafka } = require('./client')
const group=process.argv[2];

async function init() {
    const consumer = kafka.consumer({ groupId: group });

    console.log('Consumer Connecting to Kafka...');
    await consumer.connect();
    console.log('Consumer Connection success...');

    await consumer.subscribe({ topic: 'rider-updates',fromBeginning: true});

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`${group},Received message: ${message.value.toString()} from topic: ${topic} partition: ${partition}`);
        },
    });

}

init();