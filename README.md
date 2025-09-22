# JustMarketing AWS GreatAIHack 🚀

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
   - **AWS Elastic Beanstalk** - Deploy Web Applications
   - **AWS Lambda** - Serverless compute service that allows running code without managing servers
   - **Amazon S3 (Simple Storage Service)** - S3 object storage service
- **RESTful APIs** - Clean API architecture

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Git** - Version control

## 🏛️ System Architecture

![Tech Architecture](/Architecture.jpg)


## 📁 Project Structure

```
justmarketing_aws_greathack/
├── app/                           # Next.js application (frontend pages & routes)            
│   ├── (main)/                     # Main route group                                        
│   ├── favicon.ico                  # Website favicon                                        
│   ├── globals.css                  # Global CSS styles                                      
│   ├── layout.js                    # Root layout component                                  
│   ├── page.js                      # Default landing page                                   
│   └── sign-in/                     # Authentication pages (sign in, etc.)                   
│
├── backend/                       # Python backend (API, AI services, scripts)              
│   ├── AI Checker.txt               # Notes on AI checker logic                              
│   ├── Analysis/                    # Analysis-related files                                 
│   ├── Docs/                        # Backend documentation                                 
│   ├── FLEX.pdf                     # Reference PDF (FLEX)                                   
│   ├── FlexCompany.pdf              # Reference PDF (Company)                                
│   ├── Images/                      # Images for backend testing                            
│   ├── README.md                    # Backend-specific documentation                        
│   ├── pycache/                     # Python cache files                                    
│   ├── app.py                       # Main backend app (Flask/FastAPI)                      
│   ├── bedrock.py                   # AWS Bedrock integration                               
│   ├── bedrockClient.py             # AWS Bedrock client utilities                          
│   ├── image_checker.py             # Image moderation/validation logic                     
│   ├── requirements.txt             # Python dependencies                                   
│   ├── speech_to_text.py            # Video/Audio transcription logic                       
│   ├── test.txt                     # Test input file                                       
│   ├── test_api.py                  # API test script                                       
│   ├── test_image.jpg               # Sample test image                                     
│   ├── test_image1.jpg              # Another sample test image                             
│   ├── test_video.mp4               # Sample test video                                     
│   ├── text_checker.py              # Text moderation/checker                               
│   └── venv/                        # Virtual environment                                   
│
├── components/                     # Reusable React components                             
│   ├── Footer.jsx                   # Website footer                                        
│   ├── Header.jsx                   # Website header                                        
│   ├── dashboardpage/               # Dashboard UI components                               
│   ├── landingpage/                 # Landing page UI components                            
│   ├── strategypage/                # Strategy page UI components                           
│   ├── translatepage/               # Translation page UI components                        
│   ├── trendpage/                   # Trend analysis UI components                          
│   └── ui/                          # Shared UI elements (buttons, modals, etc.)            
│
├── lib/                            # Utility functions                                     
│   └── utils.js                     # Shared helper functions                               
│
├── public/                         # Static assets (served directly by Next.js)            
│   ├── element_1.png                                                                        
│   ├── element_1_nobg.png                                                                    
│   ├── element_2.png                                                                        
│   ├── element_2_nobg.png                                                                    
│   ├── element_3.png                                                                        
│   ├── element_3_nobg.png                                                                    
│   ├── element_4.png                                                                        
│   ├── element_4_nobg.png                                                                    
│   ├── element_5.png                                                                        
│   ├── element_5_nobg.png                                                                    
│   ├── file.svg                                                                             
│   ├── finalvideo.mp4                                                                       
│   ├── globe.svg                                                                            
│   ├── next.svg                                                                             
│   ├── vercel.svg                                                                           
│   └── window.svg                                                                           
│
├── .gitignore                      # Git ignore rules                                      
├── README.md                       # Project documentation                                 
├── components.json                 # Component library config (shadcn/ui, etc.)            
├── eslint.config.mjs               # ESLint configuration                                  
├── jsconfig.json                   # JavaScript/Next.js path settings                      
├── next.config.mjs                  # Next.js project configuration                         
├── package-lock.json               # Dependency lock file                                  
├── package.json                    # Project dependencies & scripts                        
└── postcss.config.mjs              # PostCSS configuration                                 

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


