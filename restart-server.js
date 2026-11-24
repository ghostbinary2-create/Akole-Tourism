const { execSync } = require('child_process');

try {
  const out = execSync('C:\\Windows\\System32\\netstat.exe -ano').toString();
  const line = out.split('\n').find(l => l.includes(':5000') && l.includes('LISTENING'));
  console.log('Port 5000 line:', line);
  if (line) {
    const pid = line.trim().split(/\s+/).pop();
    console.log('Killing PID:', pid);
    execSync(`C:\\Windows\\System32\\taskkill.exe /F /PID ${pid}`);
    console.log('Killed old server on port 5000 successfully!');
  }
} catch (e) {
  console.log('Error:', e.message);
}
