#!/usr/bin/env python3
"""
Generate ultra-clear, high-resolution slide diagram images with large TrueType fonts,
vibrant modern aesthetics, and razor-sharp readability for 1080p/4K presentation displays.
"""

import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs("public/slides", exist_ok=True)

# 1600x1000 High-Resolution Canvas
W, H = 1600, 1000

# TrueType Fonts
FONT_BOLD_PATH = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG_PATH = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BLACK_PATH = "/System/Library/Fonts/Supplemental/Arial Black.ttf"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        try:
            return ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", size)
        except Exception:
            return ImageFont.load_default()

font_title = get_font(FONT_BLACK_PATH, 34)
font_cat = get_font(FONT_BOLD_PATH, 22)
font_head = get_font(FONT_BOLD_PATH, 26)
font_sub = get_font(FONT_BOLD_PATH, 22)
font_body = get_font(FONT_REG_PATH, 21)
font_body_bold = get_font(FONT_BOLD_PATH, 22)
font_badge = get_font(FONT_BOLD_PATH, 20)
font_footer = get_font(FONT_BOLD_PATH, 22)

def draw_wrapped_text(d, text, x, y, max_width, font, fill, line_spacing=8):
    words = text.split()
    lines = []
    current_line = []
    for word in words:
        test_line = ' '.join(current_line + [word])
        bbox = d.textbbox((0, 0), test_line, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
                current_line = [word]
            else:
                lines.append(word)
                current_line = []
    if current_line:
        lines.append(' '.join(current_line))
    
    curr_y = y
    for line in lines:
        d.text((x, curr_y), line, font=font, fill=fill)
        bbox = d.textbbox((0, 0), line, font=font)
        curr_y += (bbox[3] - bbox[1]) + line_spacing
    return curr_y

def draw_base_card(title, category, badge_color=(37, 99, 235)):
    img = Image.new('RGB', (W, H), color=(255, 255, 255))
    d = ImageDraw.Draw(img)

    # Clean gradient background
    for y in range(H):
        r = int(248 + (255 - 248) * (y / H))
        g = int(250 + (255 - 250) * (y / H))
        b = int(252 + (255 - 252) * (y / H))
        d.line([(0, y), (W, y)], fill=(r, g, b))

    # Outer border
    d.rounded_rectangle([(20, 20), (W - 20, H - 20)], radius=24, outline=(226, 232, 240), width=4, fill=(255, 255, 255))

    # Top Header Banner
    d.rounded_rectangle([(40, 36), (W - 40, 126)], radius=18, fill=(241, 245, 249), outline=(203, 213, 225), width=2)
    
    # Category pill
    cat_text = category.upper()
    cat_bbox = d.textbbox((0, 0), cat_text, font=font_cat)
    cat_w = cat_bbox[2] - cat_bbox[0] + 36
    d.rounded_rectangle([(56, 52), (56 + cat_w, 110)], radius=12, fill=badge_color)
    d.text((74, 66), cat_text, fill=(255, 255, 255), font=font_cat)
    
    # Title in banner
    d.text((56 + cat_w + 24, 62), title, fill=(15, 23, 42), font=font_title)

    return img, d

slides_configs = [
    {
        "id": 1,
        "title": "CI/CD Pipeline: The Automated Assembly Line",
        "category": "Architecture Overview",
        "color": (37, 99, 235),
        "draw": "pipeline_flow",
        "steps": [
            ("1. Git Commit", "Code Pushed", "Branch: main", (37, 99, 235)),
            ("2. Webhook", "Event Triggered", "Automated Wakeup", (14, 165, 233)),
            ("3. CI Test Gate", "Jest & PyTest", "Zero Bugs Allowed", (16, 185, 129)),
            ("4. Docker Build", "Immutable Image", "Tagged with SHA", (139, 92, 246)),
            ("5. Cloud Deploy", "AWS / Global CDN", "Live (200 OK)", (245, 158, 11))
        ],
        "footer_badge": "Continuous Feedback: Code to Production in Under 5 Minutes with Zero Manual SSH"
    },
    {
        "id": 2,
        "title": "Why CI/CD Exists: The Pre-CI/CD Nightmare",
        "category": "History & Problem",
        "color": (225, 29, 72),
        "draw": "comparison_split",
        "left_title": "[OLD WAY] Manual 'Integration Hell'",
        "left_items": [
            "• 6-Month Big Bang Releases (High Risk)",
            "• 10,000-Line Terrifying Merge Conflicts",
            "• 'Works On My Machine!' Production Crashes",
            "• 2:00 AM SSH & FTP Manual Deployments",
            "• Catastrophic Outages on Launch Day"
        ],
        "right_title": "[CI/CD] Automated Continuous Flow",
        "right_items": [
            "• Small Atomic Commits Multiple Times Daily",
            "• Automated Test Suites Catch Bugs in < 5 Mins",
            "• Identical Docker Containers in Every Environment",
            "• 1-Click Zero-Downtime Safe Deployments",
            "• Instant 10-Second Automated Rollbacks"
        ],
        "footer_badge": "Eliminates Human Error & Replaces Production Panic with Repeatable Automation"
    },
    {
        "id": 3,
        "title": "Invention of CI: Grady Booch & Kent Beck (1991-1999)",
        "category": "Pioneers & Origins",
        "color": (79, 70, 229),
        "draw": "timeline",
        "milestones": [
            ("1991: Grady Booch", "The Booch Method Concept", "First proposed Continuous Integration: merging changes regularly rather than waiting until the end.", (59, 130, 246)),
            ("1999: Kent Beck", "Extreme Programming (XP)", "Mandated integrating code multiple times daily with automated unit testing suites.", (16, 185, 129)),
            ("2000s: Cultural Shift", "From Theory to Standard", "Integration transformed from a dreaded 3-month phase into an effortless daily routine.", (245, 158, 11))
        ],
        "footer_badge": "Kent Beck: 'If it hurts, do it more often to bring the pain forward.'"
    },
    {
        "id": 4,
        "title": "CruiseControl & Martin Fowler: Automated CI (2001-2006)",
        "category": "Automated Engines",
        "color": (13, 148, 136),
        "draw": "timeline",
        "milestones": [
            ("2001: CruiseControl", "First Open-Source CI Daemon", "ThoughtWorks engineers automated scheduled builds by constantly polling SVN/CVS repos.", (13, 148, 136)),
            ("2006: Fowler's Paper", "'Continuous Integration'", "The definitive paper defining the 10 foundational rules of automated software integration.", (37, 99, 235)),
            ("The Red/Green Rule", "Stop the Line Culture", "If the build fails, fixing it is the immediate top priority for the entire development team.", (225, 29, 72))
        ],
        "footer_badge": "Martin Fowler: 'Continuous Integration doesn't get rid of bugs, it gets rid of hiding places.'"
    },
    {
        "id": 5,
        "title": "Continuous Delivery Invention: Humble & Farley (2010)",
        "category": "Continuous Delivery",
        "color": (217, 119, 6),
        "draw": "timeline",
        "milestones": [
            ("2010: The Definitive Book", "Jez Humble & David Farley", "Published 'Continuous Delivery': Building reliable software releases through automation.", (217, 119, 6)),
            ("The Deployment Pipeline", "Commit to Production Gates", "Every code commit proves its fitness for release through automated verification gates.", (37, 99, 235)),
            ("Routine Deployments", "Deployments as a Non-Event", "Transforming high-stress releases into boring, predictable, everyday occurrences.", (16, 185, 129))
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
            ("1. Git Commit", "Branch to Main", "Small Atomic Push", (37, 99, 235)),
            ("2. Static Lint", "ESLint / Sonar", "Enforce Standards", (14, 165, 233)),
            ("3. Clean Build", "Compile Source", "Fresh Node/Python", (139, 92, 246)),
            ("4. Unit Tests", "Jest / PyTest", "100% Core Passes", (16, 185, 129)),
            ("5. Binary Stored", "Versioned Artifact", "Ready for Delivery", (245, 158, 11))
        ],
        "footer_badge": "Fast Feedback Rule: Total CI pipeline execution must finish in under 10 minutes"
    },
    {
        "id": 7,
        "title": "Continuous Delivery vs. Continuous Deployment",
        "category": "Release Spectrum",
        "color": (124, 58, 237),
        "draw": "comparison_split",
        "left_title": "🚀 Continuous Delivery (CDel)",
        "left_items": [
            "• Code is ALWAYS in a 100% deployable state",
            "• Passes all automated tests & staging dry-runs",
            "• Requires a MANUAL business approval click",
            "• Ideal for: Banking, Healthcare, Enterprise B2B",
            "• Human signs off compliance, release notes, & audit"
        ],
        "right_title": "⚡ Continuous Deployment (CDep)",
        "right_items": [
            "• 100% Fully Automated end-to-end pipeline",
            "• Passing test gates trigger direct cloud rollout",
            "• ZERO human intervention required",
            "• Ideal for: SaaS microservices, consumer web apps",
            "• Relies on canary metrics & automated rollbacks"
        ],
        "footer_badge": "Key Distinction: Manual Business Sign-Off Gate vs. 100% Autonomous Rollout"
    },
    {
        "id": 8,
        "title": "What is DevOps? Breaking the Dev vs. Ops Silo",
        "category": "Culture & Tooling",
        "color": (5, 150, 105),
        "draw": "comparison_split",
        "left_title": "[OLD] The 'Wall of Confusion'",
        "left_items": [
            "• Developers rewarded for speed & frequent changes",
            "• Operations rewarded for system stability & uptime",
            "• Dev throws untested code over the wall to Ops",
            "• Ops blamed when unvetted code crashes server",
            "• Finger-pointing, siloed friction, and blame games"
        ],
        "right_title": "[DEVOPS] The Unified Culture",
        "right_items": [
            "• Shared responsibility for code AND production uptime",
            "• 'You build it, you run it' (Werner Vogels, Amazon)",
            "• Infrastructure as Code (Terraform, Docker, YAML)",
            "• Blameless post-mortems with continuous learning",
            "• Cross-functional high-velocity engineering teams"
        ],
        "footer_badge": "DevOps = Development + Operations united through empathy, metrics, and automation"
    },
    {
        "id": 9,
        "title": "How DevOps Works: The CAMS Framework",
        "category": "DevOps Framework",
        "color": (37, 99, 235),
        "draw": "cams_grid",
        "pillars": [
            ("C - CULTURE", "Shared trust, blameless reviews, psychological safety across teams", (37, 99, 235)),
            ("A - AUTOMATION", "Eliminate repetitive manual toil with CI/CD, Docker & Terraform", (16, 185, 129)),
            ("M - MEASUREMENT", "DORA Metrics: Lead Time, Deploy Frequency, MTTR, Change Failure Rate", (245, 158, 11)),
            ("S - SHARING", "Cross-pollination of knowledge and transparent documentation", (139, 92, 246))
        ],
        "footer_badge": "Continuous Feedback Loop: Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor"
    },
    {
        "id": 10,
        "title": "The Origin of Git: Linus Torvalds (2005)",
        "category": "Version Control",
        "color": (249, 115, 22),
        "draw": "timeline",
        "milestones": [
            ("April 2005: The Crisis", "BitKeeper Revocation", "Proprietary VCS BitKeeper revoked free Linux license; kernel development halted.", (225, 29, 72)),
            ("7 Days of Coding", "Linus Writes Git", "Linus Torvalds coded Git in just one week based on snapshot DAGs, not delta diffs.", (249, 115, 22)),
            ("Distributed Architecture", "Every Clone is a Full Repo", "Every developer has full repository history locally, enabling blazing fast offline commits.", (16, 185, 129))
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
            ("2008: The Founders", "Wanstrath, Hyett, Preston-Werner", "Founded GitHub to make sharing Git repositories as easy as sharing web links.", (15, 23, 42)),
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
            ("1. Event Trigger", "git push, pull_request, schedule, workflow_dispatch waking up pipeline", (37, 99, 235)),
            ("2. GitHub Runner", "Ephemeral fresh VM (Ubuntu, macOS, Windows) spun up in seconds", (14, 165, 233)),
            ("3. Jobs (Parallel)", "Independent job containers running concurrently across runner pool", (139, 92, 246)),
            ("4. Steps (Sequential)", "Check out repo -> Set up Node/Python -> Run tests -> Build artifact", (16, 185, 129))
        ],
        "footer_badge": "Ephemeral Security: Every job runs inside an isolated clean virtual machine that is destroyed after use"
    },
    {
        "id": 14,
        "title": "Anatomy of a GitHub Actions YAML Workflow",
        "category": "YAML Anatomy",
        "color": (99, 102, 241),
        "draw": "actions_arch",
        "components": [
            ("name: CI Pipeline", "Human readable workflow name displayed in PR check status", (99, 102, 241)),
            ("on: [push, pull_request]", "Webhooks that wake up the pipeline on branch activity", (14, 165, 233)),
            ("jobs: build_and_test:", "Define distinct tasks like lint, unit-test, and cloud deployment", (139, 92, 246)),
            ("runs-on: ubuntu-latest", "Target execution environment VM provided on-demand by GitHub", (16, 185, 129))
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
            ("1. Dockerfile", "Blueprint Recipe", "App + OS Dependencies", (2, 132, 199)),
            ("2. docker build", "Compile Layers", "Cached Deterministic", (37, 99, 235)),
            ("3. Image Tagging", "Git SHA / SemVer", "Immutable Version", (139, 92, 246)),
            ("4. Registry Push", "ECR / GHCR", "Secure Cloud Storage", (16, 185, 129)),
            ("5. Cloud Run", "Identical Runtime", "Zero Environment Drift", (245, 158, 11))
        ],
        "footer_badge": "The Golden Rule: 'Build Once, Deploy Anywhere' — exact same binary runs in Staging & Production"
    },
    {
        "id": 16,
        "title": "Deploying to AWS: GitHub Actions to Amazon Cloud",
        "category": "AWS Cloud Architecture",
        "color": (245, 158, 11),
        "draw": "pipeline_flow",
        "steps": [
            ("1. GitHub Actions", "OIDC Keyless Auth", "IAM Role Assumed", (37, 99, 235)),
            ("2. Amazon ECR", "Container Registry", "Private Image Tag", (245, 158, 11)),
            ("3. Amazon ECS", "Fargate Tasks", "Serverless Cluster", (139, 92, 246)),
            ("4. AWS ALB", "Load Balancer", "Zero-Downtime Live", (16, 185, 129)),
            ("5. CloudWatch", "Telemetry & Alarms", "Auto-Rollback OK", (225, 29, 72))
        ],
        "footer_badge": "AWS Production Architecture: GitHub Actions OIDC -> Amazon ECR -> Amazon ECS Fargate -> ALB Live (200 OK)"
    },
    {
        "id": 17,
        "title": "Security & Governance: DevSecOps & AWS OIDC",
        "category": "Security & Governance",
        "color": (225, 29, 72),
        "draw": "cams_grid",
        "pillars": [
            ("AWS OIDC AUTH", "Never store permanent AWS access keys. Use short-lived OIDC tokens.", (245, 158, 11)),
            ("DEVSECOPS SCANS", "Trivy & Snyk scan Docker images for CVEs before pushing to Amazon ECR.", (37, 99, 235)),
            ("BRANCH RULES", "Require passing CI tests & senior PR review before merging to main.", (16, 185, 129)),
            ("SECRET ENCRYPTION", "Store AWS Role ARNs and secrets in GitHub Encrypted Secrets.", (139, 92, 246))
        ],
        "footer_badge": "DevSecOps Rule: Security is automated into every gate — catch vulnerabilities before cloud deployment"
    },
    {
        "id": 18,
        "title": "Deployment Strategies: Blue-Green & Canary",
        "category": "Deploy Strategies",
        "color": (217, 119, 6),
        "draw": "comparison_split",
        "left_title": "🟢/🔵 Blue-Green Deployment",
        "left_items": [
            "• Two identical production clusters: Blue & Green",
            "• Blue serves live users; Green receives new v2",
            "• Automated smoke tests run on Green in private",
            "• Router flips 100% traffic to Green in 1 second",
            "• Zero downtime; instant 1-second rollback to Blue"
        ],
        "right_title": "🐥 Canary Deployment",
        "right_items": [
            "• Route 5% traffic to new release v2 (canary)",
            "• Monitor HTTP 500 error rates & latency metrics",
            "• If healthy, auto-ramp to 25% -> 50% -> 100%",
            "• If errors spike > 1%, instantly route 100% back",
            "• Limits blast radius so only a tiny fraction of users see bugs"
        ],
        "footer_badge": "Zero Downtime Deployments: Users never experience 503 maintenance screens during updates"
    },
    {
        "id": 19,
        "title": "Real-World Project: Food Ordering App on AWS",
        "category": "End-to-End Hands-On",
        "color": (16, 185, 129),
        "draw": "pipeline_flow",
        "steps": [
            ("1. Git Commit", "FastAPI Python App", "Commit: feat/burger-api", (37, 99, 235)),
            ("2. GitHub CI", "PyTest & Security", "100% Quality Pass", (14, 165, 233)),
            ("3. Docker Build", "Multi-stage Image", "Minimal 45MB Image", (139, 92, 246)),
            ("4. Push to ECR", "Amazon ECR Registry", "Secure AWS Storage", (245, 158, 11)),
            ("5. Live on ECS", "Amazon ECS Fargate", "Zero-Downtime Live [OK]", (16, 185, 129))
        ],
        "footer_badge": "Full Project Delivery: Code push to live high-availability AWS Cloud in under 4 minutes"
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
    },
    {
        "id": 21,
        "title": "Thank You & Q&A: Open Questions & Discussion",
        "category": "Conclusion & Mentorship",
        "color": (16, 185, 129),
        "draw": "cams_grid",
        "pillars": [
            ("1. CI/CD & AUTOMATION", "Ask anything on GitHub Actions, workflows, triggers, artifacts, and multi-stage pipelines.", (37, 99, 235)),
            ("2. DOCKER & CONTAINERS", "Ask anything on containerization, Alpine vs full images, caching layers, and registries.", (14, 165, 233)),
            ("3. AWS CLOUD & ECS", "Ask anything on ECS Fargate, ECR, task definitions, load balancers, and zero downtime.", (245, 158, 11)),
            ("4. CAREER & ORIVIANLABS", "Transitioning into DevOps & PM, building cloud projects, and joining OrivianLabs fellowships.", (16, 185, 129))
        ],
        "footer_badge": "Thank You for Attending! The floor is open for any questions, architecture discussions, or hands-on reviews."
    }
]

for cfg in slides_configs:
    img, d = draw_base_card(cfg["title"], cfg["category"], cfg["color"])
    
    # 1. PIPELINE FLOW (Slides 1, 6, 15, 17, 19)
    if cfg["draw"] == "pipeline_flow":
        steps = cfg["steps"]
        num = len(steps)
        gap = 32
        total_gaps = (num - 1) * gap
        avail_w = W - 100 - total_gaps
        box_w = int(avail_w / num)
        box_h = 480
        start_x = 50
        y = 200
        
        for idx, step_data in enumerate(steps):
            head = step_data[0]
            sub1 = step_data[1]
            sub2 = step_data[2]
            col = step_data[3]
            bx = start_x + idx * (box_w + gap)
            
            # Step card shadow & body
            d.rounded_rectangle([(bx + 4, y + 4), (bx + box_w + 4, y + box_h + 4)], radius=22, fill=(226, 232, 240))
            d.rounded_rectangle([(bx, y), (bx + box_w, y + box_h)], radius=22, fill=(255, 255, 255), outline=col, width=4)
            
            # Header pill
            d.rounded_rectangle([(bx, y), (bx + box_w, y + 95)], radius=20, fill=col)
            # Clip bottom corners of header
            d.rectangle([(bx, y + 60), (bx + box_w, y + 95)], fill=col)
            
            # Header text (centered or padded)
            d.text((bx + 18, y + 30), head, fill=(255, 255, 255), font=font_head)
            
            # Detail Box 1
            d.rounded_rectangle([(bx + 16, y + 120), (bx + box_w - 16, y + 215)], radius=16, fill=(248, 250, 252), outline=(203, 213, 225), width=2)
            d.text((bx + 26, y + 140), "ACTION:", fill=(100, 116, 139), font=font_badge)
            d.text((bx + 26, y + 170), sub1, fill=(15, 23, 42), font=font_sub)
            
            # Detail Box 2
            d.rounded_rectangle([(bx + 16, y + 235), (bx + box_w - 16, y + 330)], radius=16, fill=(248, 250, 252), outline=(203, 213, 225), width=2)
            d.text((bx + 26, y + 255), "TARGET:", fill=(100, 116, 139), font=font_badge)
            d.text((bx + 26, y + 285), sub2, fill=(30, 41, 59), font=font_sub)
            
            # Green Verified Badge
            d.rounded_rectangle([(bx + 16, y + 360), (bx + box_w - 16, y + 440)], radius=16, fill=(236, 253, 245), outline=(16, 185, 129), width=2)
            d.text((bx + 36, y + 385), "PASSED [OK]", fill=(5, 150, 105), font=font_head)
            
            # Flow arrow
            if idx < num - 1:
                ax = bx + box_w + 6
                ay = y + 230
                d.line([(ax, ay), (ax + gap - 14, ay)], fill=col, width=8)
                # Triangle arrow head
                d.polygon([(ax + gap - 14, ay - 14), (ax + gap - 2, ay), (ax + gap - 14, ay + 14)], fill=col)

    # 2. COMPARISON SPLIT (Slides 2, 7, 8, 18)
    elif cfg["draw"] == "comparison_split":
        card_w = (W - 140) // 2
        y = 180
        card_h = 640

        # Left Card (Shadow + Body)
        d.rounded_rectangle([(54, y + 4), (54 + card_w, y + card_h + 4)], radius=24, fill=(241, 245, 249))
        d.rounded_rectangle([(50, y), (50 + card_w, y + card_h)], radius=24, fill=(255, 245, 245), outline=(225, 29, 72), width=4)
        
        # Left Header
        d.rounded_rectangle([(50, y), (50 + card_w, y + 100)], radius=22, fill=(225, 29, 72))
        d.rectangle([(50, y + 60), (50 + card_w, y + 100)], fill=(225, 29, 72))
        d.text((75, y + 32), cfg["left_title"], fill=(255, 255, 255), font=font_head)
        
        # Left Items
        item_y = y + 135
        for item in cfg["left_items"]:
            d.rounded_rectangle([(70, item_y), (50 + card_w - 20, item_y + 80)], radius=14, fill=(255, 255, 255), outline=(254, 202, 202), width=2)
            d.text((90, item_y + 26), item, fill=(159, 18, 57), font=font_body_bold)
            item_y += 98

        # Right Card (Shadow + Body)
        rx = 50 + card_w + 40
        d.rounded_rectangle([(rx + 4, y + 4), (rx + card_w + 4, y + card_h + 4)], radius=24, fill=(241, 245, 249))
        d.rounded_rectangle([(rx, y), (rx + card_w, y + card_h)], radius=24, fill=(240, 253, 244), outline=(16, 185, 129), width=4)
        
        # Right Header
        d.rounded_rectangle([(rx, y), (rx + card_w, y + 100)], radius=22, fill=(16, 185, 129))
        d.rectangle([(rx, y + 60), (rx + card_w, y + 100)], fill=(16, 185, 129))
        d.text((rx + 25, y + 32), cfg["right_title"], fill=(255, 255, 255), font=font_head)
        
        # Right Items
        item_y = y + 135
        for item in cfg["right_items"]:
            d.rounded_rectangle([(rx + 20, item_y), (rx + card_w - 20, item_y + 80)], radius=14, fill=(255, 255, 255), outline=(187, 247, 208), width=2)
            d.text((rx + 40, item_y + 26), item, fill=(6, 95, 70), font=font_body_bold)
            item_y += 98

    # 3. TIMELINE (Slides 3, 4, 5, 10, 11, 12)
    elif cfg["draw"] == "timeline":
        y = 180
        milestones = cfg["milestones"]
        card_w = W - 100
        card_h = 190
        gap = 30
        for idx, (year, subhead, desc, col) in enumerate(milestones):
            cy = y + idx * (card_h + gap)
            
            # Card Shadow + Body
            d.rounded_rectangle([(54, cy + 4), (54 + card_w, cy + card_h + 4)], radius=22, fill=(226, 232, 240))
            d.rounded_rectangle([(50, cy), (50 + card_w, cy + card_h)], radius=22, fill=(255, 255, 255), outline=col, width=4)
            
            # Left year block
            d.rounded_rectangle([(65, cy + 18), (420, cy + card_h - 18)], radius=18, fill=col)
            d.text((85, cy + 75), year, fill=(255, 255, 255), font=font_head)
            
            # Right content
            d.text((450, cy + 35), subhead, fill=(15, 23, 42), font=font_head)
            
            # Desc box
            d.rounded_rectangle([(445, cy + 85), (50 + card_w - 20, cy + card_h - 22)], radius=12, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
            d.text((465, cy + 105), desc, fill=(51, 65, 85), font=font_body_bold)

    # 4. CAMS GRID / QUALITY GATES (Slides 9, 16, 20)
    elif cfg["draw"] == "cams_grid":
        pillars = cfg["pillars"]
        gw = (W - 140) // 2
        gh = 290
        coords = [
            (50, 180),
            (50 + gw + 40, 180),
            (50, 180 + gh + 35),
            (50 + gw + 40, 180 + gh + 35)
        ]
        for idx, (title, desc, col) in enumerate(pillars):
            gx, gy = coords[idx]
            
            d.rounded_rectangle([(gx + 4, gy + 4), (gx + gw + 4, gy + gh + 4)], radius=22, fill=(226, 232, 240))
            d.rounded_rectangle([(gx, gy), (gx + gw, gy + gh)], radius=22, fill=(255, 255, 255), outline=col, width=4)
            
            # Card Header
            d.rounded_rectangle([(gx, gy), (gx + gw, gy + 80)], radius=20, fill=col)
            d.rectangle([(gx, gy + 50), (gx + gw, gy + 80)], fill=col)
            d.text((gx + 25, gy + 24), title, fill=(255, 255, 255), font=font_head)
            
            # Card Body
            d.rounded_rectangle([(gx + 20, gy + 105), (gx + gw - 20, gy + gh - 20)], radius=14, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
            draw_wrapped_text(d, desc, gx + 35, gy + 130, gw - 70, font_body_bold, (30, 41, 59), line_spacing=10)

    # 5. ACTIONS ARCH (Slides 13, 14)
    elif cfg["draw"] == "actions_arch":
        components = cfg["components"]
        y = 180
        ch = 135
        gap = 25
        for idx, (title, desc, col) in enumerate(components):
            cy = y + idx * (ch + gap)
            
            d.rounded_rectangle([(54, cy + 4), (W - 46, cy + ch + 4)], radius=20, fill=(226, 232, 240))
            d.rounded_rectangle([(50, cy), (W - 50, cy + ch)], radius=20, fill=(255, 255, 255), outline=col, width=4)
            
            # Left Tag
            d.rounded_rectangle([(60, cy + 14), (460, cy + ch - 14)], radius=14, fill=col)
            d.text((80, cy + 50), title, fill=(255, 255, 255), font=font_head)
            
            # Right Description Box
            d.rounded_rectangle([(480, cy + 14), (W - 65, cy + ch - 14)], radius=14, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
            d.text((505, cy + 48), desc, fill=(15, 23, 42), font=font_body_bold)

    # Bottom summary footer badge
    d.rounded_rectangle([(50, H - 120), (W - 50, H - 40)], radius=18, fill=(241, 245, 249), outline=(203, 213, 225), width=2)
    d.text((75, H - 90), f">> {cfg['footer_badge']}", fill=(15, 23, 42), font=font_footer)

    out_path = f"public/slides/slide_{cfg['id']}.png"
    img.save(out_path, quality=95)
    print(f"Generated {out_path} ({W}x{H})")

print("All 20 high-resolution slide diagram images generated successfully!")
