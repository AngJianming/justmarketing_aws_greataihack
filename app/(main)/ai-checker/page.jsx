'use client'

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

// direct from lucide-react component
import { 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Loader2, 
  FileText, 
  Languages,
  Target,
  Zap,
  MapPin,
  Users,
  Flag,
  Upload,
  Download
} from 'lucide-react';

export default function ContentLocalizerChecker() {
  const [content, setContent] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Malay');
  const [targetRegion, setTargetRegion] = useState('West Malaysia');
  const [targetRace, setTargetRace] = useState('Malay');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('import');
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const languages = [
    'Malay', 'Chinese', 'Tamil', 'English'
  ];

  const regions = [
    'West Malaysia', 'East Malaysia', 'Singapore', 'Indonesia', 'Thailand', 'Philippines'
  ];

  const races = [
    'Malay', 'Chinese', 'Indian', 'Mixed'
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // In a real app, you'd read the file content here
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const mockAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    setActiveTab('results');
    
    // Simulate analysis progress
    const steps = [
      { progress: 20, message: 'Analyzing content structure...' },
      { progress: 40, message: 'Checking cultural context...' },
      { progress: 60, message: 'Identifying localization challenges...' },
      { progress: 80, message: 'Generating recommendations...' },
      { progress: 100, message: 'Analysis complete!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(step.progress);
    }

    // Mock analysis result
    setAnalysisResult({
      overallScore: 78,
      targetAudience: `${targetRace} audience in ${targetRegion}`,
      language: targetLanguage,
      issues: [
        {
          type: 'cultural',
          severity: 'high',
          message: 'Cultural references may not translate well to Malaysian context',
          suggestion: 'Consider using Malaysian cultural examples or providing cultural context for international references'
        },
        {
          type: 'linguistic',
          severity: 'medium',
          message: 'Complex sentence structures detected',
          suggestion: 'Simplify sentences for better translation accuracy in Malay/Chinese'
        },
        {
          type: 'technical',
          severity: 'low',
          message: 'Technical terms present',
          suggestion: 'Provide glossary or definitions for technical terms in local language'
        },
        {
          type: 'regional',
          severity: 'medium',
          message: 'Content may need regional adaptation',
          suggestion: `Consider ${targetRegion}-specific terminology and cultural nuances`
        }
      ],
      recommendations: [
        'Use shorter, simpler sentences for better translation',
        'Avoid Western idioms and cultural references',
        'Include context for technical terms in local language',
        'Consider visual elements to support multilingual text',
        'Test with local Malaysian users for cultural appropriateness',
        'Use Malaysian English conventions where applicable'
      ],
      estimatedTranslationTime: '2-3 hours',
      confidence: 85,
      culturalScore: 72,
      linguisticScore: 81,
      regionalScore: 68
    });

    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <XCircle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            AI Content Localization Checker
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Check if your marketing content is culturally appropriate and relevant to Malaysia. 
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('import')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'import'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              <Upload className="h-4 w-4" />
              Import
            </button>
            <button
              onClick={() => setActiveTab('output')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'output'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              Output
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'results'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              <Target className="h-4 w-4" />
              Results
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {activeTab === 'import' && (
            <div className="space-y-6">
              {/* Upload Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Upload Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-slate-400 dark:hover:border-slate-500 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                      Drag and drop your content here
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Supports JPEG, PNG images and MP4, MPEG-4 videos
                    </p>
                    <Button variant="outline" size="lg">
                      Browse Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      accept=".jpg,.jpeg,.png,.mp4,.mpeg,.txt,.doc,.docx"
                      className="hidden"
                    />
                  </div>
                  {uploadedFile && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        ✓ File uploaded: {uploadedFile.name}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Target Region */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Target Region
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <select
                    value={targetRegion}
                    onChange={(e) => setTargetRegion(e.target.value)}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="">Select target region for analysis</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </CardContent>
              </Card>

              {/* Additional Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Languages className="h-4 w-4" />
                      Target Language
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      Target Audience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <select
                      value={targetRace}
                      onChange={(e) => setTargetRace(e.target.value)}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      {races.map((race) => (
                        <option key={race} value={race}>{race}</option>
                      ))}
                    </select>
                  </CardContent>
                </Card>
              </div>

              {/* Analyze Button */}
              <div className="text-center">
                <Button 
                  onClick={mockAnalysis}
                  disabled={(!content.trim() && !uploadedFile) || isAnalyzing || !targetRegion}
                  size="lg"
                  className="px-8"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Analyze Content
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'output' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Content Preview
                </CardTitle>
                <CardDescription>
                  Review your content before analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Your content will appear here... You can also paste or edit content directly."
                  className="min-h-[400px] resize-none"
                />
                <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
                  <span>{content.length} characters</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'results' && (
            <div className="space-y-6">
              {isAnalyzing && (
                <Card>
                  <CardContent className="py-8">
                    <div className="text-center space-y-4">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                      <div className="space-y-2">
                        <Progress value={progress} className="w-full max-w-md mx-auto" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {progress < 20 && 'Analyzing content structure...'}
                          {progress >= 20 && progress < 40 && 'Checking cultural context...'}
                          {progress >= 40 && progress < 60 && 'Identifying localization challenges...'}
                          {progress >= 60 && progress < 80 && 'Generating recommendations...'}
                          {progress >= 80 && 'Analysis complete!'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {analysisResult ? (
                <>
                  {/* Overall Score */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Analysis Results
                      </CardTitle>
                      <CardDescription>
                        Analysis for {analysisResult.targetAudience} in {analysisResult.language}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium">Overall Localization Score</span>
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          {analysisResult.overallScore}/100
                        </Badge>
                      </div>
                      <Progress value={analysisResult.overallScore} className="w-full mb-4" />
                      
                      {/* Detailed Scores */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Flag className="h-4 w-4 text-blue-600" />
                            <span className="text-xs font-medium">Cultural</span>
                          </div>
                          <div className="text-lg font-bold">{analysisResult.culturalScore}</div>
                          <Progress value={analysisResult.culturalScore} className="w-full h-2" />
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Languages className="h-4 w-4 text-green-600" />
                            <span className="text-xs font-medium">Linguistic</span>
                          </div>
                          <div className="text-lg font-bold">{analysisResult.linguisticScore}</div>
                          <Progress value={analysisResult.linguisticScore} className="w-full h-2" />
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <MapPin className="h-4 w-4 text-orange-600" />
                            <span className="text-xs font-medium">Regional</span>
                          </div>
                          <div className="text-lg font-bold">{analysisResult.regionalScore}</div>
                          <Progress value={analysisResult.regionalScore} className="w-full h-2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">Confidence:</span>
                          <span className="ml-2 font-medium">{analysisResult.confidence}%</span>
                        </div>
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">Est. Translation Time:</span>
                          <span className="ml-2 font-medium">{analysisResult.estimatedTranslationTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Issues */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Issues Found
                      </CardTitle>
                      <CardDescription>
                        {analysisResult.issues.length} potential localization issues detected
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysisResult.issues.map((issue, index) => (
                        <Alert key={index} className="border-l-4 border-l-orange-500">
                          <div className="flex items-start gap-3">
                            {getSeverityIcon(issue.severity)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{issue.message}</span>
                                <Badge variant={getSeverityColor(issue.severity)} size="sm">
                                  {issue.severity}
                                </Badge>
                              </div>
                              <AlertDescription className="text-sm">
                                {issue.suggestion}
                              </AlertDescription>
                            </div>
                          </div>
                        </Alert>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Languages className="h-5 w-5" />
                        Recommendations
                      </CardTitle>
                      <CardDescription>
                        Best practices for improving localization readiness
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </>
              ) : !isAnalyzing ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Globe className="h-12 w-12 text-slate-400 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                      Ready to Analyze
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Upload your content and select a target region to get started with the analysis.
                    </p>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}