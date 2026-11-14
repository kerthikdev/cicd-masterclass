export interface RoadmapLessonDetail {
  id: string;
  title: string;
  phaseTitle: string;
  estimatedReadTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  overview: string;
  mentalModelAnalogy: {
    title: string;
    description: string;
  };
  deepDiveSections: {
    heading: string;
    content: string;
    codeSnippet?: {
      language: string;
      title: string;
      code: string;
    };
  }[];
  handsOnLab: {
    labTitle: string;
    prerequisites: string[];
    steps: string[];
    aiPrompt: string;
    expectedOutcome: string;
  };
  troubleshootingTips: string[];
  knowledgeQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const roadmapLessonsContent: Record<string, RoadmapLessonDetail> = {
  'p1-item-1': {
    id: 'p1-item-1',
    title: 'Understand Model Context Protocol (MCP) Fundamentals',
    phaseTitle: 'Phase 1: Foundations of AI-Driven NetDevOps & MCP',
    estimatedReadTime: '8 mins',
    difficulty: 'Beginner',
    overview: 'The Model Context Protocol (MCP) is an open standard developed by Anthropic that creates a standardized, bidirectional interface between large language models (LLMs) and external tools, databases, and local applications.',
    mentalModelAnalogy: {
      title: 'The Universal Adapter for AI Intelligence',
      description: 'Think of an LLM as a brilliant network architect sitting in a soundproof room with no hands. Before MCP, you had to write custom glue code for every tool. MCP acts like a standardized USB-C interface: it gives the architect virtual hands, allowing them to plug directly into Cisco Packet Tracer, query device states, drop switches onto canvases, and receive real-time ping results without custom API middleware.'
    },
    deepDiveSections: [
      {
        heading: 'Why Traditional APIs Fall Short in Agentic Workflows',
        content: `Traditional REST APIs are stateless and require human developers to orchestrate request chains manually. In network engineering, diagnosing an outage requires multi-step deductive reasoning:
1. Check interface status (UP/DOWN).
2. Read the ARP table.
3. Inspect OSPF neighbor states.
4. Verify routing table entries.

With MCP, the LLM autonomously determines which tool to call next based on the result of the previous tool call. If an interface is DOWN, it calls \`configure_interface\` to bring it up, instead of waiting for human intervention.`
      },
      {
        heading: 'JSON-RPC 2.0 Transport Architecture',
        content: `MCP operates over standard JSON-RPC 2.0 messages. Communication occurs over either \`stdio\` (standard input/output for local processes) or Server-Sent Events (SSE) for remote HTTP connections. For local desktop control of Packet Tracer, \`stdio\` provides sub-millisecond execution latency with zero external network overhead.`,
        codeSnippet: {
          language: 'json',
          title: 'Sample MCP Tool Call JSON-RPC Payload',
          code: `{\n  "jsonrpc": "2.0",\n  "method": "tools/call",\n  "params": {\n    "name": "pt_bridge_status",\n    "arguments": {}\n  },\n  "id": 1\n}`
        }
      }
    ],
    handsOnLab: {
      labTitle: 'Inspecting Your First MCP Bridge Connection',
      prerequisites: ['Terminal access', 'Python 3.10+ or uv installed'],
      steps: [
        'Open terminal and verify uv tool runner is accessible',
        'Review the MCP specification at modelcontextprotocol.io',
        'Inspect how Claude Code and Cursor consume MCP servers from their configuration JSON'
      ],
      aiPrompt: 'Explain how Model Context Protocol differs from traditional REST APIs when automating Cisco Packet Tracer topologies.',
      expectedOutcome: 'Understanding of the client-server-bridge hierarchy and JSON-RPC tool-calling lifecycle.'
    },
    troubleshootingTips: [
      'MCP stdio servers must write purely machine-readable JSON to stdout; debug logs must go to stderr to avoid corrupting the client connection.',
      'Ensure execution path for local tools does not require administrative elevation unless modifying system files.'
    ],
    knowledgeQuiz: {
      question: 'Which protocol and transport mechanism does local desktop MCP communication use primarily?',
      options: [
        'gRPC over HTTP/3',
        'JSON-RPC 2.0 over standard I/O (stdio)',
        'SOAP XML over raw TCP sockets',
        'GraphQL subscriptions over WebSockets'
      ],
      correctIndex: 1,
      explanation: 'Local MCP servers communicate via JSON-RPC 2.0 formatted messages streamed through standard input and output (stdio), ensuring lightweight, secure, and fast inter-process communication.'
    }
  },

  'p1-item-2': {
    id: 'p1-item-2',
    title: 'Explore Cisco Packet Tracer Internal Architecture & Scripting',
    phaseTitle: 'Phase 1: Foundations of AI-Driven NetDevOps & MCP',
    estimatedReadTime: '10 mins',
    difficulty: 'Beginner',
    overview: 'Cisco Packet Tracer is a multi-event discrete packet simulation engine. Embedded deep within its binary is a QtScript (ECMAScript/JavaScript) runtime that exposes complete control over canvas objects, device models, interfaces, and packet streams.',
    mentalModelAnalogy: {
      title: 'The Puppet Master Behind the Canvas',
      description: 'When you drag a router onto the Packet Tracer GUI, the application does not simply draw an image; it instantiates a virtual hardware simulator object with virtual RAM, NVRAM, and IOS buffers. The Scripting Engine is the backstage control panel: every click you can perform with a mouse can be executed programmatically via script methods.'
    },
    deepDiveSections: [
      {
        heading: 'The Packet Tracer Process Model & Extensions Directory',
        content: `Packet Tracer maintains a dedicated \`extensions/\` folder where external modules can register GUI menus, background event listeners, and socket servers. When Packet Tracer boots, it scans this directory for files matching the \`.pts\` (Packet Tracer Script) extension.`
      },
      {
        heading: 'The Security Sandbox & Script Approval Dialog',
        content: `To prevent malicious scripts from compromising the host system, Cisco Packet Tracer enforces an internal security sandbox. Whenever a new or modified \`.pts\` file is detected in the extensions path, Packet Tracer halts startup and prompts the user:
"Detected a new script module: MCP-Control-Center. Enable?"
Clicking "Yes" grants the module permission to register socket listeners and access the IPC bridge.`,
        codeSnippet: {
          language: 'javascript',
          title: 'QtScript Sample Engine Access Snippet',
          code: `// Internal Packet Tracer Script Engine API (QtScript)\nvar app = ipc.getApp();\nvar canvas = app.getCurrentCanvas();\nvar device = canvas.addDevice("Cisco 2960-24TT", 200, 150);\ndevice.setName("SW-CORE-01");\nipc.log("Device provisioned: " + device.getName());`
        }
      }
    ],
    handsOnLab: {
      labTitle: 'Verifying Cisco Packet Tracer Script Modules Menu',
      prerequisites: ['Cisco Packet Tracer v8.2+ installed on macOS/Windows/Linux'],
      steps: [
        'Launch Cisco Packet Tracer',
        'Navigate to the top menu bar: Extensions ➔ Scripting',
        'Click on "Configure PT Script Modules"',
        'Notice the modules table and ensure the scripting engine is active'
      ],
      aiPrompt: 'Where is the Packet Tracer script module directory located on macOS and Windows?',
      expectedOutcome: 'Locating the Configure PT Script Modules interface inside Packet Tracer.'
    },
    troubleshootingTips: [
      'Older versions of Packet Tracer (v7.x or early v8.0) lack modern IPC stability; ensure you are running v8.2 or 8.2.1+.',
      'On macOS, the extensions directory is inside the application bundle: /Applications/Cisco Packet Tracer.app/Contents/extensions/.'
    ],
    knowledgeQuiz: {
      question: 'Why does Cisco Packet Tracer display a confirmation dialog when adding a new script module?',
      options: [
        'To verify your Cisco Networking Academy login credentials',
        'To prompt for screen resolution scaling settings',
        'As an intentional security sandbox barrier preventing unapproved external scripts from executing',
        'To confirm your computer has sufficient RAM for simulation'
      ],
      correctIndex: 2,
      explanation: 'Packet Tracer enforces an explicit user confirmation dialog as a security boundary before granting script modules access to the simulator engine.'
    }
  },

  'p1-item-3': {
    id: 'p1-item-3',
    title: 'The NetDevOps Evolution: CLI ➔ Python/Netmiko ➔ AI Agents',
    phaseTitle: 'Phase 1: Foundations of AI-Driven NetDevOps & MCP',
    estimatedReadTime: '7 mins',
    difficulty: 'Beginner',
    overview: 'Network engineering has evolved from manual, console-cable commands to automated Python scripting, and now to declarative, autonomous AI agents driving infrastructure via Model Context Protocol.',
    mentalModelAnalogy: {
      title: 'From Horse Cart to Self-Driving Jet',
      description: 'Manual CLI is like walking every package to its destination on foot. Python scripting is like driving a truck along a pre-paved highway: fast, but completely helpless if there is an unexpected road blockage. AI Agent NetDevOps is like an autonomous drone: you tell it "deliver the packet to Seattle securely," and it scans the weather, plots the route, corrects for turbulence, and verifies safe arrival.'
    },
    deepDiveSections: [
      {
        heading: 'Comparison Matrix: Evolution of Network Operations',
        content: `• Generation 1: Manual CLI (Console cables, PuTTY, manual typo risks)
• Generation 2: Scripted Automation (Python, Netmiko, Scrapli, Ansible playbooks)
• Generation 3: Declarative GitOps (Terraform, NetBox Single Source of Truth)
• Generation 4: Autonomous AI NetDevOps (LLM + MCP agents with real-time feedback loops)`
      }
    ],
    handsOnLab: {
      labTitle: 'Analyzing the NetDevOps Lifecycle',
      prerequisites: ['Basic understanding of IP routing and CLI commands'],
      steps: [
        'Write down the 7 manual steps needed to configure an OSPF router on the CLI',
        'Compare that with a 1-sentence prompt given to an MCP agent'
      ],
      aiPrompt: 'Compare Python Netmiko scripting vs MCP agent automation for Cisco device provisioning.',
      expectedOutcome: 'Appreciation of declarative agentic loops vs rigid procedural scripts.'
    },
    troubleshootingTips: [
      'AI agents should always validate changes by reading post-change telemetry (e.g. show ip route) before reporting success.'
    ],
    knowledgeQuiz: {
      question: 'What is the primary benefit of Generation 4 AI Agent NetDevOps over Generation 2 Python scripts?',
      options: [
        'AI agents use cheaper network cables',
        'AI agents can dynamically reason about unexpected errors, inspect telemetry, and self-correct',
        'AI agents remove the need for IP addresses',
        'Python scripts cannot configure routers'
      ],
      correctIndex: 1,
      explanation: 'While Python scripts execute fixed procedural code and fail on unexpected outputs, AI agents can read errors, inspect device state, and iteratively self-correct until the goal is achieved.'
    }
  },

  'p2-item-1': {
    id: 'p2-item-1',
    title: 'The Dual-Component Bridge Architecture',
    phaseTitle: 'Phase 2: MCP-Packet-Tracer Deep-Dive Architecture',
    estimatedReadTime: '9 mins',
    difficulty: 'Intermediate',
    overview: 'Mats2208/MCP-Packet-Tracer decouples responsibilities into two distinct software layers: a Python MCP server communicating with the AI client over stdio, and a QtScript control module operating inside Packet Tracer.',
    mentalModelAnalogy: {
      title: 'The Diplomat and the Field Commander',
      description: 'The Python MCP server acts like a multilingual diplomat: it speaks fluent JSON-RPC with Claude/Cursor. The QtScript extension (MCP-Control-Center.pts) is the local field commander stationed inside Packet Tracer: it directly commands the canvas and hardware simulator. They communicate over a secure local IPC link.'
    },
    deepDiveSections: [
      {
        heading: 'Component A: packet-tracer-mcp (Python Host)',
        content: `Packaged as a modern Python distribution, it runs effortlessly via \`uvx packet-tracer-mcp --stdio\`. It parses incoming MCP tool invocations, validates arguments using Pydantic schemas, and serializes commands destined for the Packet Tracer bridge.`
      },
      {
        heading: 'Component B: MCP-Control-Center.pts (QtScript Module)',
        content: `Residing inside Packet Tracer's \`extensions/MCPControlCenter/\` directory, this script listens on a local loopback port or named file descriptor. It unpacks commands, invokes Packet Tracer C++/QtScript engine APIs, and packages execution results back into JSON responses.`
      }
    ],
    handsOnLab: {
      labTitle: 'Tracing Bridge Communication Flow',
      prerequisites: ['Python 3.10+'],
      steps: [
        'Examine the Mats2208/MCP-Packet-Tracer GitHub repo files',
        'Inspect src/adapters/mcp/tools/live.py',
        'Observe how tool arguments are mapped to IPC socket messages'
      ],
      aiPrompt: 'Trace the lifecycle of a pt_bridge_status tool call from Claude Code to Cisco Packet Tracer.',
      expectedOutcome: 'Clear architectural understanding of the two halves of the bridge.'
    },
    troubleshootingTips: [
      'If Component A runs but Component B is not loaded, the MCP server returns bridge_connected: false.'
    ],
    knowledgeQuiz: {
      question: 'Which component directly calls the internal Packet Tracer QtScript API?',
      options: [
        'The Claude Desktop app',
        'The uvx Python CLI process',
        'The MCP-Control-Center.pts script module running inside Packet Tracer',
        'The operating system network stack'
      ],
      correctIndex: 2,
      explanation: 'MCP-Control-Center.pts runs inside the Packet Tracer process memory space and has native access to the QtScript application object.'
    }
  },

  'p2-item-2': {
    id: 'p2-item-2',
    title: 'Session Tokens & Bridge Security Model',
    phaseTitle: 'Phase 2: MCP-Packet-Tracer Deep-Dive Architecture',
    estimatedReadTime: '8 mins',
    difficulty: 'Intermediate',
    overview: 'Because Packet Tracer script modules run on your local computer, MCP-Packet-Tracer implements session token authentication to ensure that only authorized AI client processes can control the simulator.',
    mentalModelAnalogy: {
      title: 'The Secret One-Time Handshake',
      description: 'Whenever Packet Tracer starts and activates the script module, it generates an ephemeral session token (like an airport boarding pass). The Python MCP server must present this exact token on every request; any third-party app trying to hijack the port is rejected.'
    },
    deepDiveSections: [
      {
        heading: 'Ephemeral Token Generation & Verification',
        content: `1. On startup, MCP-Control-Center writes a cryptographically random session token to a protected local user directory.
2. The Python MCP client reads this token upon initialization.
3. Every subsequent JSON-RPC command header includes the token for validation.
4. If Packet Tracer restarts, a new token is generated, ensuring old stale sessions cannot linger.`
      }
    ],
    handsOnLab: {
      labTitle: 'Understanding Token Handshakes',
      prerequisites: ['Terminal access'],
      steps: [
        'Observe where local session secrets are maintained',
        'Understand why restarting Packet Tracer invalidates previous session tokens'
      ],
      aiPrompt: 'How does MCP-Packet-Tracer secure localhost IPC communication against unauthorized applications?',
      expectedOutcome: 'Understanding ephemeral session tokens and local isolation.'
    },
    troubleshootingTips: [
      'If you see "Token Mismatch" errors, restart both Cisco Packet Tracer and your AI agent terminal.'
    ],
    knowledgeQuiz: {
      question: 'What happens to the bridge session token when Cisco Packet Tracer is closed and reopened?',
      options: [
        'It stays permanent forever in the registry',
        'A fresh, random session token is generated, invalidating prior sessions for security',
        'The user must manually email Cisco for a new license',
        'Token authentication is disabled'
      ],
      correctIndex: 1,
      explanation: 'Restarting Packet Tracer generates a brand new ephemeral session token, which protects against stale or hijacked sessions.'
    }
  },

  'p3-item-1': {
    id: 'p3-item-1',
    title: 'Install Astral uv & Python Runtime Toolchain',
    phaseTitle: 'Phase 3: The Setup & Installation Blueprint (llms-install.md)',
    estimatedReadTime: '6 mins',
    difficulty: 'Beginner',
    overview: 'Astral uv is an extremely fast Python package manager and runner written in Rust. It bundles its own isolated Python interpreter, eliminating all virtual environment setup and version conflicts.',
    mentalModelAnalogy: {
      title: 'The Zero-Config Cargo Runner',
      description: 'Traditional Python setup requires installing python, pip, pyenv, and virtual environments. Astral uv is like a single binary tool: you run `uvx <package>` and it downloads, isolates, and executes the package in milliseconds without modifying system Python.'
    },
    deepDiveSections: [
      {
        heading: 'Installation Commands Across Platforms',
        content: `Execute the official Astral installer script for your operating system:`,
        codeSnippet: {
          language: 'bash',
          title: 'Official uv Installation Commands',
          code: `# macOS & Linux (curl install)\ncurl -LsSf https://astral.sh/uv/install.sh | sh\n\n# Windows (PowerShell with ExecutionPolicy)\npowershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"\n\n# Verify installation\nuv --version\nuvx --version`
        }
      }
    ],
    handsOnLab: {
      labTitle: 'Verifying uv and uvx Availability',
      prerequisites: ['Terminal access on macOS, Windows, or Linux'],
      steps: [
        'Open terminal and execute the install command',
        'Reload your shell session: source ~/.zshrc or reopen terminal',
        'Run uvx --version to confirm readiness'
      ],
      aiPrompt: 'How does uvx execute ephemeral Python packages without touching global pip packages?',
      expectedOutcome: 'uv version 0.4+ and uvx accessible in your command prompt.'
    },
    troubleshootingTips: [
      'If command not found appears after install, ensure ~/.cargo/bin or ~/.local/bin is in your $PATH.'
    ],
    knowledgeQuiz: {
      question: 'Why does llms-install.md mandate Astral uv / uvx instead of traditional pip install?',
      options: [
        'uv is developed by Cisco',
        'uv brings its own isolated Python environment, eliminating PATH and dependency headaches',
        'pip does not support JSON',
        'uv is only compatible with Windows'
      ],
      correctIndex: 1,
      explanation: 'Astral uv automatically manages its own hermetic Python runtimes, meaning users never experience system Python conflicts or PATH configuration issues.'
    }
  },

  'p3-item-2': {
    id: 'p3-item-2',
    title: 'The One-Prompt Autonomous AI Setup (Recommended)',
    phaseTitle: 'Phase 3: The Setup & Installation Blueprint (llms-install.md)',
    estimatedReadTime: '5 mins',
    difficulty: 'Beginner',
    overview: 'The hallmark of llms-install.md is that you do not need to perform multi-step manual file copying. You can feed a single instruction into your AI agent, and it performs OS detection, MCP registration, skill installation, and extension placement automatically.',
    mentalModelAnalogy: {
      title: 'The Auto-Pilot Installation Command',
      description: 'Instead of following a 20-step recipe by hand, you give the head chef the blueprint: the AI agent inspects your operating system, finds where Packet Tracer is installed, configures its own MCP connection, and places all files into the right folders.'
    },
    deepDiveSections: [
      {
        heading: 'The Exact Official Prompt',
        content: `Paste this single prompt directly into Claude Code, Cursor, Codex, or Antigravity:`,
        codeSnippet: {
          language: 'markdown',
          title: 'The Official llms-install.md Prompt',
          code: `Install the Packet Tracer MCP from https://github.com/Mats2208/MCP-Packet-Tracer and set everything up for me.`
        }
      },
      {
        heading: 'What the Agent Executes Behind the Scenes',
        content: `1. Detects OS: macOS, Windows, or Linux.
2. Runs \`uvx packet-tracer-mcp install-skill\` to give the LLM native device and port knowledge.
3. Registers the MCP server command in your client settings.
4. Locates Cisco Packet Tracer's extensions folder and drops \`MCP-Control-Center.pts\`.
5. Instructs you to restart Packet Tracer and click Yes.`
      }
    ],
    handsOnLab: {
      labTitle: 'Executing the One-Prompt Setup',
      prerequisites: ['AI coding agent (Claude Code, Cursor, Codex, etc.)', 'Packet Tracer installed'],
      steps: [
        'Copy the official prompt above',
        'Paste into your AI coding assistant',
        'Review the actions executed by the agent'
      ],
      aiPrompt: 'Install the Packet Tracer MCP from https://github.com/Mats2208/MCP-Packet-Tracer and set everything up for me.',
      expectedOutcome: 'Agent completes setup and reports the manual restart step.'
    },
    troubleshootingTips: [
      'Ensure Packet Tracer is closed while the agent copies files to avoid file-lock errors.'
    ],
    knowledgeQuiz: {
      question: 'What is the ONLY manual step required from the user during the one-prompt setup?',
      options: [
        'Writing 500 lines of Python code',
        'Recompiling Cisco Packet Tracer from source code',
        'Restarting Cisco Packet Tracer and clicking Yes on the "Detected a new script module" dialog',
        'Purchasing an enterprise Cisco license'
      ],
      correctIndex: 2,
      explanation: 'Because of Packet Tracer’s internal security sandbox, approving the new script module requires a physical human click on the dialog.'
    }
  },

  'p3-item-3': {
    id: 'p3-item-3',
    title: 'Manual MCP Server & Skill Configuration',
    phaseTitle: 'Phase 3: The Setup & Installation Blueprint (llms-install.md)',
    estimatedReadTime: '8 mins',
    difficulty: 'Intermediate',
    overview: 'If you prefer manual control, you can register packet-tracer-mcp directly inside your AI client configuration and install the domain skill.',
    mentalModelAnalogy: {
      title: 'Teaching the AI the Network Dictionary',
      description: 'Without the Agent Skill, an LLM might guess invalid port names like "Ethernet1" instead of "FastEthernet0/1" or invent fictional router models. The skill installs precise device schemas, valid port ranges, and API definitions.'
    },
    deepDiveSections: [
      {
        heading: 'Step 1: Install the Domain Skill',
        content: `Run the skill installer via uvx:`,
        codeSnippet: {
          language: 'bash',
          title: 'Skill Installation Commands',
          code: `# For Claude Code / OpenCode (installs to ~/.claude/skills):\nuvx packet-tracer-mcp install-skill\n\n# For Codex / Custom agents:\nuvx packet-tracer-mcp install-skill --dest ~/.agents/skills`
        }
      },
      {
        heading: 'Step 2: MCP Registration Commands',
        content: `Use the Claude CLI or edit your configuration JSON:`,
        codeSnippet: {
          language: 'bash',
          title: 'Claude MCP Add CLI Command',
          code: `# macOS & Linux:\nclaude mcp add --scope user --transport stdio packet-tracer -- uvx packet-tracer-mcp --stdio\n\n# Windows PowerShell (note the quoted --):\nclaude mcp add --scope user --transport stdio packet-tracer "--" uvx packet-tracer-mcp --stdio`
        }
      }
    ],
    handsOnLab: {
      labTitle: 'Registering packet-tracer-mcp Manually',
      prerequisites: ['uv installed', 'Claude Code or Cursor'],
      steps: [
        'Run uvx packet-tracer-mcp install-skill',
        'Execute the registration command',
        'Run claude mcp list and verify packet-tracer shows Connected'
      ],
      aiPrompt: 'Show me my registered MCP servers and verify if packet-tracer is listed.',
      expectedOutcome: 'packet-tracer ... Connected in MCP list.'
    },
    troubleshootingTips: [
      'On Windows PowerShell, omitting quotes around -- causes PowerShell to consume the flag and produce an error.'
    ],
    knowledgeQuiz: {
      question: 'What is the purpose of running `uvx packet-tracer-mcp install-skill`?',
      options: [
        'It upgrades your computer’s graphics card drivers',
        'It injects contextual knowledge of Cisco hardware models, port syntax, and APIs into the AI',
        'It deletes older Packet Tracer labs',
        'It configures a static IP address on your home router'
      ],
      correctIndex: 1,
      explanation: 'The agent skill equips the AI with exact device specifications, preventing syntax errors in port numbers and model names.'
    }
  },

  'p3-item-4': {
    id: 'p3-item-4',
    title: 'The Critical Manual Step: Packet Tracer Extension Authorization',
    phaseTitle: 'Phase 3: The Setup & Installation Blueprint (llms-install.md)',
    estimatedReadTime: '6 mins',
    difficulty: 'Beginner',
    overview: 'This is the single most critical juncture of the setup: authorizing MCP-Control-Center inside Cisco Packet Tracer.',
    mentalModelAnalogy: {
      title: 'Unlocking the Vault Door',
      description: 'Even if all files are in place, the bridge cannot communicate until you physically open the vault door by approving the script module inside Packet Tracer.'
    },
    deepDiveSections: [
      {
        heading: 'Extension Locations by Platform',
        content: `• macOS: \`/Applications/Cisco Packet Tracer <version>.app/Contents/extensions/MCPControlCenter/\`
• Windows: \`C:\\Program Files\\Cisco Packet Tracer <version>\\extensions\\MCPControlCenter\\\`
• Linux: \`/opt/pt/extensions/MCPControlCenter/\``
      },
      {
        heading: 'The Approval Workflow',
        content: `1. Ensure Packet Tracer is completely closed.
2. Copy \`MCP-Control-Center.pts\` into the \`MCPControlCenter\` subdirectory.
3. Start Cisco Packet Tracer.
4. When prompted: "Detected a new script module: MCP-Control-Center. Enable it?", click **Yes**.`
      }
    ],
    handsOnLab: {
      labTitle: 'Authorizing the Extension',
      prerequisites: ['Packet Tracer installed', 'MCP-Control-Center.pts in extensions folder'],
      steps: [
        'Launch Packet Tracer',
        'Verify the script dialog appears and click Yes',
        'Notice the MCP Control Center status window'
      ],
      aiPrompt: 'What should I do if the script module approval prompt does not show up?',
      expectedOutcome: 'Packet Tracer runs with MCP-Control-Center active.'
    },
    troubleshootingTips: [
      'If the dialog never appears, go to Extensions ➔ Scripting ➔ Configure PT Script Modules and add the file manually.'
    ],
    knowledgeQuiz: {
      question: 'Where should MCP-Control-Center.pts be placed on macOS?',
      options: [
        '/Users/username/Desktop/',
        '/Applications/Cisco Packet Tracer.app/Contents/extensions/MCPControlCenter/',
        '/tmp/packet-tracer/',
        '/Library/Fonts/'
      ],
      correctIndex: 1,
      explanation: 'On macOS, Packet Tracer extensions reside inside the application bundle at Contents/extensions/.'
    }
  },

  'p3-item-5': {
    id: 'p3-item-5',
    title: 'End-to-End Verification via pt_bridge_status',
    phaseTitle: 'Phase 3: The Setup & Installation Blueprint (llms-install.md)',
    estimatedReadTime: '5 mins',
    difficulty: 'Beginner',
    overview: 'Verification is the final gate: calling the live pt_bridge_status tool to confirm bidirectional communication between the LLM and Cisco Packet Tracer.',
    mentalModelAnalogy: {
      title: 'Radio Check: 5 by 5',
      description: 'Like a pilot calling tower for a pre-flight radio check, calling pt_bridge_status confirms both sender and receiver are synchronized and ready to build.'
    },
    deepDiveSections: [
      {
        heading: 'The Verification Prompt & Expected Response',
        content: `Ask your AI coding assistant:`,
        codeSnippet: {
          language: 'markdown',
          title: 'Verification Prompt',
          code: `Check pt_bridge_status and confirm if Packet Tracer is connected.`
        }
      },
      {
        heading: 'Expected Success Output',
        content: `The tool must report:
• status: "connected"
• pt_version: "8.2.x"
• bridge_active: true`,
        codeSnippet: {
          language: 'json',
          title: 'Success Response Schema',
          code: `{\n  "status": "connected",\n  "version": "8.2.1.0118",\n  "bridge_active": true,\n  "devices_count": 0\n}`
        }
      }
    ],
    handsOnLab: {
      labTitle: 'Running Your First Verification',
      prerequisites: ['AI agent active', 'Packet Tracer running with extension approved'],
      steps: [
        'In your AI agent, type: "Run pt_bridge_status"',
        'Verify connected: true is returned'
      ],
      aiPrompt: 'Run pt_bridge_status tool now and print the bridge health report.',
      expectedOutcome: 'Confirmation that the bridge is live and connected.'
    },
    troubleshootingTips: [
      'If status is disconnected: verify Packet Tracer is running and the script module is enabled.'
    ],
    knowledgeQuiz: {
      question: 'What does a successful `pt_bridge_status` response indicate?',
      options: [
        'That your home Wi-Fi is connected',
        'That the Python MCP server and Cisco Packet Tracer QtScript module have established an active, authenticated IPC bridge',
        'That all CCNA exams have been passed',
        'That your hard drive has been backed up'
      ],
      correctIndex: 1,
      explanation: 'A successful status proves that the JSON-RPC channel and internal Packet Tracer engine are communicating flawlessly.'
    }
  },

  'p4-item-1': {
    id: 'p4-item-1',
    title: 'Lab 1 Topology Specification & Requirements',
    phaseTitle: 'Phase 4: Lab 1 — Basic LAN, Switch Provisioning & IP Addressing',
    estimatedReadTime: '8 mins',
    difficulty: 'Beginner',
    overview: 'Design a clean, reliable Layer 2 local area network connecting two workstations through a Cisco Catalyst 2960 switch on the 192.168.1.0/24 subnet.',
    mentalModelAnalogy: {
      title: 'The Local Intercom System',
      description: 'Two offices on the same floor want to speak to each other. The switch acts like a dedicated intercom patch-panel: each office plugs in their cable, dials the other room number, and speaks directly without going through the main building operator.'
    },
    deepDiveSections: [
      {
        heading: 'IP Addressing Plan & Port Allocations',
        content: `• Switch: Cisco Catalyst 2960-24TT (Hostname: SW1)
• Workstation 1: PC1 ➔ FastEthernet0/1 (IP: 192.168.1.10, Subnet: 255.255.255.0)
• Workstation 2: PC2 ➔ FastEthernet0/2 (IP: 192.168.1.20, Subnet: 255.255.255.0)
• Cable Type: Copper Straight-Through`
      }
    ],
    handsOnLab: {
      labTitle: 'Drafting the Lab 1 Topology Spec',
      prerequisites: ['Basic subnetting knowledge'],
      steps: [
        'Calculate network address: 192.168.1.0/24',
        'Identify broadcast address: 192.168.1.255',
        'Confirm PC1 and PC2 reside in the same broadcast domain'
      ],
      aiPrompt: 'Design an IP scheme for two PCs connected to a Cisco 2960 switch in 192.168.1.0/24.',
      expectedOutcome: 'Clear port allocation table ready for AI execution.'
    },
    troubleshootingTips: [
      'Ensure subnet masks match on both workstations to avoid communication failure.'
    ],
    knowledgeQuiz: {
      question: 'Which cable type is used to connect a PC Ethernet port to a switch FastEthernet port in standard Ethernet?',
      options: [
        'Console rollover cable',
        'Copper Straight-Through cable',
        'Serial DCE/DTE cable',
        'Coaxial cable'
      ],
      correctIndex: 1,
      explanation: 'Connecting different device types (PC to Switch) requires standard Copper Straight-Through cabling.'
    }
  },

  'p4-item-2': {
    id: 'p4-item-2',
    title: 'AI Prompt Execution: Build & Wire Topology',
    phaseTitle: 'Phase 4: Lab 1 — Basic LAN, Switch Provisioning & IP Addressing',
    estimatedReadTime: '9 mins',
    difficulty: 'Beginner',
    overview: 'Instruct the AI agent to instantiate the hardware, wire the cables, configure IP addresses, wait for Spanning Tree Protocol (STP) convergence, and run a ping test.',
    mentalModelAnalogy: {
      title: 'Watching the Blueprint Build Itself',
      description: 'You give the construction blueprint to your robot crew: within 5 seconds, the switch appears on the canvas, the workstations appear neatly aligned, cables snap into ports, and link lights turn green.'
    },
    deepDiveSections: [
      {
        heading: 'The Lab 1 Natural Language Execution Prompt',
        content: `Provide this exact prompt to your AI assistant:`,
        codeSnippet: {
          language: 'markdown',
          title: 'Lab 1 Execution Prompt',
          code: `Create a new Packet Tracer topology with a Cisco 2960 switch named SW1 and two PCs named PC1 and PC2. Connect PC1 to FastEthernet0/1 and PC2 to FastEthernet0/2. Configure PC1 with IP 192.168.1.10/24 and PC2 with 192.168.1.20/24. Then run a ping from PC1 to PC2 to verify reachability.`
        }
      },
      {
        heading: 'Behind the Scenes: STP Port States',
        content: `When cables connect to a Cisco switch, ports initially show **Amber** while transitioning through Spanning Tree states:
1. Blocking / Listening (15 seconds)
2. Learning (15 seconds)
3. Forwarding (**Green**, ready to pass data)
MCP-Packet-Tracer can call \`pt_fast_forward\` to bypass this 30-second delay instantly!`
      }
    ],
    handsOnLab: {
      labTitle: 'Building and Verifying Lab 1',
      prerequisites: ['Packet Tracer open and bridge connected'],
      steps: [
        'Execute the AI prompt',
        'Observe the devices appearing in Packet Tracer',
        'Confirm the ping reports 4/4 packets received (0% packet loss)'
      ],
      aiPrompt: 'Deploy Lab 1 to Packet Tracer and run a ping verification between PC1 and PC2.',
      expectedOutcome: 'Complete 2-PC switched network with verified ICMP echo reachability.'
    },
    troubleshootingTips: [
      'If the first ping packet drops (ARP resolution), the remaining 3 will succeed; this is normal ARP behavior in Ethernet.'
    ],
    knowledgeQuiz: {
      question: 'Why do switch ports show an amber light for ~30 seconds when first cabled?',
      options: [
        'The switch is running out of memory',
        'Spanning Tree Protocol (STP) is listening and learning to ensure no Layer 2 loops exist',
        'The cable is defective',
        'Packet Tracer is frozen'
      ],
      correctIndex: 1,
      explanation: 'Cisco switches run Spanning Tree Protocol (STP) on all access ports by default, waiting through listening and learning states before transitioning to forwarding.'
    }
  },

  'p5-item-1': {
    id: 'p5-item-1',
    title: 'VLAN Segmentation Architecture & Port Allocation',
    phaseTitle: 'Phase 5: Lab 2 — VLANs, 802.1Q Trunking & Inter-VLAN Routing',
    estimatedReadTime: '9 mins',
    difficulty: 'Intermediate',
    overview: 'Virtual Local Area Networks (VLANs) divide a single physical switch into multiple isolated broadcast domains, increasing security and reducing network congestion.',
    mentalModelAnalogy: {
      title: 'Soundproof Walls Inside One Office',
      description: 'Without VLANs, anyone shouting in the office is heard by everyone. A VLAN puts soundproof glass partitions between Sales and Engineering: even though they are on the same floor (switch), their broadcasts never leak across departments.'
    },
    deepDiveSections: [
      {
        heading: 'VLAN Segmentation Design',
        content: `• VLAN 10 (Sales): 192.168.10.0/24 (Gateway: 192.168.10.1)
• VLAN 20 (Engineering): 192.168.20.0/24 (Gateway: 192.168.20.1)
• Port Fa0/1: switchport mode access ➔ switchport access vlan 10
• Port Fa0/2: switchport mode access ➔ switchport access vlan 20
• Port Fa0/24: switchport mode trunk (carries both VLAN 10 & 20 tagged with 802.1Q headers)`
      }
    ],
    handsOnLab: {
      labTitle: 'Planning VLAN Port Assignments',
      prerequisites: ['Lab 1 completion'],
      steps: [
        'Identify which ports belong to Sales (VLAN 10)',
        'Identify which ports belong to Engineering (VLAN 20)',
        'Understand why PC-Sales cannot ping PC-Eng without a Layer 3 router'
      ],
      aiPrompt: 'Explain how 802.1Q VLAN tagging allows multiple VLANs to share a single trunk cable.',
      expectedOutcome: 'Understanding VLAN broadcast domain boundaries.'
    },
    troubleshootingTips: [
      'Forgetting to assign a port to a VLAN leaves it in default VLAN 1.'
    ],
    knowledgeQuiz: {
      question: 'What header tag does an 802.1Q trunk insert into an Ethernet frame to identify its VLAN?',
      options: [
        'A 32-bit (4-byte) 802.1Q tag containing the 12-bit VLAN ID',
        'A 64-bit encryption key',
        'An IP version 6 header',
        'A DNS record'
      ],
      correctIndex: 0,
      explanation: 'IEEE 802.1Q inserts a 4-byte header tag into standard Ethernet frames, containing a 12-bit VLAN Identifier (VID).'
    }
  },

  'p5-item-2': {
    id: 'p5-item-2',
    title: 'Router-on-a-Stick Sub-Interface Configuration',
    phaseTitle: 'Phase 5: Lab 2 — VLANs, 802.1Q Trunking & Inter-VLAN Routing',
    estimatedReadTime: '11 mins',
    difficulty: 'Intermediate',
    overview: 'To allow isolated VLANs to communicate securely, a router sub-interface architecture (Router-on-a-Stick) routes packets between VLANs using a single physical cable.',
    mentalModelAnalogy: {
      title: 'The Central Translator',
      description: 'Sales speaks French (VLAN 10), and Engineering speaks German (VLAN 20). When Sales needs to talk to Engineering, they send the letter to the central translator (the router). The translator reads the letter, verifies permission, translates, and delivers it to the Engineering department.'
    },
    deepDiveSections: [
      {
        heading: 'Cisco IOS Router-on-a-Stick CLI Commands',
        content: `Sub-interface configuration requires bringing up the physical interface without an IP, and configuring dot1Q sub-interfaces:`,
        codeSnippet: {
          language: 'text',
          title: 'Cisco IOS Router-on-a-Stick Configuration',
          code: `! On Router R1:\ninterface GigabitEthernet0/0/0\n no shutdown\n no ip address\n!\ninterface GigabitEthernet0/0/0.10\n encapsulation dot1Q 10\n ip address 192.168.10.1 255.255.255.0\n!\ninterface GigabitEthernet0/0/0.20\n encapsulation dot1Q 20\n ip address 192.168.20.1 255.255.255.0\n!`
        }
      }
    ],
    handsOnLab: {
      labTitle: 'Deploying Router-on-a-Stick with AI',
      prerequisites: ['Switch with VLAN 10 and 20 configured'],
      steps: [
        'Provide the full prompt to your AI assistant',
        'Watch the router and switch configure automatically',
        'Ping from PC-Sales (192.168.10.10) to PC-Eng (192.168.20.10)'
      ],
      aiPrompt: 'Set up an Inter-VLAN routing lab in Packet Tracer. Create Switch SW1 with VLAN 10 (Sales) on Fa0/1 and VLAN 20 (Engineering) on Fa0/2. Attach PC-Sales (192.168.10.10) and PC-Eng (192.168.20.10). Connect SW1 Fa0/24 to Router R1 Gig0/0 as an 802.1Q trunk. Configure sub-interfaces Gig0/0.10 and Gig0/0.20 on R1 as gateways. Verify cross-VLAN reachability via ping.',
      expectedOutcome: 'Successful cross-VLAN ping with packets traversing router sub-interfaces.'
    },
    troubleshootingTips: [
      'Always configure encapsulation dot1Q <vlan_id> BEFORE assigning the ip address on a sub-interface; Cisco IOS rejects the IP address otherwise.'
    ],
    knowledgeQuiz: {
      question: 'What happens if you configure an IP address on a Cisco router sub-interface without first entering the encapsulation dot1Q command?',
      options: [
        'The router crashes',
        'Cisco IOS rejects the command with an error: "Configuring IP routing on a LAN subinterface is only allowed if that subinterface is already configured as part of an 802.10, 802.1Q, or ISL vLAN"',
        'The router defaults to VLAN 100',
        'The switch turns off'
      ],
      correctIndex: 1,
      explanation: 'Cisco IOS requires the 802.1Q encapsulation framing to be declared before assigning Layer 3 IP addressing to a virtual sub-interface.'
    }
  },

  'p6-item-1': {
    id: 'p6-item-1',
    title: 'OSPF Topology Architecture & IP Subnet Planning',
    phaseTitle: 'Phase 6: Lab 3 — Enterprise Dynamic Routing (OSPF Area 0)',
    estimatedReadTime: '10 mins',
    difficulty: 'Advanced',
    overview: 'Open Shortest Path First (OSPF) is an open-standard link-state dynamic routing protocol widely used in enterprise networks. Plan a 3-router mesh topology with /30 point-to-point interconnects.',
    mentalModelAnalogy: {
      title: 'GPS Navigation for Network Packets',
      description: 'Static routing is like printing MapQuest directions: if a road is closed, you sit in traffic forever. OSPF is like Google Maps or Waze: every router shares a complete map of all roads (Link-State Advertisements). If one link is cut, OSPF recalculates the shortest detour around the roadblock in milliseconds.'
    },
    deepDiveSections: [
      {
        heading: 'The 3-Router Mesh IP Scheme',
        content: `• R1 ↔ R2 link: 10.0.12.0/30 (R1: 10.0.12.1, R2: 10.0.12.2, Wildcard: 0.0.0.3)
• R2 ↔ R3 link: 10.0.23.0/30 (R2: 10.0.23.1, R3: 10.0.23.2, Wildcard: 0.0.0.3)
• R3 ↔ R1 link: 10.0.31.0/30 (R3: 10.0.31.1, R1: 10.0.31.2, Wildcard: 0.0.0.3)
• OSPF Area 0: All links participate in backbone Area 0.`
      }
    ],
    handsOnLab: {
      labTitle: 'Calculating Wildcard Masks for OSPF',
      prerequisites: ['Subnetting and binary math basics'],
      steps: [
        'Understand wildcard mask = 255.255.255.255 minus Subnet Mask',
        'For /30 (255.255.255.252): 255.255.255.255 - 255.255.255.252 = 0.0.0.3',
        'For /24 (255.255.255.0): 255.255.255.255 - 255.255.255.0 = 0.0.0.255'
      ],
      aiPrompt: 'Calculate the wildcard masks for /28, /29, and /30 networks for Cisco OSPF network statements.',
      expectedOutcome: 'Accurate wildcard masks prepared for OSPF deployment.'
    },
    troubleshootingTips: [
      'Entering a subnet mask instead of a wildcard mask in older Cisco IOS commands produces syntax errors.'
    ],
    knowledgeQuiz: {
      question: 'What is the wildcard mask for a /30 subnet (255.255.255.252) in Cisco OSPF configuration?',
      options: [
        '0.0.0.255',
        '0.0.0.3',
        '255.255.255.0',
        '0.0.3.255'
      ],
      correctIndex: 1,
      explanation: 'A /30 subnet has 4 total IP addresses (3 wildcard bits), yielding wildcard mask 0.0.0.3.'
    }
  },

  'p6-item-2': {
    id: 'p6-item-2',
    title: 'AI Provisioning & OSPF Convergence Verification',
    phaseTitle: 'Phase 6: Lab 3 — Enterprise Dynamic Routing (OSPF Area 0)',
    estimatedReadTime: '12 mins',
    difficulty: 'Advanced',
    overview: 'Deploy the 3-router OSPF mesh topology, verify OSPF neighbor adjacency states, inspect routing tables for "O" routes, and simulate an automatic link failover reroute.',
    mentalModelAnalogy: {
      title: 'The Self-Healing Mesh',
      description: 'Packets normally travel directly from R1 to R2. If you pull the plug on the R1-R2 cable, OSPF detects the dead link within seconds and automatically re-routes packets via R3 with zero manual human reconfiguration.'
    },
    deepDiveSections: [
      {
        heading: 'Cisco IOS OSPF CLI Commands',
        content: `Configuration applied across all routers:`,
        codeSnippet: {
          language: 'text',
          title: 'Cisco IOS OSPF Area 0 Configuration',
          code: `! On Router R1:\nrouter ospf 1\n router-id 1.1.1.1\n network 10.0.12.0 0.0.0.3 area 0\n network 10.0.31.0 0.0.0.3 area 0\n network 192.168.1.0 0.0.0.255 area 0\n!`
        }
      },
      {
        heading: 'Verification Commands to Inspect',
        content: `• \`show ip ospf neighbor\`: Look for state **FULL/DR** or **FULL/BDR**
• \`show ip route ospf\`: Displays dynamically learned routes prefixed with **O**
• \`traceroute\`: Visualizes the multi-hop path across routers`
      }
    ],
    handsOnLab: {
      labTitle: 'Deploying and Testing OSPF Failover with AI',
      prerequisites: ['Packet Tracer bridge connected'],
      steps: [
        'Execute the OSPF agent prompt',
        'Verify show ip ospf neighbor shows FULL state',
        'Shut down interface Gig0/0/0 on R1 to simulate link failure',
        'Verify ping from PC1 to PC3 still succeeds via the detour path'
      ],
      aiPrompt: 'Build a 3-router OSPF mesh topology in Packet Tracer with routers R1, R2, R3. Link them in a triangle with /30 subnets: R1-R2 (10.0.12.0/30), R2-R3 (10.0.23.0/30), R3-R1 (10.0.31.0/30). Add LAN PC1 (192.168.1.0/24) on R1 and LAN PC3 (192.168.3.0/24) on R3. Enable OSPF area 0 across all interfaces. Show the routing table on R1 and verify PC1 can ping PC3.',
      expectedOutcome: 'Converged OSPF network with automated path failover redundancy.'
    },
    troubleshootingTips: [
      'OSPF neighbors will NOT form an adjacency if: Area IDs mismatch, Hello/Dead timers mismatch, or interfaces are on different subnets.'
    ],
    knowledgeQuiz: {
      question: 'Which neighbor adjacency state in OSPF indicates that routers have fully synchronized their Link-State Databases (LSDB)?',
      options: [
        'DOWN',
        'INIT',
        '2-WAY',
        'FULL'
      ],
      correctIndex: 3,
      explanation: 'The FULL state indicates that routers have completely exchanged LSAs and their Link-State Databases are identical.'
    }
  },

  'p7-item-1': {
    id: 'p7-item-1',
    title: 'Cisco IOS DHCP Server Configuration',
    phaseTitle: 'Phase 7: Lab 4 — Core Network Services & Security (DHCP, NAT, ACLs)',
    estimatedReadTime: '8 mins',
    difficulty: 'Intermediate',
    overview: 'Dynamic Host Configuration Protocol (DHCP) automatically provides IP addresses, subnet masks, default gateways, and DNS settings to client devices.',
    mentalModelAnalogy: {
      title: 'The Hotel Key Receptionist',
      description: 'Instead of assigning permanent room numbers to every visitor forever, the hotel receptionist hands out an available room key upon check-in, notes the lease expiration, and reclaims the key when the guest checks out.'
    },
    deepDiveSections: [
      {
        heading: 'Cisco IOS DHCP Pool Commands',
        content: `Excluding static infrastructure addresses and defining the pool:`,
        codeSnippet: {
          language: 'text',
          title: 'Cisco IOS DHCP Server Configuration',
          code: `! Exclude gateway and static server range:\nip dhcp excluded-address 192.168.1.1 192.168.1.10\n!\nip dhcp pool LAN_USERS\n network 192.168.1.0 255.255.255.0\n default-router 192.168.1.1\n dns-server 8.8.8.8\n domain-name enterprise.local\n!`
        }
      }
    ],
    handsOnLab: {
      labTitle: 'Verifying DHCP Leases',
      prerequisites: ['Router connected to switch and PCs'],
      steps: [
        'Apply DHCP pool on Router R1',
        'Set client PCs to DHCP radio button in Packet Tracer',
        'Confirm PCs receive 192.168.1.11 with gateway 192.168.1.1',
        'Run show ip dhcp binding on the router'
      ],
      aiPrompt: 'Configure a DHCP server on Cisco router R1 for 192.168.1.0/24 excluding .1 to .10 and verify PC1 receives an IP.',
      expectedOutcome: 'Client PC automatically leases an IP address within seconds.'
    },
    troubleshootingTips: [
      'If PCs receive an APIPA address (169.254.x.x), the DHCP discover packet is not reaching the DHCP server.'
    ],
    knowledgeQuiz: {
      question: 'What is the correct order of the 4 messages in the DHCP lease handshake (DORA)?',
      options: [
        'Deliver, Obtain, Return, Approve',
        'Discover, Offer, Request, Acknowledge',
        'Data, Order, Route, Address',
        'Device, Operation, Register, Accept'
      ],
      correctIndex: 1,
      explanation: 'The DHCP negotiation sequence is DORA: Discover (broadcast by client), Offer (unicast/broadcast by server), Request (client requests offered IP), Acknowledge (server confirms lease).'
    }
  },

  'p7-item-2': {
    id: 'p7-item-2',
    title: 'NAT / PAT (Port Address Translation / Overload)',
    phaseTitle: 'Phase 7: Lab 4 — Core Network Services & Security (DHCP, NAT, ACLs)',
    estimatedReadTime: '10 mins',
    difficulty: 'Advanced',
    overview: 'Network Address Translation (NAT) with Port Address Translation (PAT / Overload) allows hundreds of internal private IP addresses (RFC 1918) to share a single public IPv4 address to communicate across the Internet.',
    mentalModelAnalogy: {
      title: 'The Company Mailroom',
      description: 'Everyone in a 500-person building has an internal desk extension. When sending letters outside the company, the mailroom replaces the desk extension with the single public corporate street address and adds a unique tracking number (source port). When replies return, the mailroom routes the letter back to the correct desk.'
    },
    deepDiveSections: [
      {
        heading: 'Cisco IOS NAT Overload Configuration',
        content: `Three key components are required: inside interface, outside interface, and the overload statement:`,
        codeSnippet: {
          language: 'text',
          title: 'Cisco IOS NAT Overload (PAT) Commands',
          code: `! 1. Identify inside and outside interfaces:\ninterface GigabitEthernet0/0/0\n ip nat inside\n!\ninterface GigabitEthernet0/0/1\n ip nat outside\n!\n! 2. Standard ACL matching internal private subnet:\naccess-list 1 permit 192.168.1.0 0.0.0.255\n!\n! 3. NAT Overload statement:\nip nat inside source list 1 interface GigabitEthernet0/0/1 overload\n!`
        }
      }
    ],
    handsOnLab: {
      labTitle: 'Deploying NAT and Inspecting Translations',
      prerequisites: ['Edge router with internal LAN and external simulated Internet server'],
      steps: [
        'Configure NAT Overload on the edge router',
        'Send HTTP traffic or ping from internal PC to external server (203.0.113.2)',
        'Run show ip nat translations on router'
      ],
      aiPrompt: 'Configure NAT overload on router R1 so LAN 192.168.1.0/24 can access public server 203.0.113.2 via outside interface Gig0/0/1.',
      expectedOutcome: 'Active NAT translation table showing private IPs mapped to public IP with dynamic TCP/ICMP port numbers.'
    },
    troubleshootingTips: [
      'Missing ip nat inside or ip nat outside on an interface is the #1 reason NAT fails silently.'
    ],
    knowledgeQuiz: {
      question: 'What Cisco IOS command displays currently active address translations in memory?',
      options: [
        'show ip route',
        'show ip nat translations',
        'show mac address-table',
        'show interfaces status'
      ],
      correctIndex: 1,
      explanation: 'show ip nat translations reveals inside local, inside global, outside local, and outside global mappings.'
    }
  },

  'p7-item-3': {
    id: 'p7-item-3',
    title: 'Extended Access Control Lists (ACLs) & Security Filtering',
    phaseTitle: 'Phase 7: Lab 4 — Core Network Services & Security (DHCP, NAT, ACLs)',
    estimatedReadTime: '11 mins',
    difficulty: 'Advanced',
    overview: 'Extended Access Control Lists (ACLs) provide Layer 3 and Layer 4 packet filtering, allowing administrators to filter traffic by source IP, destination IP, and specific protocol ports (e.g. HTTP port 80, HTTPS port 443, ICMP).',
    mentalModelAnalogy: {
      title: 'The Security Guard with the Guest List',
      description: 'A standard ACL only checks your name tag (source IP). An extended ACL checks your name tag, where you are going (destination IP), and what equipment you are carrying (TCP port 80 vs ICMP ping). If you are carrying a ping hammer, entry is denied.'
    },
    deepDiveSections: [
      {
        heading: 'Extended ACL Syntax & Placement Rules',
        content: `Extended ACLs are numbered 100-199 or named, and should be placed **as close to the source as possible** to conserve network bandwidth:`,
        codeSnippet: {
          language: 'text',
          title: 'Cisco IOS Extended ACL Example',
          code: `! Extended ACL 101: Permit HTTP/HTTPS, Deny ICMP Ping, Permit all other IP:\naccess-list 101 permit tcp 192.168.1.0 0.0.0.255 host 203.0.113.2 eq 80\naccess-list 101 permit tcp 192.168.1.0 0.0.0.255 host 203.0.113.2 eq 443\naccess-list 101 deny icmp 192.168.1.0 0.0.0.255 host 203.0.113.2\naccess-list 101 permit ip any any\n!\n! Apply inbound on router LAN interface:\ninterface GigabitEthernet0/0/0\n ip access-group 101 in\n!`
        }
      }
    ],
    handsOnLab: {
      labTitle: 'Testing Firewall Rules with Web and Ping',
      prerequisites: ['Edge router with internal PC and public Web Server'],
      steps: [
        'Apply ACL 101 to interface Gig0/0/0 in',
        'Open PC Web Browser in Packet Tracer and navigate to http://203.0.113.2 (Success!)',
        'Open PC Command Prompt and ping 203.0.113.2 (Blocked: Destination Host Unreachable)',
        'Run show access-lists on router to inspect match counters'
      ],
      aiPrompt: 'Apply an extended ACL on router R1 allowing LAN PCs to browse http://203.0.113.2 but blocking ICMP pings.',
      expectedOutcome: 'HTTP browsing works; ping is dropped by ACL rule.'
    },
    troubleshootingTips: [
      'Remember the implicit deny any at the bottom of every Cisco ACL; if you do not add permit ip any any at the end, all non-matching traffic is blocked.'
    ],
    knowledgeQuiz: {
      question: 'Where should an Extended Access Control List generally be placed for best practice?',
      options: [
        'As close to the destination as possible',
        'As close to the source of traffic as possible to conserve network bandwidth',
        'On the switch access port',
        'On the DNS server'
      ],
      correctIndex: 1,
      explanation: 'Extended ACLs should be placed as close to the source as possible to drop unauthorized traffic before it wastes bandwidth traversing the network backbone.'
    }
  },

  'p8-item-1': {
    id: 'p8-item-1',
    title: 'Declarative "Network as Code" (NaC) Specifications',
    phaseTitle: 'Phase 8: NetDevOps CI/CD Integration — Network as Code (NaC)',
    estimatedReadTime: '9 mins',
    difficulty: 'Advanced',
    overview: 'Network as Code (NaC) applies software engineering best practices to network infrastructure: network topologies, VLAN allocations, and routing policies are defined declaratively in version-controlled YAML or JSON files.',
    mentalModelAnalogy: {
      title: 'The Blueprint Becomes the Reality',
      description: 'Instead of typing 50 commands on 10 switches, you commit a single network-spec.yaml file to Git. The Git repo is the single source of truth: any change is peer-reviewed, tested in CI, and deployed automatically.'
    },
    deepDiveSections: [
      {
        heading: 'Sample Declarative Network Schema',
        content: `A declarative specification describes *what* the network should look like, not *how* to configure it:`,
        codeSnippet: {
          language: 'yaml',
          title: 'network-spec.yaml Schema',
          code: `version: "1.0"\ntopology:\n  name: "branch-office-01"\n  devices:\n    - name: "SW-ACCESS-01"\n      model: "2960-24TT"\n      vlans:\n        - id: 10\n          name: "Sales"\n          ports: ["Fa0/1", "Fa0/2"]\n        - id: 20\n          name: "Engineering"\n          ports: ["Fa0/3", "Fa0/4"]\n    - name: "RTR-EDGE-01"\n      model: "2911"\n      interfaces:\n        - name: "Gig0/0.10"\n          ip: "192.168.10.1/24"\n        - name: "Gig0/0.20"\n          ip: "192.168.20.1/24"`
        }
      }
    ],
    handsOnLab: {
      labTitle: 'Creating a Declarative Network Spec',
      prerequisites: ['YAML syntax understanding'],
      steps: [
        'Draft your branch office network specification in YAML',
        'Validate the YAML syntax using online linters',
        'Commit the file to a Git repository'
      ],
      aiPrompt: 'Convert a 3-switch, 2-router campus network diagram into a declarative YAML specification.',
      expectedOutcome: 'Well-structured YAML file representing complete campus network topology.'
    },
    troubleshootingTips: [
      'YAML indentation errors can cause parsers to misinterpret port mappings.'
    ],
    knowledgeQuiz: {
      question: 'What is the primary benefit of version-controlling network topologies in Git?',
      options: [
        'Git makes cables transfer data faster',
        'Every change has an audit trail, peer reviews, automated CI test validation, and instant rollback capability',
        'Git eliminates the need for routers',
        'Git automatically pays for your internet service'
      ],
      correctIndex: 1,
      explanation: 'Network as Code in Git provides full auditability, peer-reviewed pull requests, automated CI testing, and fast rollbacks when an outage occurs.'
    }
  },

  'p8-item-2': {
    id: 'p8-item-2',
    title: 'Building a GitHub Actions Automated Network CI/CD Pipeline',
    phaseTitle: 'Phase 8: NetDevOps CI/CD Integration — Network as Code (NaC)',
    estimatedReadTime: '12 mins',
    difficulty: 'Advanced',
    overview: 'Connect Packet Tracer and MCP directly into a continuous integration pipeline. On every pull request, GitHub Actions launches a headless validation test, executes reachability matrices, and blocks pull requests if any connectivity test fails.',
    mentalModelAnalogy: {
      title: 'The Pre-Flight Simulation Test',
      description: 'NASA would never launch a spacecraft without testing flight code in a high-fidelity simulator first. A network CI/CD pipeline tests every firewall rule and OSPF route in a virtual simulation before permitting code to touch live production hardware.'
    },
    deepDiveSections: [
      {
        heading: 'The Complete GitHub Actions Workflow',
        content: `This pipeline checks out code, installs uv, validates the schema, and executes reachability testing:`,
        codeSnippet: {
          language: 'yaml',
          title: '.github/workflows/network-ci.yml',
          code: `name: Network Topology Automated CI Validation\n\non:\n  pull_request:\n    branches: [main]\n    paths:\n      - 'network/**'\n\njobs:\n  simulate-and-test:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout Repository\n        uses: actions/checkout@v4\n\n      - name: Install Astral uv\n        run: curl -LsSf https://astral.sh/uv/install.sh | sh\n\n      - name: Run Schema Linter\n        run: uv run python -m linter network/\n\n      - name: Execute MCP Packet Tracer Reachability Matrix\n        run: |\n          echo "Launching simulated validation test suite..."\n          uvx packet-tracer-mcp test --spec network/network-spec.yaml --fail-on-loss\n\n      - name: Publish Test Report\n        if: always()\n        uses: actions/upload-artifact@v4\n        with:\n          name: reachability-report\n          path: test-results/`
        }
      }
    ],
    handsOnLab: {
      labTitle: 'Building Your First NetDevOps CI/CD Pipeline',
      prerequisites: ['GitHub account', 'Repository with network-spec.yaml'],
      steps: [
        'Create .github/workflows/network-ci.yml in your repo',
        'Open a Pull Request modifying a firewall rule',
        'Watch GitHub Actions trigger and run simulation tests',
        'Confirm the green checkmark appears on the PR'
      ],
      aiPrompt: 'Explain how a NetDevOps CI/CD pipeline prevents production network outages caused by manual typing errors.',
      expectedOutcome: 'Automated GitHub Actions pipeline protecting network infrastructure from regression bugs.'
    },
    troubleshootingTips: [
      'Always set fail-on-loss flags in CI tests so that partial packet drops block merging.'
    ],
    knowledgeQuiz: {
      question: 'How does an automated CI/CD pipeline protect production networks from human error?',
      options: [
        'By preventing developers from using computers',
        'By automatically deploying changes in a virtual simulation lab, running reachability tests, and blocking merges if tests fail',
        'By disabling the router firewall',
        'By replacing all routers with switches'
      ],
      correctIndex: 1,
      explanation: 'Continuous Integration validates configurations against automated test assertions before changes are allowed into production, catching syntax and routing errors early.'
    }
  }
};
