# JustMarketing AWS GreatHack 🚀

> AI-powered marketing content localization and cultural adaptation platform for the Malaysian market

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688)](https://fastapi.tiangolo.com/)
[![AWS](https://img.shields.io/badge/AWS-Bedrock-FF9900)](https://aws.amazon.com/bedrock/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)](https://tailwindcss.com/)

## 🌟 Main Features

### 🎯 AI Culture Check
- **Cultural Appropriateness Analysis**: Evaluate marketing content for cultural sensitivity across Malaysian demographics
- **Relevancy Scoring**: Assess content relevance to local Malaysian audiences with detailed explanations
- **Risk Assessment**: Identify high-risk cultural indicators with actionable suggestions
- **Multi-format Support**: Analyze text, images, and video content seamlessly

### 🎬 Trend Adapter for Video
- **Speech-to-Text Processing**: Extract and analyze audio content from video files
- **Cultural Context Analysis**: Adapt video content trends to Malaysian cultural preferences
- **Real-time Processing**: Fast video analysis with processing time tracking
- **Format Support**: MP4, MPEG-4, and other popular video formats

### 📊 Generate Marketing Strategy
- **Localized Recommendations**: AI-generated marketing strategies tailored for Malaysian market segments
- **Audience Targeting**: Specific targeting for Malay, Chinese, Indian, and mixed demographics
- **Regional Adaptation**: Customized strategies for West Malaysia, East Malaysia, and neighboring regions
- **Performance Metrics**: Detailed scoring and explanation for strategy effectiveness

### 🌐 Content Translation & Adaptation
- **Multi-language Support**: Translation between Malay, Chinese, Tamil, and English
- **Cultural Localization**: Beyond translation - cultural adaptation for Malaysian context
- **Context-aware Processing**: Maintains cultural nuances and local expressions
- **Quality Assurance**: Bedrock-powered analysis ensures translation accuracy

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern utility-first styling
- **Shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Consistent iconography

### Backend
- **FastAPI** - High-performance Python API framework
- **AWS Bedrock** - AI/ML model orchestration
- **Python 3.11+** - Core backend language

### Infrastructure
- **AWS Services** - Cloud infrastructure and AI services
- **Vercel** - Frontend deployment and hosting
- **RESTful APIs** - Clean API architecture

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Git** - Version control

## 📁 Project Structure

```
justmarketing_aws_greathack/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ai-checker.tsx           # Main AI checker component
│   └── ui/                      # Shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── progress.tsx
│       ├── alert.tsx
│       ├── textarea.tsx
│       └── label.tsx
├── lib/                         # Utility functions
│   └── utils.ts                 # Common utilities
├── hooks/                       # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── public/                      # Static assets
│   └── tech-architecture.png    # System architecture diagram
├── backend/                     # FastAPI backend (separate repo)
│   ├── main.py                  # FastAPI application
│   ├── routers/                 # API route handlers
│   ├── services/                # Business logic
│   └── models/                  # Data models
├── docs/                        # Documentation
├── README.md                    # This file
├── package.json                 # Dependencies
├── next.config.mjs             # Next.js configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.11+
- AWS Account with Bedrock access
- Git

### Frontend Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/KwanJunEr/justmarketing_aws_greathack.git
   cd justmarketing_aws_greathack
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   # Add your environment variables
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Navigate to backend directory**
   \`\`\`bash
   cd backend
   \`\`\`

2. **Create virtual environment**
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

3. **Install Python dependencies**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. **Configure AWS credentials**
   \`\`\`bash
   aws configure
   # Or set environment variables
   export AWS_ACCESS_KEY_ID=your_key
   export AWS_SECRET_ACCESS_KEY=your_secret
   export AWS_DEFAULT_REGION=us-east-1
   \`\`\`

5. **Start FastAPI server**
   \`\`\`bash
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   \`\`\`

## 🏛️ System Architecture

![Tech Architecture](./public/tech-architecture.jpg)
