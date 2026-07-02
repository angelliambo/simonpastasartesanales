const { execSync } = require('child_process');

function killPort(port) {
  try {
    console.log(`Checking port ${port}...`);
    let output;
    if (process.platform === 'win32') {
      try {
        output = execSync(`netstat -ano | findstr :${port}`).toString();
      } catch (err) {
        // netstat exits with code 1 if no matching line is found
        console.log(`Port ${port} is already free.`);
        return;
      }
      
      const lines = output.split('\n');
      const pids = new Set();
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5) {
          const localAddr = parts[1];
          const pid = parts[parts.length - 1];
          // Match lines that have the exact port (e.g. :5000) and a valid numeric PID
          if (localAddr.endsWith(`:${port}`) && /^\d+$/.test(pid) && pid !== '0') {
            pids.add(pid);
          }
        }
      }

      if (pids.size === 0) {
        console.log(`No active process found listening on port ${port}.`);
        return;
      }

      for (const pid of pids) {
        console.log(`Killing process ${pid} on port ${port}...`);
        try {
          execSync(`taskkill /F /PID ${pid}`);
          console.log(`Successfully killed process ${pid}.`);
        } catch (e) {
          console.error(`Failed to kill process ${pid}: ${e.message}`);
        }
      }
    } else {
      try {
        output = execSync(`lsof -t -i:${port}`).toString();
      } catch (err) {
        console.log(`Port ${port} is already free.`);
        return;
      }
      const pids = output.trim().split('\n').filter(Boolean);
      for (const pid of pids) {
        console.log(`Killing process ${pid} on port ${port}...`);
        try {
          process.kill(parseInt(pid, 10), 'SIGKILL');
          console.log(`Successfully killed process ${pid}.`);
        } catch (e) {
          console.error(`Failed to kill process ${pid}: ${e.message}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error freeing port ${port}: ${error.message}`);
  }
}

killPort(3000);
killPort(5000);
