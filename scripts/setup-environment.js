const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up restaurant API test environment...');

try {
    const repoPath = '/app';
    
    if (!fs.existsSync(path.join(repoPath, 'package.json'))) {
        console.log('❌ Repository not found at /app');
        process.exit(1);
    }

    // Read the cloned repository
    const packageJson = JSON.parse(fs.readFileSync(path.join(repoPath, 'package.json'), 'utf8'));
    console.log('📋 Found project:', packageJson.name);
    
    // Create environment file for the application
    const envContent = `MONGO_URI=mongodb://mongodb:27017/restaurant
JWT_SECRET=supersecretkey
PORT=3000
NODE_ENV=test
`.trim();
    
    fs.writeFileSync(path.join(repoPath, '.env'), envContent);
    console.log('✅ Environment file created');

    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', {
        cwd: repoPath,
        stdio: 'inherit'
    });

    console.log('✅ Setup completed successfully!');
    process.exit(0);

} catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
}