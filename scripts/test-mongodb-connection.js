const { MongoClient } = require('mongodb');

async function testMongoDBConnection() {
    console.log('🔗 Testing MongoDB connection for Restaurant API...');
    
    const uri = 'mongodb://mongodb:27017/restaurant';
    
    try {
        const client = new MongoClient(uri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000
        });
        
        await client.connect();
        console.log('✅ MongoDB connected successfully!');
        
        const db = client.db('restaurant');
        
        // Create test collection if not exists
        await db.collection('test_connection').insertOne({
            test: true,
            timestamp: new Date(),
            message: 'MongoDB connection test successful'
        });
        
        console.log('✅ Test data inserted successfully');
        
        // Clean up test data
        await db.collection('test_connection').deleteMany({ test: true });
        
        await client.close();
        console.log('✅ MongoDB connection test completed');
        return true;
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        return false;
    }
}

testMongoDBConnection().then(success => {
    process.exit(success ? 0 : 1);
});