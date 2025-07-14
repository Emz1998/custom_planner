# Context7 MCP Server Integration

This project now includes Context7 MCP (Model Context Protocol) server integration, which provides up-to-date, version-specific documentation directly in your development workflow.

## What is Context7 MCP?

Context7 is an MCP server that solves the problem of outdated documentation by dynamically injecting current, version-specific documentation into AI prompts. It fetches real-time documentation from official sources.

## Installation & Setup

The Context7 MCP server is already configured in this project. Here's what's been added:

### Files Added
- `.mcpconfig.json` - MCP server configuration
- `mcp-server.js` - Wrapper script for easy server management
- `README-MCP.md` - This documentation file

### Package.json Scripts
Two new scripts have been added:
```bash
npm run mcp:context7        # Run with stdio transport (default)
npm run mcp:context7:http   # Run with HTTP transport on port 3001
```

## Usage

### Starting the MCP Server

**Option 1: Using npm scripts**
```bash
# Start with stdio transport (recommended for IDE integration)
npm run mcp:context7

# Start with HTTP transport
npm run mcp:context7:http
```

**Option 2: Using the wrapper script**
```bash
# Default (stdio transport)
node mcp-server.js

# HTTP transport on custom port
node mcp-server.js --transport http --port 3002

# Show help
node mcp-server.js --help
```

**Option 3: Direct npx command**
```bash
# Quick start
npx -y @upstash/context7-mcp

# With custom transport
npx -y @upstash/context7-mcp --transport http --port 3000
```

### Using Context7 in Your Development

Once the MCP server is running, you can use it in compatible AI coding assistants:

1. **In Claude Code, Cursor, or other MCP-compatible clients:**
   - Add "use context7" to your prompts
   - The server will automatically fetch relevant, up-to-date documentation

2. **Example usage:**
   ```
   use context7
   
   How do I implement a React component with TailwindCSS that uses flexbox layout?
   ```

### MCP Client Configuration

For IDE integration, your MCP client should be configured to use the server. The configuration is in `.mcpconfig.json`:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {}
    }
  }
}
```

## Supported IDEs and Clients

Context7 MCP works with:
- Claude Desktop
- Cursor
- Windsurf
- VS Code (with MCP extension)
- And other MCP-compatible AI coding assistants

## Transport Options

- **stdio** (default): Best for IDE integration
- **http**: Good for web-based clients or remote access
- **sse**: Server-sent events for real-time applications

## Benefits for This Project

Using Context7 MCP in your custom planner project will help with:

1. **React Development**: Get current React 19.1 documentation and patterns
2. **TailwindCSS**: Access up-to-date TailwindCSS 4.1 documentation
3. **Vite Configuration**: Current Vite 7.0 setup and optimization guides
4. **PDF Generation**: Latest Puppeteer documentation for PDF improvements
5. **Express.js**: Current Express 5.1 API documentation

## Troubleshooting

**Server won't start:**
- Ensure Node.js ≥ v18.0.0 is installed
- Check if port is already in use (for HTTP transport)

**Client can't connect:**
- Verify MCP client configuration
- Ensure server is running before starting client
- Check transport type matches client expectations

**No documentation returned:**
- Ensure "use context7" is included in your prompt
- Check server logs for any error messages
- Verify internet connection for documentation fetching

## Development Workflow Integration

For the best experience with this custom planner project:

1. Start the development servers:
   ```bash
   npm run start  # Starts both frontend and API server
   ```

2. In a separate terminal, start the MCP server:
   ```bash
   npm run mcp:context7
   ```

3. Configure your AI coding assistant to use the MCP server

4. Use "use context7" in your prompts when asking for help with:
   - React component development
   - TailwindCSS styling issues
   - PDF generation improvements
   - API endpoint development
   - Build and deployment questions

This integration will provide you with current, accurate documentation and examples specific to the exact versions of libraries used in this project.