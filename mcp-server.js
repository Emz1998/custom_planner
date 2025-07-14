#!/usr/bin/env node

/**
 * Context7 MCP Server Integration
 * 
 * This script provides a simple wrapper for the Context7 MCP server
 * that can be integrated into the custom planner development workflow.
 * 
 * Usage:
 * - Run directly: node mcp-server.js
 * - With custom port: node mcp-server.js --port 3002
 * - With HTTP transport: node mcp-server.js --transport http
 */

import { spawn } from 'child_process';
import process from 'process';

// Default configuration
const DEFAULT_CONFIG = {
  transport: 'stdio',
  port: '3000'
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const config = { ...DEFAULT_CONFIG };
  
  for (let i = 0; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];
    
    switch (flag) {
      case '--transport':
        config.transport = value;
        break;
      case '--port':
        config.port = value;
        break;
      case '--help':
      case '-h':
        console.log(`
Context7 MCP Server Wrapper

Usage: node mcp-server.js [options]

Options:
  --transport <stdio|http|sse>  Transport type (default: stdio)
  --port <number>               Port for HTTP/SSE transport (default: 3000)
  --help, -h                    Show this help message

Examples:
  node mcp-server.js                           # Run with stdio transport
  node mcp-server.js --transport http          # Run with HTTP transport
  node mcp-server.js --transport http --port 3002  # HTTP on custom port
        `);
        process.exit(0);
        break;
    }
  }
  
  return config;
}

// Start the Context7 MCP server
function startMCPServer(config) {
  console.log('🚀 Starting Context7 MCP Server...');
  console.log(`   Transport: ${config.transport}`);
  
  const args = ['-y', '@upstash/context7-mcp'];
  
  if (config.transport !== 'stdio') {
    args.push('--transport', config.transport);
  }
  
  if (config.transport === 'http' || config.transport === 'sse') {
    args.push('--port', config.port);
    console.log(`   Port: ${config.port}`);
  }
  
  console.log(`   Command: npx ${args.join(' ')}`);
  console.log('');
  
  const server = spawn('npx', args, {
    stdio: 'inherit',
    shell: true
  });
  
  server.on('error', (error) => {
    console.error('❌ Failed to start Context7 MCP server:', error.message);
    process.exit(1);
  });
  
  server.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ Context7 MCP server exited with code ${code}`);
      process.exit(code);
    } else {
      console.log('✅ Context7 MCP server stopped gracefully');
    }
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping Context7 MCP server...');
    server.kill('SIGINT');
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 Stopping Context7 MCP server...');
    server.kill('SIGTERM');
  });
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const config = parseArgs();
  startMCPServer(config);
}

export { startMCPServer, parseArgs };