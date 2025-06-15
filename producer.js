const { kafka } = require('./client')
const readline = require('readline');

const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function init() {
    const producer = kafka.producer();

    console.log('Producer Connecting to Kafka...');
    await producer.connect();
    console.log('Producer Connection success...');
    rl.setPrompt('>');
    rl.prompt();
    rl.on('line', async (line) => {
        const [riderName, location] = line.split(' ');
    
        await producer.send({
            topic: 'rider-updates',
            messages: [
                { partition:location.toLowerCase() === 'north' ? 0 : 1,
                  key: 'location-update', 
                  value: JSON.stringify({ name: riderName, location }) 
                },
            ]
        });
    }).on('close', async () => {
        console.log('Exiting...');
        rl.close();
        await producer.disconnect();
        console.log('Producer disconnected successfully');
    });

  
}

init();