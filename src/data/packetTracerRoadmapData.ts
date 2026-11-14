export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  keyConcepts: string[];
  actionSteps: string[];
  commandSnippets?: { label: string; command: string; language?: string }[];
  verificationCheck: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  summary: string;
  items: RoadmapItem[];
}

export const packetTracerRoadmapPhases: RoadmapPhase[] = [
  {
    id: 'phase-1-foundations',
    phaseNumber: 1,
    title: 'Phase 1: Foundations of AI-Driven NetDevOps & MCP',
    subtitle: 'Understanding the Model Context Protocol (MCP) and Packet Tracer Programmatic Control',
    icon: 'Compass',
    badge: 'Core Theory',
    summary: 'Master the paradigm shift from manual GUI drag-and-drop to declarative, LLM-powered network engineering through Anthropic’s open Model Context Protocol.',
    items: [
      {
        id: 'p1-item-1',
        title: 'Understand Model Context Protocol (MCP) Fundamentals',
        description: 'Learn what MCP is, why it was created, and how it enables AI assistants (Claude, Cursor, Codex, Antigravity) to securely interact with external tools, local processes, and desktop simulators.',
        estimatedTime: '45 mins',
        difficulty: 'Beginner',
        tags: ['MCP', 'AI Agents', 'Architecture', 'Protocol'],
        keyConcepts: [
          'Client-Server Architecture: AI Client (Host) ↔ MCP Server ↔ Local Application',
          'JSON-RPC 2.0 communication format and stdio/SSE transports',
          'Tool definitions, resource templates, and prompt context primitives',
          'Security boundaries: Local execution, user approval, and scoped system permissions'
        ],
        actionSteps: [
          'Read Anthropic’s open-source Model Context Protocol specification at modelcontextprotocol.io',
          'Understand how LLMs use tool calling to read state and invoke actions iteratively',
          'Compare traditional API calls vs. dynamic tool-calling loops in network engineering'
        ],
        verificationCheck: 'Explain the 3 primary components of an MCP system (Host Client, MCP Server, Bridge) and how a tool call request/response JSON payload is structured.'
      },
      {
        id: 'p1-item-2',
        title: 'Explore Cisco Packet Tracer Internal Architecture & Scripting',
        description: 'Examine Cisco Packet Tracer’s internal engine: QtScript / JavaScript environment, IPC mechanisms, Script Module APIs, and how external programs can drive network simulation.',
        estimatedTime: '60 mins',
        difficulty: 'Beginner',
        tags: ['Packet Tracer', 'Cisco', 'IPC', 'QtScript'],
        keyConcepts: [
          'Cisco Packet Tracer (v8.2+) architecture and process model',
          'Packet Tracer Script Modules (.pts) and Extensions menu hierarchy',
          'QtScript runtime environment embedded inside Packet Tracer',
          'Event loops, device objects, interface handles, and simulation tick engine'
        ],
        actionSteps: [
          'Install Cisco Packet Tracer 8.2 or 8.2.1 from Cisco Networking Academy (Skills for All)',
          'Open Packet Tracer and inspect Extensions ➔ Scripting ➔ Configure PT Script Modules',
          'Understand why automated script modules require explicit user authorization on first load'
        ],
        verificationCheck: 'Successfully launch Cisco Packet Tracer, verify version is 8.2+, and locate the Scripting configuration interface.'
      },
      {
        id: 'p1-item-3',
        title: 'The NetDevOps Evolution: CLI ➔ Python/Netmiko ➔ AI Agents',
        description: 'Contrast traditional network engineering with modern AI NetOps, demonstrating how natural language or CI/CD pipelines can generate error-free topologies in seconds.',
        estimatedTime: '30 mins',
        difficulty: 'Beginner',
        tags: ['NetDevOps', 'Automation', 'CI/CD', 'Evolution'],
        keyConcepts: [
          'Stage 1: Manual console cables & CLI configuration (error-prone, slow)',
          'Stage 2: Scripted automation via Python, Netmiko, Paramiko, and Ansible',
          'Stage 3: Declarative Network-as-Code (NaC) with Git version control',
          'Stage 4: Autonomous AI Agent orchestration with MCP validation'
        ],
        actionSteps: [
          'Review the pain points of human syntax errors in Subnetting, VLAN IDs, and OSPF Wildcard masks',
          'See how MCP transforms complex multi-switch configuration into a single validated instruction'
        ],
        verificationCheck: 'Articulate 3 major advantages of automated MCP network simulation over manual GUI topology drafting.'
      }
    ]
  },
  {
    id: 'phase-2-architecture',
    phaseNumber: 2,
    title: 'Phase 2: MCP-Packet-Tracer Deep-Dive Architecture',
    subtitle: 'Under-the-Hood: IPC Bridge, Session Tokens, and stdio Transport',
    icon: 'Layers',
    badge: 'Deep Architecture',
    summary: 'Deconstruct Mats2208/MCP-Packet-Tracer source code: understand how Python uvx and the MCP-Control-Center script bridge communicate with zero latency.',
    items: [
      {
        id: 'p2-item-1',
        title: 'The Dual-Component Bridge Architecture',
        description: 'Analyze how Mats2208/MCP-Packet-Tracer splits responsibility between the Python MCP Server and the QtScript MCP-Control-Center extension running inside Packet Tracer.',
        estimatedTime: '45 mins',
        difficulty: 'Intermediate',
        tags: ['Architecture', 'IPC', 'Python', 'QtScript'],
        keyConcepts: [
          'Component A: packet-tracer-mcp (Python package run via uvx) speaking stdio MCP to Claude/Cursor',
          'Component B: MCP-Control-Center.pts running inside Packet Tracer’s QtScript engine',
          'Local IPC Channel: High-performance loopback HTTP / file IPC bridge',
          'Command serialization: Translating LLM tool arguments into Packet Tracer native API calls'
        ],
        actionSteps: [
          'Examine the GitHub repo structure at Mats2208/MCP-Packet-Tracer',
          'Inspect adapters/mcp/tools/live.py and core/bridge.py',
          'Identify how commands are queued, executed in PT, and returned to the LLM'
        ],
        verificationCheck: 'Diagram the end-to-end data flow: User Prompt ➔ LLM Client ➔ stdio ➔ Python MCP Server ➔ IPC Bridge ➔ Packet Tracer QtScript ➔ Virtual Devices.'
      },
      {
        id: 'p2-item-2',
        title: 'Session Tokens & Bridge Security Model',
        description: 'Understand how the bridge secures the local communication channel to prevent rogue processes from tampering with the Packet Tracer simulation.',
        estimatedTime: '30 mins',
        difficulty: 'Intermediate',
        tags: ['Security', 'Tokens', 'Authentication', 'Localhost'],
        keyConcepts: [
          'Session Token Generation: Ephemeral secret generated upon script activation',
          'Token Handshake: MCP server validates identity before sending execution commands',
          'pt_bridge_status telemetry: Tracking connected state and rejection of unauthorized calls'
        ],
        actionSteps: [
          'Understand why the Script Module popup in Packet Tracer is essential for security',
          'Learn how restarting Packet Tracer generates a fresh bridge session token'
        ],
        verificationCheck: 'Describe what occurs if an MCP client attempts to send commands without a matching session token.'
      }
    ]
  },
  {
    id: 'phase-3-setup',
    phaseNumber: 3,
    title: 'Phase 3: The Setup & Installation Blueprint (llms-install.md)',
    subtitle: 'Master the Official Automated & Manual Installation Procedures',
    icon: 'Terminal',
    badge: 'Hands-On Setup',
    summary: 'Step-by-step walkthrough of https://github.com/Mats2208/MCP-Packet-Tracer/blob/main/llms-install.md, from Astral uv installation to full bridge verification.',
    items: [
      {
        id: 'p3-item-1',
        title: 'Install Astral uv & Python Runtime Toolchain',
        description: 'Install uv, the lightning-fast Python package installer and runner from Astral, required to execute packet-tracer-mcp seamlessly without virtualenv headache.',
        estimatedTime: '20 mins',
        difficulty: 'Beginner',
        tags: ['uv', 'Python', 'CLI', 'Toolchain'],
        keyConcepts: [
          'Why uv/uvx: Zero-setup ephemeral execution with pinned dependencies',
          'Python 3.10+ requirement for modern async socket & typing support',
          'Cross-platform installation paths (macOS Homebrew/curl, Linux sh, Windows PowerShell)'
        ],
        actionSteps: [
          'Check if uv is installed: run uv --version',
          'If missing on macOS/Linux, install via curl script: curl -LsSf https://astral.sh/uv/install.sh | sh',
          'On Windows, install via: powershell -c "irm https://astral.sh/uv/install.ps1 | iex"'
        ],
        commandSnippets: [
          {
            label: 'Install uv (macOS / Linux)',
            command: 'curl -LsSf https://astral.sh/uv/install.sh | sh',
            language: 'bash'
          },
          {
            label: 'Verify uv and uvx',
            command: 'uv --version && uvx --version',
            language: 'bash'
          }
        ],
        verificationCheck: 'Terminal outputs uv 0.4+ or newer and uvx is accessible in PATH.'
      },
      {
        id: 'p3-item-2',
        title: 'The One-Prompt Autonomous AI Setup (Recommended)',
        description: 'Execute the official prompt defined in llms-install.md by instructing your AI coding assistant to install and configure everything autonomously.',
        estimatedTime: '15 mins',
        difficulty: 'Beginner',
        tags: ['Claude Code', 'Cursor', 'Automation', 'One-Prompt'],
        keyConcepts: [
          'The exact prompt specified in llms-install.md',
          'Agent-driven environment discovery (detects OS, Packet Tracer paths, client config)',
          'Automated registration in claude_desktop_config.json or cursor mcp settings'
        ],
        actionSteps: [
          'Copy the official prompt below into Claude Code, Cursor, Codex, or Antigravity',
          'Let the agent run uvx packet-tracer-mcp install-skill and deploy the extension',
          'Watch the agent report the exact path where MCP-Control-Center.pts was placed'
        ],
        commandSnippets: [
          {
            label: 'The Official llms-install.md Prompt',
            command: 'Install the Packet Tracer MCP from https://github.com/Mats2208/MCP-Packet-Tracer and set everything up for me.',
            language: 'markdown'
          }
        ],
        verificationCheck: 'Agent completes setup and outputs: "Please restart Cisco Packet Tracer and click Yes on the script module dialog."'
      },
      {
        id: 'p3-item-3',
        title: 'Manual MCP Server & Skill Configuration',
        description: 'Configure the MCP client manually if preferred, including registration in Claude Desktop or Cursor configuration files and installing the domain skill.',
        estimatedTime: '25 mins',
        difficulty: 'Intermediate',
        tags: ['Configuration', 'JSON', 'MCP Client', 'Skill'],
        keyConcepts: [
          'Client config location: ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)',
          'Command for macOS/Linux: uvx packet-tracer-mcp --stdio',
          'Command for Windows (with UI control): uvx --from "packet-tracer-mcp[ui]" packet-tracer-mcp --stdio',
          'The Packet Tracer domain skill: uvx packet-tracer-mcp install-skill'
        ],
        actionSteps: [
          'Open your MCP configuration JSON file',
          'Add the packet-tracer server definition under mcpServers',
          'Run the skill installer command in your shell to give the LLM deep knowledge of Cisco hardware models and port syntax'
        ],
        commandSnippets: [
          {
            label: 'Install Packet Tracer LLM Skill',
            command: 'uvx packet-tracer-mcp install-skill',
            language: 'bash'
          },
          {
            label: 'claude_desktop_config.json (macOS / Linux)',
            command: '{\n  "mcpServers": {\n    "packet-tracer": {\n      "command": "uvx",\n      "args": ["packet-tracer-mcp", "--stdio"]\n    }\n  }\n}',
            language: 'json'
          },
          {
            label: 'Windows config (with UI extras)',
            command: '{\n  "mcpServers": {\n    "packet-tracer": {\n      "command": "uvx",\n      "args": ["--from", "packet-tracer-mcp[ui]", "packet-tracer-mcp", "--stdio"]\n    }\n  }\n}',
            language: 'json'
          }
        ],
        verificationCheck: 'Run uvx packet-tracer-mcp install-skill and confirm success message showing skill installed into ~/.claude/skills/packet-tracer.'
      },
      {
        id: 'p3-item-4',
        title: 'The Critical Manual Step: Packet Tracer Extension Authorization',
        description: 'Authorize the MCP-Control-Center script module inside Cisco Packet Tracer. This is the ONE step that cannot be fully automated for security reasons.',
        estimatedTime: '15 mins',
        difficulty: 'Beginner',
        tags: ['Packet Tracer', 'Authorization', 'Script Module', 'Security'],
        keyConcepts: [
          'Packet Tracer security sandbox: External scripts cannot run without explicit user approval',
          'Dialog trigger: "Detected a new script module... Enable?"',
          'Alternative manual path: Extensions ➔ Scripting ➔ Configure PT Script Modules'
        ],
        actionSteps: [
          'Completely quit Cisco Packet Tracer (ensure no background processes remain)',
          'Start Cisco Packet Tracer afresh',
          'When prompted: "Detected a new script module (MCP-Control-Center). Enable it?", click YES',
          'Ensure the MCP-Control-Center window or status indicator appears'
        ],
        verificationCheck: 'Packet Tracer runs without error dialogs, and the MCP-Control-Center extension shows status: "Listening / Ready".'
      },
      {
        id: 'p3-item-5',
        title: 'End-to-End Verification via pt_bridge_status',
        description: 'Restart your AI agent session and execute pt_bridge_status to confirm bidirectional communication between LLM and Cisco Packet Tracer.',
        estimatedTime: '10 mins',
        difficulty: 'Beginner',
        tags: ['Health Check', 'pt_bridge_status', 'Verification'],
        keyConcepts: [
          'pt_bridge_status tool purpose: Validates bridge health, token handshake, and PT version',
          'Success response schema: status="connected", pt_version="8.2.x", active_devices=0',
          'Troubleshooting disconnected status: PT not running, script dialog not accepted, or port blocked'
        ],
        actionSteps: [
          'Restart your AI coding agent session (to refresh loaded MCP tools)',
          'Ask the agent: "Check Packet Tracer bridge status using pt_bridge_status"',
          'Verify that the response returns connected: true'
        ],
        commandSnippets: [
          {
            label: 'Agent Prompt Verification',
            command: 'Check pt_bridge_status and report if Cisco Packet Tracer is connected.',
            language: 'markdown'
          }
        ],
        verificationCheck: 'pt_bridge_status outputs connected: true with active bridge session.'
      }
    ]
  },
  {
    id: 'phase-4-lab1',
    phaseNumber: 4,
    title: 'Phase 4: Lab 1 — Basic LAN, Switch Provisioning & IP Addressing',
    subtitle: 'Build Your First AI-Automated Local Area Network',
    icon: 'Network',
    badge: 'Hands-On Lab 1',
    summary: 'Instruct the AI to spawn a Cisco Catalyst 2960 switch, attach 2 PCs, assign IPv4 configurations, and perform automated ICMP connectivity verification.',
    items: [
      {
        id: 'p4-item-1',
        title: 'Lab 1 Topology Specification & Requirements',
        description: 'Define the declarative specification for a 2-PC switched Ethernet network with static IP addressing.',
        estimatedTime: '30 mins',
        difficulty: 'Beginner',
        tags: ['Lab', 'Switching', 'Cisco 2960', 'Ethernet'],
        keyConcepts: [
          'Device 1: Cisco Catalyst 2960-24TT Switch (named SW-ACCESS-01)',
          'Device 2: PC-01 (FastEthernet0, IP 192.168.1.10/24, Default Gateway 192.168.1.1)',
          'Device 3: PC-02 (FastEthernet0, IP 192.168.1.20/24, Default Gateway 192.168.1.1)',
          'Cabling: Straight-through copper cables connecting PC-01 ➔ Fa0/1 and PC-02 ➔ Fa0/2'
        ],
        actionSteps: [
          'Review the network topology diagram',
          'Note down the required port numbers and IP assignments',
          'Prepare the prompt for your AI assistant'
        ],
        verificationCheck: 'Have clear IP plan ready: PC-01 (192.168.1.10/24), PC-02 (192.168.1.20/24).'
      },
      {
        id: 'p4-item-2',
        title: 'AI Prompt Execution: Build & Wire Topology',
        description: 'Provide the natural language instructions to your AI agent and watch the topology appear in real time on your Cisco Packet Tracer canvas.',
        estimatedTime: '20 mins',
        difficulty: 'Beginner',
        tags: ['Prompting', 'Topology Creation', 'Real-time'],
        keyConcepts: [
          'MCP tool calls executed: add_device, connect_devices, set_device_position',
          'Coordinates management: AI positions devices neatly with appropriate canvas spacing',
          'Port state transitions: Amber (STP listening/learning) ➔ Green (forwarding)'
        ],
        actionSteps: [
          'In your AI agent, execute the prompt provided below',
          'Look at Cisco Packet Tracer: Watch the switch and PCs appear and cables link up',
          'Wait 30 seconds for Spanning Tree Protocol (STP) ports to turn green'
        ],
        commandSnippets: [
          {
            label: 'AI Agent Prompt for Lab 1',
            command: 'Create a new Packet Tracer topology with a Cisco 2960 switch named SW1 and two PCs named PC1 and PC2. Connect PC1 to FastEthernet0/1 and PC2 to FastEthernet0/2. Configure PC1 with IP 192.168.1.10/24 and PC2 with 192.168.1.20/24. Then run a ping from PC1 to PC2 to verify reachability.',
            language: 'markdown'
          }
        ],
        verificationCheck: 'Packet Tracer canvas shows SW1 with green link lights to PC1 and PC2; AI confirms successful ping (4/4 packets received, 0% loss).'
      }
    ]
  },
  {
    id: 'phase-5-lab2',
    phaseNumber: 5,
    title: 'Phase 5: Lab 2 — VLANs, 802.1Q Trunking & Inter-VLAN Routing',
    subtitle: 'Segmenting Broadcast Domains and Routing with Router-on-a-Stick',
    icon: 'Network',
    badge: 'Hands-On Lab 2',
    summary: 'Implement enterprise VLAN segmentation (VLAN 10 Sales & VLAN 20 Engineering), configure 802.1Q trunking on a Cisco 2960 switch, and route traffic using sub-interfaces on a Cisco 2911 router.',
    items: [
      {
        id: 'p5-item-1',
        title: 'VLAN Segmentation Architecture & Port Allocation',
        description: 'Architect two distinct broadcast domains on a single switch to enforce department isolation before enabling routed inter-communication.',
        estimatedTime: '40 mins',
        difficulty: 'Intermediate',
        tags: ['VLAN', '802.1Q', 'Trunking', 'Security'],
        keyConcepts: [
          'VLAN 10 (Sales): Subnet 192.168.10.0/24, Gateway 192.168.10.1',
          'VLAN 20 (Engineering): Subnet 192.168.20.0/24, Gateway 192.168.20.1',
          'Access Port assignment: switchport mode access, switchport access vlan X',
          'Trunk Port on Fa0/24: switchport mode trunk, carrying 802.1Q tags to the router'
        ],
        actionSteps: [
          'Understand why PC-Sales cannot ping PC-Eng directly across different VLANs',
          'Observe the 802.1Q tag insertion into Ethernet frames'
        ],
        verificationCheck: 'Verify that before router configuration, cross-VLAN pings fail (100% packet loss as expected by design).'
      },
      {
        id: 'p5-item-2',
        title: 'Router-on-a-Stick Sub-Interface Configuration',
        description: 'Configure Cisco IOS sub-interfaces on GigabitEthernet0/0/0 with 802.1Q encapsulation to route packets between VLAN 10 and VLAN 20.',
        estimatedTime: '45 mins',
        difficulty: 'Intermediate',
        tags: ['Cisco IOS', 'Inter-VLAN', 'Sub-interfaces', 'Routing'],
        keyConcepts: [
          'Physical interface Gig0/0/0: no shutdown, no IP address assigned',
          'Sub-interface Gig0/0/0.10: encapsulation dot1Q 10, ip address 192.168.10.1 255.255.255.0',
          'Sub-interface Gig0/0/0.20: encapsulation dot1Q 20, ip address 192.168.20.1 255.255.255.0',
          'Router routing table: Connected subnets and automatic routing'
        ],
        actionSteps: [
          'Provide the prompt to your AI agent to apply the switchport and router configs',
          'Ask the agent to dump running-config from both the switch and router to verify syntax',
          'Test inter-VLAN ping from PC-Sales (192.168.10.10) to PC-Eng (192.168.20.10)'
        ],
        commandSnippets: [
          {
            label: 'AI Agent Prompt for Inter-VLAN Routing Lab',
            command: 'Set up an Inter-VLAN routing lab in Packet Tracer. Create Switch SW1 with VLAN 10 (Sales) on Fa0/1 and VLAN 20 (Engineering) on Fa0/2. Attach PC-Sales (192.168.10.10) and PC-Eng (192.168.20.10). Connect SW1 Fa0/24 to Router R1 Gig0/0 as an 802.1Q trunk. Configure sub-interfaces Gig0/0.10 and Gig0/0.20 on R1 as gateways. Verify cross-VLAN reachability via ping.',
            language: 'markdown'
          }
        ],
        verificationCheck: 'Ping from PC-Sales (192.168.10.10) reaches PC-Eng (192.168.20.10) through Router R1.'
      }
    ]
  },
  {
    id: 'phase-6-lab3',
    phaseNumber: 6,
    title: 'Phase 6: Lab 3 — Enterprise Dynamic Routing (OSPF Area 0)',
    subtitle: 'Automated Multi-Router Topology with Dynamic Route Convergence',
    icon: 'Network',
    badge: 'Hands-On Lab 3',
    summary: 'Build a multi-router WAN topology with 3 Cisco routers, configure OSPF (Open Shortest Path First) single-area routing, verify neighbor adjacencies, and simulate link failover.',
    items: [
      {
        id: 'p6-item-1',
        title: 'OSPF Topology Architecture & IP Subnet Planning',
        description: 'Plan point-to-point /30 serial or gigabit interconnects and loopback interfaces for a triangle 3-router topology (R1, R2, R3).',
        estimatedTime: '45 mins',
        difficulty: 'Advanced',
        tags: ['OSPF', 'Dynamic Routing', 'Subnetting', 'WAN'],
        keyConcepts: [
          'Point-to-point link R1-R2: 10.0.12.0/30 (Wildcard 0.0.0.3)',
          'Point-to-point link R2-R3: 10.0.23.0/30 (Wildcard 0.0.0.3)',
          'Point-to-point link R3-R1: 10.0.31.0/30 (Wildcard 0.0.0.3)',
          'OSPF Process ID: router ospf 1',
          'OSPF Router ID: Unique 32-bit identifier (e.g. 1.1.1.1, 2.2.2.2, 3.3.3.3)',
          'Area 0: Backbone area requirement for single-area OSPF'
        ],
        actionSteps: [
          'Review the OSPF metric calculation (Cost = 10^8 / Bandwidth)',
          'Calculate wildcard masks for /30 and /24 networks'
        ],
        verificationCheck: 'Subnet allocations are non-overlapping and wildcard masks are accurately calculated.'
      },
      {
        id: 'p6-item-2',
        title: 'AI Provisioning & OSPF Convergence Verification',
        description: 'Command the AI to wire the routers, configure OSPF network statements, inspect neighbor states (show ip ospf neighbor), and test path convergence.',
        estimatedTime: '40 mins',
        difficulty: 'Advanced',
        tags: ['OSPF Adjacency', 'Convergence', 'Failover'],
        keyConcepts: [
          'OSPF Neighbor Adjacency States: DOWN ➔ INIT ➔ 2-WAY ➔ EXSTART ➔ EXCHANGE ➔ LOADING ➔ FULL',
          'Shortest Path First (Dijkstra algorithm) table population',
          'Simulated link failure: Shutting down R1-R2 and witnessing automatic re-route via R3'
        ],
        actionSteps: [
          'Execute the OSPF agent prompt below',
          'Ask the agent to run show ip route ospf and show ip ospf neighbor on R1',
          'Instruct the agent to shut down interface Gig0/0/0 on R1 and verify traffic reroutes through R3'
        ],
        commandSnippets: [
          {
            label: 'AI Agent Prompt for OSPF Lab',
            command: 'Build a 3-router OSPF mesh topology in Packet Tracer with routers R1, R2, R3. Link them in a triangle with /30 subnets: R1-R2 (10.0.12.0/30), R2-R3 (10.0.23.0/30), R3-R1 (10.0.31.0/30). Add LAN PC1 (192.168.1.0/24) on R1 and LAN PC3 (192.168.3.0/24) on R3. Enable OSPF area 0 across all interfaces. Show the routing table on R1 and verify PC1 can ping PC3.',
            language: 'markdown'
          }
        ],
        verificationCheck: 'All routers reach FULL adjacency state; show ip route reveals "O" routes; ping from PC1 to PC3 succeeds.'
      }
    ]
  },
  {
    id: 'phase-7-lab4',
    phaseNumber: 7,
    title: 'Phase 7: Lab 4 — Core Network Services & Security (DHCP, NAT, ACLs)',
    subtitle: 'Enterprise Perimeter: Address Leasing, Port Address Translation, and Firewalling',
    icon: 'Shield',
    badge: 'Hands-On Lab 4',
    summary: 'Configure enterprise-grade edge services: Cisco IOS DHCP pools for automated IP provisioning, Dynamic PAT (NAT Overload) for private-to-public address translation, and Extended ACLs to enforce traffic filtering.',
    items: [
      {
        id: 'p7-item-1',
        title: 'Cisco IOS DHCP Server Configuration',
        description: 'Configure an authoritative DHCP server on a Cisco router to dynamically distribute IPv4 addresses, subnet masks, default gateways, and DNS server settings.',
        estimatedTime: '35 mins',
        difficulty: 'Intermediate',
        tags: ['DHCP', 'IP Management', 'Services'],
        keyConcepts: [
          'ip dhcp excluded-address: Reserving static IPs for servers and gateway (e.g. .1 to .10)',
          'ip dhcp pool POOL_NAME: Defining network, default-router, and dns-server',
          'Client DORA process: Discover, Offer, Request, Acknowledge',
          'Verification: show ip dhcp binding on router'
        ],
        actionSteps: [
          'Instruct AI to configure DHCP pool on Router R1',
          'Set client PCs to DHCP mode in Packet Tracer',
          'Verify PCs receive IP addresses in the 192.168.1.11-254 range automatically'
        ],
        verificationCheck: 'Client PCs show DHCP success message and active lease in show ip dhcp binding.'
      },
      {
        id: 'p7-item-2',
        title: 'NAT / PAT (Port Address Translation / Overload)',
        description: 'Configure Dynamic NAT with overload to allow an entire private branch office (192.168.1.0/24) to share a single public IPv4 address to reach the simulated Internet.',
        estimatedTime: '45 mins',
        difficulty: 'Advanced',
        tags: ['NAT', 'PAT', 'Overload', 'Edge'],
        keyConcepts: [
          'Inside vs Outside interfaces: ip nat inside on LAN, ip nat outside on WAN',
          'Standard ACL matching private IP range: access-list 1 permit 192.168.1.0 0.0.0.255',
          'PAT command: ip nat inside source list 1 interface GigabitEthernet0/0/1 overload',
          'NAT Translation Table inspection: show ip nat translations'
        ],
        actionSteps: [
          'Add a simulated public Internet server (IP 203.0.113.10) to the topology',
          'Configure NAT Overload on the edge router',
          'Ping the public server from internal PC and examine the active NAT translations table'
        ],
        verificationCheck: 'show ip nat translations displays inside local IP mapped to outside global address with active TCP/ICMP port translations.'
      },
      {
        id: 'p7-item-3',
        title: 'Extended Access Control Lists (ACLs) & Security Filtering',
        description: 'Deploy Cisco Extended ACLs (numbered 100-199 or named) to permit web traffic (HTTP/HTTPS) while denying ICMP pings or unauthorized subnet access.',
        estimatedTime: '45 mins',
        difficulty: 'Advanced',
        tags: ['ACL', 'Firewall', 'Security', 'Filtering'],
        keyConcepts: [
          'Extended ACL rule structure: permit/deny protocol source [port] destination [port]',
          'Filtering by Layer 4 port: eq 80, eq 443, eq 22',
          'Directional application: ip access-group 101 in/out on router interface',
          'The implicit deny any rule at the end of every Cisco ACL'
        ],
        actionSteps: [
          'Apply an Extended ACL that permits HTTP to the web server but blocks ICMP pings',
          'Run a web browser GET request from PC to the server ➔ Success (HTTP 200 OK)',
          'Run a ping from PC to the server ➔ Blocked (Destination Host Unreachable)'
        ],
        commandSnippets: [
          {
            label: 'AI Agent Prompt for DHCP + NAT + ACL Lab',
            command: 'In Packet Tracer, configure edge router R1 with DHCP pool LAN_USERS (192.168.1.0/24, exclude .1-.10). Connect LAN PC to Fa0/1 and verify it gets DHCP. Connect R1 WAN interface Gig0/0/1 (203.0.113.1/30) to Public Web Server (203.0.113.2). Configure NAT Overload so LAN PC can browse the web server. Then apply an extended ACL denying ICMP from LAN to Web Server while permitting HTTP. Verify web browsing works but ping is blocked.',
            language: 'markdown'
          }
        ],
        verificationCheck: 'Web browser on PC loads server HTTP homepage; ICMP ping from PC to server is blocked by ACL.'
      }
    ]
  },
  {
    id: 'phase-8-cicd-netdevops',
    phaseNumber: 8,
    title: 'Phase 8: NetDevOps CI/CD Integration — Network as Code (NaC)',
    subtitle: 'Automated Topology Validation & Zero-Touch Deployment Pipelines',
    icon: 'Rocket',
    badge: 'CI/CD Capstone',
    summary: 'Bring it all together with CI/CD Masterclass! Treat network topologies as code in Git, run automated validation tests with MCP in a CI/CD pipeline, and prevent production outages.',
    items: [
      {
        id: 'p8-item-1',
        title: 'Declarative "Network as Code" (NaC) Specifications',
        description: 'Store network definitions in YAML or JSON files in a Git repository, allowing full version history, peer reviews, and rollback capability for network configurations.',
        estimatedTime: '45 mins',
        difficulty: 'Advanced',
        tags: ['Network as Code', 'Git', 'Declarative', 'IaC'],
        keyConcepts: [
          'Topology specification schema: devices, interfaces, subnets, routing protocols',
          'Git workflows for network engineers: Feature branch ➔ Pull Request ➔ Peer Review ➔ Main',
          'Preventing human configuration drift: The Git repo is the single source of truth'
        ],
        actionSteps: [
          'Draft a declarative network-spec.yaml for a branch office',
          'Commit the specification to a GitHub repository'
        ],
        verificationCheck: 'YAML file cleanly defines all devices, IP allocations, and OSPF configurations without syntax errors.'
      },
      {
        id: 'p8-item-2',
        title: 'Building a GitHub Actions Automated Network CI/CD Pipeline',
        description: 'Construct a GitHub Actions workflow that triggers on every pull request, invokes packet-tracer-mcp in a containerized environment, runs reachability tests, and reports pass/fail.',
        estimatedTime: '60 mins',
        difficulty: 'Advanced',
        tags: ['GitHub Actions', 'CI/CD', 'Automated Testing', 'Pipelines'],
        keyConcepts: [
          'CI Pipeline Stages: Checkout ➔ Linting ➔ Spin up Virtual Topology ➔ Execute Ping Matrix ➔ Security ACL Audit ➔ Report Status',
          'Automated regression testing: Ensuring a new firewall rule does not break existing database access',
          'Pull Request status checks: Merging is blocked if any reachability test fails'
        ],
        actionSteps: [
          'Create .github/workflows/network-validation.yml',
          'Define the test matrix verifying inter-VLAN reachability and ACL rules',
          'Observe the GitHub Action run green and attach the Packet Tracer simulation log to the PR'
        ],
        commandSnippets: [
          {
            label: 'GitHub Actions Workflow (.github/workflows/network-ci.yml)',
            command: 'name: NetDevOps Topology Validation\non: [pull_request]\n\njobs:\n  validate-network:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Install uv\n        run: curl -LsSf https://astral.sh/uv/install.sh | sh\n      - name: Validate Network Schema\n        run: uv run python validate_schema.py\n      - name: Run MCP Packet Tracer Automated Reachability Matrix\n        run: uvx packet-tracer-mcp test --spec network-spec.yaml\n      - name: Upload Test Artifacts\n        uses: actions/upload-artifact@v4\n        with:\n          name: reachability-report\n          path: test-results/',
            language: 'yaml'
          }
        ],
        verificationCheck: 'GitHub Actions workflow runs, passes all reachability test assertions, and marks PR checks green.'
      }
    ]
  }
];

export interface McpInteractiveDemo {
  id: string;
  name: string;
  description: string;
  tool: string;
  requestPayload: Record<string, any>;
  sampleResponse: Record<string, any>;
}

export const mcpInteractiveDemos: McpInteractiveDemo[] = [
  {
    id: 'demo-bridge-status',
    name: '1. pt_bridge_status (Bridge Health Check)',
    description: 'Queries the IPC bridge to ensure Cisco Packet Tracer is running, the script module is authorized, and the session token is valid.',
    tool: 'pt_bridge_status',
    requestPayload: {},
    sampleResponse: {
      status: 'connected',
      version: '8.2.1.0118',
      platform: 'darwin-arm64',
      session_id: 'pts_sess_9a8f21cd',
      script_module: 'MCP-Control-Center.pts',
      active_topology: {
        devices_count: 3,
        links_count: 2,
        simulation_running: true
      },
      bridge_latency_ms: 2.4
    }
  },
  {
    id: 'demo-add-device',
    name: '2. add_device (Provision Router/Switch)',
    description: 'Instantiates a new virtual Cisco device onto the canvas at specified (x, y) coordinates with custom hostname.',
    tool: 'add_device',
    requestPayload: {
      model: 'Cisco 2960-24TT',
      name: 'SW-CORE-01',
      x: 350,
      y: 220
    },
    sampleResponse: {
      success: true,
      device_id: 'dev_sw_01',
      name: 'SW-CORE-01',
      model: '2960-24TT',
      interfaces: [
        'FastEthernet0/1',
        'FastEthernet0/2',
        '...',
        'GigabitEthernet0/1',
        'GigabitEthernet0/2'
      ],
      power_state: 'ON'
    }
  },
  {
    id: 'demo-configure-interface',
    name: '3. configure_interface (Set IP & Subnet)',
    description: 'Applies IP address, subnet mask, and brings up the physical interface (no shutdown).',
    tool: 'configure_interface',
    requestPayload: {
      device: 'R1',
      interface: 'GigabitEthernet0/0/0',
      ip_address: '192.168.1.1',
      subnet_mask: '255.255.255.0',
      state: 'up'
    },
    sampleResponse: {
      success: true,
      device: 'R1',
      interface: 'GigabitEthernet0/0/0',
      line_protocol: 'UP',
      ip_assigned: '192.168.1.1/24',
      mtu: 1500
    }
  },
  {
    id: 'demo-ping-test',
    name: '4. test_reachability (ICMP Ping Matrix)',
    description: 'Triggers an automated ICMP ping test between two network nodes and returns packet delivery ratio and latency metrics.',
    tool: 'test_reachability',
    requestPayload: {
      source_device: 'PC-01',
      target_ip: '192.168.20.10',
      packet_count: 4,
      timeout_ms: 2000
    },
    sampleResponse: {
      success: true,
      source: 'PC-01 (192.168.10.10)',
      target: '192.168.20.10 (PC-02)',
      packets_transmitted: 4,
      packets_received: 4,
      packet_loss_percent: 0.0,
      rtt_min_ms: 1.8,
      rtt_avg_ms: 2.3,
      rtt_max_ms: 3.1,
      route_path: ['192.168.10.1 (R1)', '192.168.20.10 (PC-02)']
    }
  }
];
