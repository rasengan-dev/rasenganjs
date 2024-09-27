import os from "node:os";

// Get local IP
export default function getIP() {
  // Get network interfaces
  const networkInterfaces = os.networkInterfaces();

  // Find the IPv4 address for the default network interface
  let ipAddress = "";

  // Loop through the network interfaces
  for (const interfaceName in networkInterfaces) {
    // Get the network interface
    const iface = networkInterfaces[interfaceName];

    // Skip when there is no network interface
    if (!iface) {
      continue;
    }

    // Loop through the interface addresses
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];

      if (alias.family === "IPv4" && !alias.internal) {
        ipAddress = alias.address;
        break;
      }
    }

    if (ipAddress) {
      break;
    }
  }

  return ipAddress;
}
