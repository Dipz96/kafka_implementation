const { kafka } = require('./client')

async function init(){
    const admin = kafka.admin()
    console.log('Admin Connecting to Kafka...')
    await admin.connect()
    console.log('Admin Connection success...')
    // Create a topic

    console.log('Creating topic rider-updates...')
    await admin.createTopics({
        topics: [
        { topic: 'rider-updates', numPartitions: 2 }
        ]
    })
    
    console.log('Topic created successfully')
    
    // Disconnect the admin client
    console.log('Disconnecting admin client...')
    await admin.disconnect()
}

init();