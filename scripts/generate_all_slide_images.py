import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs("public/slides", exist_ok=True)

W, H = 1200, 800

def draw_base_card(title, subtitle, category, badge_color=(37, 99, 235)):
    img = Image.new('RGB', (W, H), color=(255, 255, 255))
    d = ImageDraw.Draw(img)

    # Soft subtle background
    for y in range(H):
        r = int(248 + (255 - 248) * (y / H))
        g = int(250 + (255 - 250) * (y / H))
        b = int(252 + (255 - 252) * (y / H))
        d.line([(0, y), (W, y)], fill=(r, g, b))

    # Outer border
    d.rounded_rectangle([(24, 24), (W-24, H-24)], radius=24, outline=(226, 232, 240), width=4, fill=(255, 255, 255))

    # Top Header Banner
    d.rounded_rectangle([(44, 44), (W-44, 120)], radius=16, fill=(241, 245, 249), outline=(203, 213, 225), width=2)
    
    # Category pill
    d.rounded_rectangle([(64, 58), (260, 94)], radius=10, fill=badge_color)
    d.text((80, 68), category.upper(), fill=(255, 255, 255))
    
    # Title in banner
    d.text((280, 66), title, fill=(15, 23, 42))

    return img, d

slides_configs = [
    {
        "id": 1,
        "title": "What is CI/CD? The Automated Assembly Line",
        "category": "Architecture Overview",
        "color": (37, 99, 235),
        "draw": "pipeline_flow",
        "steps": [
            ("1. Git Commit", "Code Pushed", (37, 99, 235)),
            ("2. Webhook", "Event Triggered", (14, 165, 233)),
            ("3. CI Build & Test", "Unit + Security", (16, 185, 129)),
            ("4. Docker Package", "Immutable Image", (139, 92, 246)),
            ("5. Cloud Deploy", "Live on AWS/Cloud", (245, 158, 11))
        ],
        "footer_badge": "Outcome: Zero manual SSH, automated validation under 5 minutes"
    },
    {
        "id": 2,
        "title": "Why CI/CD Exists: The Pre-CI/CD Nightmare",
        "category": "History & Problem",
        "color": (225, 29, 72),
        "draw": "comparison_split",
        "left_title": "❌ The Old Way: 'Integration Hell'",
        "left_items": ["• 6-Month Big Bang Releases", "• 10,000-line Merge Conflicts", "• 'Works on my machine!'", "• Manual FTP & SSH 2 AM deployments", "• Catastrophic outages on launch day"],
        "right_title": "✅ The CI/CD Way: Continuous Flow",
        "right_items": ["• Small daily atomic commits", "• Automated test suites catch bugs in 2 mins", "• Identical containerized environments", "• 1-Click zero-downtime releases", "• Instant automated rollbacks if errors spike"],
        "footer_badge": "Eliminates human error and replaces panic with repeatable automation"
    },
    {
        "id": 3,
        "title": "Invention of CI: Grady Booch & Kent Beck (1991-1999)",
        "category": "Pioneers & Origins",
        "color": (79, 70, 229),
        "draw": "timeline",
        "milestones": [
            ("1991: Grady Booch", "The Booch Method", "First defined Continuous Integration: merging changes regularly rather than at project end.", (59, 130, 246)),
            ("1999: Kent Beck", "Extreme Programming (XP)", "Mandated integrating code multiple times daily with automated unit testing.", (16, 185, 129)),
            ("2000s: The Paradigm Shift", "From Theory to Practice", "Integration transformed from a dreaded phase into a continuous automated habit.", (245, 158, 11))
        ],
        "footer_badge": "Kent Beck: 'If it hurts, do it more often to bring the pain forward.'"
    },
    {
        "id": 4,
        "title": "Martin Fowler & CruiseControl: Automated CI (2001-2006)",
        "category": "Automated Engines",
        "color": (13, 148, 136),
        "draw": "engine_flow",
        "milestones": [
            ("2001: CruiseControl", "First Open Source CI Server", "ThoughtWorks engineers built a daemon that continuously polled CVS/SVN repositories.", (13, 148, 136)),
            ("2006: Fowler's Paper", "'Continuous Integration'", "The definitive paper defining the 10 core principles of automated integration.", (37, 99, 235)),
            ("The Red/Green Rule", "Stop the Line Culture", "If the build breaks, fixing it is the top priority for the entire engineering team.", (225, 29, 72))
        ],
        "footer_badge": "Martin Fowler: 'Continuous Integration doesn't get rid of bugs, it gets rid of hiding places.'"
    },
    {
        "id": 5,
        "title": "Invention of Continuous Delivery: Humble & Farley (2010)",
        "category": "Continuous Delivery",
        "color": (217, 119, 6),
        "draw": "delivery_book",
        "milestones": [
            ("2010: The Definitive Book", "Jez Humble & David Farley", "Published 'Continuous Delivery': Building reliable software releases through automation.", (217, 119, 6)),
            ("The Deployment Pipeline", "Commit to Production", "Every change proves its fitness for release through a series of automated verification gates.", (37, 99, 235)),
            ("Deployment as a Non-Event", "Routine & Predictable", "Transforming high-stress releases into boring, routine, everyday occurrences.", (16, 185, 129))
        ],
        "footer_badge": "Jez Humble: 'Our goal is to make software deployments boring and routine.'"
    },
    {
        "id": 6,
        "title": "Continuous Integration (CI) Core Mechanism",
        "category": "Core Engineering",
        "color": (37, 99, 235),
        "draw": "pipeline_flow",
        "steps": [
            ("1. Git Commit", "Branch to Main", (37, 99, 235)),
            ("2. Static Lint", "ESLint / Sonar", (14, 165, 233)),
            ("3. Clean Build", "Compile Source", (139, 92, 246)),
            ("4. Unit Tests", "Jest / PyTest", (16, 185, 129)),
            ("5. Artifact Stored", "Versioned Binary", (245, 158, 11))
        ],
        "footer_badge": "Fast Feedback Rule: Total CI pipeline execution must finish in under 10 minutes"
    },
    {
        "id": 7,
        "title": "Continuous Delivery vs. Continuous Deployment",
        "category": "Release Spectrum",
        "color": (124, 58, 237),
        "draw": "comparison_split",
        "left_title": "🚀 Continuous Delivery",
        "left_items": ["• Code is ALWAYS in a deployable state", "• Passes all tests & staging dry-runs", "• Requires MANUAL business approval button", "• Ideal for: Banking, Healthcare, Enterprise B2B", "• Human checks compliance, release notes, audit"],
        "right_title": "⚡ Continuous Deployment",
        "right_items": ["• 100% Fully Automated end-to-end", "• Passing tests trigger direct cloud rollout", "• ZERO human intervention required", "• Ideal for: SaaS microservices, web apps, consumer", "• Relies on canary metrics & auto-rollback"],
        "footer_badge": "Difference is purely the final human sign-off gate vs. autonomous delivery"
    },
    {
        "id": 8,
        "title": "What is DevOps? Breaking the Dev vs. Ops Silo",
        "category": "Culture & Tooling",
        "color": (5, 150, 105),
        "draw": "comparison_split",
        "left_title": "🧱 The Old 'Wall of Confusion'",
        "left_items": ["• Developers rewarded for velocity & changes", "• Operations rewarded for system stability", "• Dev throws code over the wall to Ops", "• Ops blamed when unvetted code crashes server", "• Finger-pointing and siloed friction"],
        "right_title": "🤝 The DevOps Unified Culture",
        "right_items": ["• Shared responsibility for code AND uptime", "• 'You build it, you run it' (Werner Vogels)", "• Infrastructure as Code (Terraform, YAML)", "• Joint post-mortems without finger pointing", "• Cross-functional autonomous teams"],
        "footer_badge": "DevOps = Development + Operations united through empathy, metrics, and automation"
    },
    {
        "id": 9,
        "title": "How DevOps Works: The Infinity Loop ♾️ & CAMS",
        "category": "DevOps Framework",
        "color": (37, 99, 235),
        "draw": "cams_grid",
        "pillars": [
            ("C - CULTURE", "Shared trust, blameless reviews, psychological safety", (37, 99, 235)),
            ("A - AUTOMATION", "Eliminate repetitive manual toil with CI/CD & IaC", (16, 185, 129)),
            ("M - MEASUREMENT", "DORA metrics: Lead Time, Deploy Frequency, MTTR, CFR", (245, 158, 11)),
            ("S - SHARING", "Cross-pollination of knowledge and transparent documentation", (139, 92, 246))
        ],
        "footer_badge": "The Continuous Feedback Loop: Plan ➔ Code ➔ Build ➔ Test ➔ Release ➔ Deploy ➔ Operate ➔ Monitor"
    },
    {
        "id": 10,
        "title": "The Origin of Git: Linus Torvalds (2005)",
        "category": "Version Control",
        "color": (249, 115, 22),
        "draw": "timeline",
        "milestones": [
            ("April 2005: The Crisis", "BitKeeper Revocation", "Proprietary VCS BitKeeper revoked free Linux license; development halted.", (225, 29, 72)),
            ("7 Days of Coding", "Linus Writes Git", "Linus Torvalds coded Git in just one week, based on snapshot DAGs, not delta diffs.", (249, 115, 22)),
            ("Distributed Architecture", "Every Clone is a Repo", "Every developer has full repository history locally, enabling blazing fast offline commits.", (16, 185, 129))
        ],
        "footer_badge": "Git revolutionized version control by treating code as immutable cryptographic content trees"
    },
    {
        "id": 11,
        "title": "How GitHub Came to Be (2008)",
        "category": "Social Coding",
        "color": (15, 23, 42),
        "draw": "timeline",
        "milestones": [
            ("February 2008: Founders", "Wanstrath, Hyett, Preston-Werner", "Founded GitHub to make sharing Git repositories as easy as sharing web links.", (15, 23, 42)),
            ("The Pull Request", "Revolution of Collaboration", "Transformed open-source from emailed patch files to interactive web code reviews.", (37, 99, 235)),
            ("2018: Microsoft Acquisition", "Global Home of 100M+ Devs", "Microsoft acquires GitHub for $7.5B; launches GitHub Actions to integrate CI/CD natively.", (5, 150, 105))
        ],
        "footer_badge": "GitHub turned Git from a geeky CLI tool into the global social network for developers"
    },
    {
        "id": 12,
        "title": "Evolution of CI/CD: From Jenkins to GitHub Actions",
        "category": "Tooling History",
        "color": (14, 165, 233),
        "draw": "timeline",
        "milestones": [
            ("2005-2011: Hudson / Jenkins", "The Self-Hosted Workhorse", "Java-based Jenkins dominated with plugins, but required manual server maintenance & patch upgrades.", (14, 165, 233)),
            ("2011-2018: Travis CI & CircleCI", "The Cloud-Hosted Era", "Pioneered repository `.travis.yml` files and containerized cloud runners with zero server setup.", (139, 92, 246)),
            ("2019-Present: GitHub Actions", "Native Workflow Automation", "Native CI/CD inside GitHub repos with reusable marketplace actions and matrix parallel runners.", (16, 185, 129))
        ],
        "footer_badge": "Shifted CI/CD from managing dedicated server infrastructure to code-defined cloud workflows"
    },
    {
        "id": 13,
        "title": "How GitHub Actions Works: Under the Hood",
        "category": "GitHub Actions",
        "color": (37, 99, 235),
        "draw": "actions_arch",
        "components": [
            ("1. Event Trigger", "git push / pull_request / schedule / workflow_dispatch", (37, 99, 235)),
            ("2. GitHub Runner", "Ephemeral fresh VM (Ubuntu, macOS, Windows) spun up in seconds", (14, 165, 233)),
            ("3. Jobs (Parallel)", "Independent job containers running concurrently across runner pool", (139, 92, 246)),
            ("4. Steps (Sequential)", "Check out repo ➔ Set up Node/Python ➔ Run tests ➔ Build artifact", (16, 185, 129))
        ],
        "footer_badge": "Ephemeral Security: Every job runs inside an isolated clean virtual machine that is destroyed after use"
    },
    {
        "id": 14,
        "title": "Anatomy of a GitHub Actions YAML Workflow",
        "category": "YAML Anatomy",
        "color": (99, 102, 241),
        "draw": "yaml_breakdown",
        "sections": [
            ("name: CI Pipeline", "Human readable workflow name displayed in PR checks", (99, 102, 241)),
            ("on: [push, pull_request]", "Webhooks that wake up the pipeline on branch activity", (14, 165, 233)),
            ("jobs: build_and_test:", "Define distinct tasks like lint, unit-test, and deploy", (139, 92, 246)),
            ("runs-on: ubuntu-latest", "Target execution environment VM provided by GitHub", (16, 185, 129)),
            ("steps: - uses: & run:", "Reusable marketplace actions (`actions/checkout@v4`) and bash commands", (245, 158, 11))
        ],
        "footer_badge": "Store workflows in `.github/workflows/*.yml` — version controlled alongside your application code"
    },
    {
        "id": 15,
        "title": "Docker in CI/CD: The Standard Shipping Container",
        "category": "Containerization",
        "color": (2, 132, 199),
        "draw": "pipeline_flow",
        "steps": [
            ("1. Dockerfile", "Blueprint Recipe", (2, 132, 199)),
            ("2. docker build", "Compile Layers", (37, 99, 235)),
            ("3. Image Tagging", "Git SHA / Semantic", (139, 92, 246)),
            ("4. Container Registry", "Push to ECR / GHCR", (16, 185, 129)),
            ("5. Cloud Run", "Identical Runtime", (245, 158, 11))
        ],
        "footer_badge": "The Golden Rule: 'Build Once, Deploy Anywhere' — exact same binary runs in Staging & Production"
    },
    {
        "id": 16,
        "title": "Automated Testing & DevSecOps Quality Gates",
        "category": "Quality & Security",
        "color": (5, 150, 105),
        "draw": "cams_grid",
        "pillars": [
            ("UNIT TESTS (70%)", "Fast, isolated logic checks (Jest/Pytest). Runs in <30 seconds.", (5, 150, 105)),
            ("INTEGRATION (20%)", "Database, API, and service boundary tests. Runs in 2-5 minutes.", (37, 99, 235)),
            ("E2E TESTS (10%)", "Full browser simulation with Playwright / Cypress. Runs in staging.", (245, 158, 11)),
            ("DEVSECOPS SCANS", "Snyk, Trivy, CodeQL scan for leaked secrets and vulnerable dependencies.", (225, 29, 72))
        ],
        "footer_badge": "Shift-Left Security: Detect vulnerabilities on developer pull request before code ever leaves branch"
    },
    {
        "id": 17,
        "title": "Multi-Environment Parity: Dev, Staging & Prod",
        "category": "Environments",
        "color": (139, 92, 246),
        "draw": "pipeline_flow",
        "steps": [
            ("1. Local Dev", "Laptop Testing", (100, 116, 139)),
            ("2. PR Preview", "Ephemeral Branch URL", (14, 165, 233)),
            ("3. CI Pipeline", "Automated Gates", (37, 99, 235)),
            ("4. Staging Clone", "Production Mirror", (139, 92, 246)),
            ("5. Production", "Live Traffic & Users", (16, 185, 129))
        ],
        "footer_badge": "Parity Rule: Staging must replicate production OS, database version, and network topology exactly"
    },
    {
        "id": 18,
        "title": "Deployment Strategies: Blue-Green & Canary",
        "category": "Deploy Strategies",
        "color": (217, 119, 6),
        "draw": "comparison_split",
        "left_title": "🟢/🔵 Blue-Green Deployment",
        "left_items": ["• Two identical production clusters: Blue & Green", "• Blue is live; Green deploys new release v2", "• Automated smoke tests run on Green in private", "• Load Balancer flips 100% traffic to Green in 1 second", "• Zero downtime; instant 1-second rollback if needed"],
        "right_title": "🐥 Canary Deployment",
        "right_items": ["• Route 5% traffic to new release v2 (canary)", "• Monitor HTTP 500 error rates & latency metrics", "• If healthy, auto-ramp to 25% ➔ 50% ➔ 100%", "• If errors spike > 1%, instantly route 100% back to v1", "• Limits blast radius so only few users see bugs"],
        "footer_badge": "Zero Downtime Deployments: Users never experience 503 maintenance screens during updates"
    },
    {
        "id": 19,
        "title": "Demo: Deploying a Simple Website with CI/CD",
        "category": "Hands-On Demo",
        "color": (16, 185, 129),
        "draw": "pipeline_flow",
        "steps": [
            ("1. Code Website", "index.html & script.js", (16, 185, 129)),
            ("2. git push", "Push to GitHub", (37, 99, 235)),
            ("3. Action Runs", "Checkout & Build", (139, 92, 246)),
            ("4. CDN Deploy", "Cloudflare / AWS S3", (245, 158, 11)),
            ("5. Live in 45s", "https://your-app.com", (5, 150, 105))
        ],
        "footer_badge": "Hands-On Demo: From git commit to live global CDN in under 45 seconds with zero server management"
    },
    {
        "id": 20,
        "title": "SRE Observability: The Production Feedback Loop",
        "category": "Monitoring & SRE",
        "color": (37, 99, 235),
        "draw": "cams_grid",
        "pillars": [
            ("APM METRICS", "Datadog / Prometheus: Latency, CPU, Memory, 99th Percentile.", (37, 99, 235)),
            ("STRUCTURED LOGS", "Winston / JSON logs centralized into Elasticsearch / CloudWatch.", (14, 165, 233)),
            ("ERROR TRACKING", "Sentry alerts instantly on uncaught JavaScript & API exceptions.", (225, 29, 72)),
            ("AUTO-ROLLBACK", "If 5xx errors breach 1% threshold, CI/CD automatically redeploys previous SHA.", (16, 185, 129))
        ],
        "footer_badge": "The Pipeline Never Ends: Deployment is just the beginning of the continuous feedback loop (200 OK)"
    }
]

for cfg in slides_configs:
    img, d = draw_base_card(cfg["title"], "", cfg["category"], cfg["color"])
    
    # Draw different layout styles based on configuration
    if cfg["draw"] == "pipeline_flow":
        steps = cfg["steps"]
        num = len(steps)
        box_w = int((W - 140 - (num - 1) * 30) / num)
        box_h = 240
        start_x = 70
        y = 220
        
        for idx, (head, sub, col) in enumerate(steps):
            bx = start_x + idx * (box_w + 30)
            d.rounded_rectangle([(bx, y), (bx + box_w, y + box_h)], radius=18, fill=(255, 255, 255), outline=col, width=4)
            d.rectangle([(bx, y), (bx + box_w, y + 55)], fill=col)
            d.text((bx + 16, y + 18), head, fill=(255, 255, 255))
            
            # Inner details
            d.rounded_rectangle([(bx + 16, y + 75), (bx + box_w - 16, y + 150)], radius=12, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
            d.text((bx + 26, y + 100), sub, fill=(51, 65, 85))
            
            d.text((bx + 26, y + 180), f"STATUS: OK ✓", fill=(16, 185, 129))
            
            if idx < num - 1:
                ax = bx + box_w + 6
                d.line([(ax, y + 120), (ax + 18, y + 120)], fill=(148, 163, 184), width=6)
                # Arrowhead
                d.polygon([(ax + 18, y + 110), (ax + 26, y + 120), (ax + 18, y + 130)], fill=(148, 163, 184))

    elif cfg["draw"] == "comparison_split":
        # Two large cards side by side
        card_w = (W - 160) // 2
        y = 160
        card_h = 450

        # Left Card
        d.rounded_rectangle([(70, y), (70 + card_w, y + card_h)], radius=20, fill=(255, 241, 242), outline=(244, 63, 94), width=3)
        d.rectangle([(70, y), (70 + card_w, y + 60)], fill=(225, 29, 72))
        d.text((90, y + 18), cfg["left_title"], fill=(255, 255, 255))
        item_y = y + 90
        for item in cfg["left_items"]:
            d.text((95, item_y), item, fill=(30, 41, 59))
            item_y += 50

        # Right Card
        rx = 70 + card_w + 20
        d.rounded_rectangle([(rx, y), (rx + card_w, y + card_h)], radius=20, fill=(240, 253, 244), outline=(34, 197, 94), width=3)
        d.rectangle([(rx, y), (rx + card_w, y + 60)], fill=(22, 163, 74))
        d.text((rx + 20, y + 18), cfg["right_title"], fill=(255, 255, 255))
        item_y = y + 90
        for item in cfg["right_items"]:
            d.text((rx + 25, item_y), item, fill=(30, 41, 59))
            item_y += 50

    elif cfg["draw"] in ["timeline", "engine_flow", "delivery_book"]:
        y = 160
        milestones = cfg["milestones"]
        card_w = W - 140
        card_h = 130
        for idx, (year, subhead, desc, col) in enumerate(milestones):
            cy = y + idx * (card_h + 25)
            d.rounded_rectangle([(70, cy), (70 + card_w, cy + card_h)], radius=18, fill=(255, 255, 255), outline=col, width=3)
            
            # Left year pill
            d.rounded_rectangle([(90, cy + 25), (320, cy + 85)], radius=14, fill=col)
            d.text((110, cy + 45), year, fill=(255, 255, 255))
            
            # Middle title & desc
            d.text((350, cy + 28), subhead, fill=(15, 23, 42))
            d.text((350, cy + 65), desc, fill=(71, 85, 105))

    elif cfg["draw"] == "cams_grid":
        pillars = cfg["pillars"]
        gw = (W - 170) // 2
        gh = 190
        coords = [
            (70, 160),
            (70 + gw + 30, 160),
            (70, 160 + gh + 25),
            (70 + gw + 30, 160 + gh + 25)
        ]
        for idx, (title, desc, col) in enumerate(pillars):
            gx, gy = coords[idx]
            d.rounded_rectangle([(gx, gy), (gx + gw, gy + gh)], radius=18, fill=(255, 255, 255), outline=col, width=3)
            d.rectangle([(gx, gy), (gx + gw, gy + 48)], fill=col)
            d.text((gx + 20, gy + 14), title, fill=(255, 255, 255))
            d.text((gx + 20, gy + 75), desc, fill=(51, 65, 85))

    elif cfg["draw"] == "actions_arch":
        components = cfg["components"]
        y = 150
        ch = 100
        for idx, (title, desc, col) in enumerate(components):
            cy = y + idx * (ch + 20)
            d.rounded_rectangle([(70, cy), (W - 70, cy + ch)], radius=16, fill=(255, 255, 255), outline=col, width=3)
            d.rectangle([(70, cy), (320, cy + ch)], fill=col)
            d.text((90, cy + 36), title, fill=(255, 255, 255))
            d.text((345, cy + 36), desc, fill=(30, 41, 59))

    elif cfg["draw"] == "yaml_breakdown":
        sections = cfg["sections"]
        y = 150
        sh = 80
        for idx, (title, desc, col) in enumerate(sections):
            sy = y + idx * (sh + 16)
            d.rounded_rectangle([(70, sy), (W - 70, sy + sh)], radius=14, fill=(248, 250, 252), outline=col, width=2)
            d.rounded_rectangle([(85, sy + 14), (380, sy + sh - 14)], radius=8, fill=col)
            d.text((100, sy + 28), title, fill=(255, 255, 255))
            d.text((405, sy + 28), desc, fill=(51, 65, 85))

    # Bottom summary footer badge
    d.rounded_rectangle([(70, H - 95), (W - 70, H - 45)], radius=12, fill=(241, 245, 249), outline=(203, 213, 225), width=2)
    d.text((95, H - 75), f"💡 {cfg['footer_badge']}", fill=(30, 41, 59))

    out_path = f"public/slides/slide_{cfg['id']}.png"
    img.save(out_path)
    print(f"Generated {out_path}")

print("All 20 slide illustrations generated successfully!")
