import { Request, Response } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import natural from 'natural';
import nlp from 'compromise';

// Configure multer for file uploads
const storage = multer.memoryStorage();
export const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

interface ExtractedTopic {
  title: string;
  keywords: string[];
  summary: string;
  importance: number;
}

interface MindMapNode {
  id: string;
  title: string;
  x: number;
  y: number;
  children: string[];
  resources: any[];
  color: string;
  summary: string;
  keywords: string[];
}

class PDFProcessor {
  private tokenizer = new natural.WordTokenizer();
  private stemmer = natural.PorterStemmer;
  
  // Extract text from PDF
  async extractText(buffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(buffer);
      return data.text;
    } catch (error) {
      throw new Error('Failed to extract text from PDF');
    }
  }

  // Clean and preprocess text
  preprocessText(text: string): string {
    return text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/[^\w\s.,;:!?-]/g, '') // Remove special characters except basic punctuation
      .trim();
  }

  // Extract key topics using NLP
  extractTopics(text: string): ExtractedTopic[] {
    const doc = nlp(text);
    const sentences = doc.sentences().out('array');
    
    // Find headings and important phrases
    const headings = this.findHeadings(text);
    const keyPhrases = this.extractKeyPhrases(text);
    
    const topics: ExtractedTopic[] = [];
    
    // Process headings as main topics
    headings.forEach((heading, index) => {
      const relatedSentences = this.findRelatedSentences(heading, sentences);
      const summary = this.generateSummary(relatedSentences);
      const keywords = this.extractKeywords(heading + ' ' + summary);
      
      topics.push({
        title: heading,
        keywords,
        summary,
        importance: this.calculateImportance(heading, relatedSentences)
      });
    });

    // Add key phrases as subtopics
    keyPhrases.forEach((phrase, index) => {
      if (!topics.some(topic => topic.title.toLowerCase().includes(phrase.toLowerCase()))) {
        const relatedSentences = this.findRelatedSentences(phrase, sentences);
        const summary = this.generateSummary(relatedSentences);
        const keywords = this.extractKeywords(phrase + ' ' + summary);
        
        topics.push({
          title: phrase,
          keywords,
          summary,
          importance: this.calculateImportance(phrase, relatedSentences) * 0.7 // Lower importance for phrases
        });
      }
    });

    // Sort by importance and return top topics
    return topics
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 12); // Limit to 12 main topics
  }

  // Find headings in text
  private findHeadings(text: string): string[] {
    const headingPatterns = [
      /^[A-Z][A-Z\s]{2,50}$/gm, // ALL CAPS headings
      /^\d+\.?\s+[A-Z][^.!?]*$/gm, // Numbered headings
      /^[A-Z][^.!?]*:$/gm, // Headings ending with colon
      /^Unit\s+\d+[:\s]+[A-Z][^.!?]*$/gmi, // Unit headings
      /^Chapter\s+\d+[:\s]+[A-Z][^.!?]*$/gmi, // Chapter headings
      /^Module\s+\d+[:\s]+[A-Z][^.!?]*$/gmi, // Module headings
    ];

    const headings: string[] = [];
    
    headingPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        headings.push(...matches.map(h => h.trim()));
      }
    });

    // Remove duplicates and clean
    return [...new Set(headings)]
      .filter(h => h.length > 3 && h.length < 100)
      .slice(0, 8); // Limit main headings
  }

  // Extract key phrases using NLP
  private extractKeyPhrases(text: string): string[] {
    const doc = nlp(text);
    
    // Extract noun phrases
    const nounPhrases = doc.match('#Noun+').out('array');
    
    // Extract important terms
    const terms = doc.terms().out('array');
    const importantTerms = terms.filter((term: string) => 
      term.length > 4 && 
      /^[A-Z]/.test(term) && 
      !['The', 'This', 'That', 'These', 'Those'].includes(term)
    );

    // Combine and filter
    const phrases = [...nounPhrases, ...importantTerms]
      .filter(phrase => phrase.length > 3 && phrase.length < 50)
      .slice(0, 15);

    return [...new Set(phrases)];
  }

  // Find sentences related to a topic
  private findRelatedSentences(topic: string, sentences: string[]): string[] {
    const topicWords = this.tokenizer.tokenize(topic.toLowerCase()) || [];
    
    return sentences
      .filter(sentence => {
        const sentenceWords = this.tokenizer.tokenize(sentence.toLowerCase()) || [];
        const overlap = topicWords.filter(word => sentenceWords.includes(word));
        return overlap.length > 0;
      })
      .slice(0, 3); // Limit to 3 most relevant sentences
  }

  // Generate summary from sentences
  private generateSummary(sentences: string[]): string {
    if (sentences.length === 0) return 'No summary available';
    
    // Take first sentence or combine if short
    if (sentences[0].length > 100) {
      return sentences[0].substring(0, 150) + '...';
    } else if (sentences.length > 1) {
      const combined = sentences.slice(0, 2).join(' ');
      return combined.length > 200 ? combined.substring(0, 200) + '...' : combined;
    }
    
    return sentences[0];
  }

  // Extract keywords from text
  private extractKeywords(text: string): string[] {
    const tokens = this.tokenizer.tokenize(text.toLowerCase()) || [];
    const stopWords = natural.stopwords;
    
    const keywords = tokens
      .filter(token => 
        token.length > 3 && 
        !stopWords.includes(token) &&
        /^[a-zA-Z]+$/.test(token)
      )
      .map(token => this.stemmer.stem(token));

    // Count frequency and return top keywords
    const frequency: { [key: string]: number } = {};
    keywords.forEach(keyword => {
      frequency[keyword] = (frequency[keyword] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([keyword]) => keyword);
  }

  // Calculate topic importance
  private calculateImportance(topic: string, relatedSentences: string[]): number {
    let score = 0;
    
    // Length factor
    score += Math.min(topic.length / 10, 5);
    
    // Related content factor
    score += relatedSentences.length * 2;
    
    // Keyword density factor
    const totalWords = relatedSentences.join(' ').split(' ').length;
    score += Math.min(totalWords / 50, 10);
    
    // Heading indicators
    if (/^(unit|chapter|module|section)/i.test(topic)) score += 10;
    if (/^\d+\./.test(topic)) score += 8;
    if (topic.toUpperCase() === topic) score += 5;
    
    return score;
  }

  // Generate mind map structure
  generateMindMap(topics: ExtractedTopic[], subjectName: string): MindMapNode[] {
    const nodes: MindMapNode[] = [];
    const colors = [
      'bg-primary-600', 'bg-accent-emerald', 'bg-accent-purple', 
      'bg-accent-orange', 'bg-accent-rose', 'bg-secondary-600',
      'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-red-600'
    ];

    // Create root node
    const rootNode: MindMapNode = {
      id: 'root',
      title: subjectName,
      x: 400,
      y: 300,
      children: [],
      resources: [],
      color: 'bg-primary-600',
      summary: `Main subject: ${subjectName}`,
      keywords: ['main', 'subject', 'course']
    };

    // Create topic nodes in circular arrangement
    const mainTopics = topics.slice(0, 6); // Main topics around center
    const subTopics = topics.slice(6); // Sub topics

    mainTopics.forEach((topic, index) => {
      const angle = (index * 60) * (Math.PI / 180); // 60 degrees apart
      const radius = 200;
      const x = 400 + radius * Math.cos(angle);
      const y = 300 + radius * Math.sin(angle);

      const nodeId = `topic_${index}`;
      rootNode.children.push(nodeId);

      const node: MindMapNode = {
        id: nodeId,
        title: topic.title,
        x: Math.max(50, Math.min(750, x)),
        y: Math.max(50, Math.min(550, y)),
        children: [],
        resources: this.generateMockResources(topic),
        color: colors[index % colors.length],
        summary: topic.summary,
        keywords: topic.keywords
      };

      nodes.push(node);

      // Add sub-topics for main topics
      const relatedSubTopics = subTopics.filter(subTopic => 
        this.areTopicsRelated(topic, subTopic)
      ).slice(0, 2);

      relatedSubTopics.forEach((subTopic, subIndex) => {
        const subAngle = angle + (subIndex - 0.5) * 30 * (Math.PI / 180);
        const subRadius = 120;
        const subX = x + subRadius * Math.cos(subAngle);
        const subY = y + subRadius * Math.sin(subAngle);

        const subNodeId = `${nodeId}_sub_${subIndex}`;
        node.children.push(subNodeId);

        const subNode: MindMapNode = {
          id: subNodeId,
          title: subTopic.title,
          x: Math.max(50, Math.min(750, subX)),
          y: Math.max(50, Math.min(550, subY)),
          children: [],
          resources: this.generateMockResources(subTopic),
          color: colors[(index + 3) % colors.length],
          summary: subTopic.summary,
          keywords: subTopic.keywords
        };

        nodes.push(subNode);
      });
    });

    return [rootNode, ...nodes];
  }

  // Check if topics are related
  private areTopicsRelated(topic1: ExtractedTopic, topic2: ExtractedTopic): boolean {
    const keywords1 = topic1.keywords.concat(topic1.title.toLowerCase().split(' '));
    const keywords2 = topic2.keywords.concat(topic2.title.toLowerCase().split(' '));
    
    const commonKeywords = keywords1.filter(k => keywords2.includes(k));
    return commonKeywords.length > 0;
  }

  // Generate mock resources for topics
  private generateMockResources(topic: ExtractedTopic) {
    const resourceTypes = ['pdf', 'video', 'article', 'quiz'];
    const resources = [];

    // Generate 1-3 resources per topic
    const numResources = Math.min(3, Math.max(1, Math.floor(topic.importance / 5)));

    for (let i = 0; i < numResources; i++) {
      const type = resourceTypes[i % resourceTypes.length];
      resources.push({
        id: `${topic.title.replace(/\s+/g, '_').toLowerCase()}_${type}_${i}`,
        title: `${topic.title} - ${type.toUpperCase()}`,
        type,
        url: '#',
        description: `${type === 'pdf' ? 'Study material' : 
                     type === 'video' ? 'Video tutorial' :
                     type === 'article' ? 'Detailed article' :
                     'Practice quiz'} for ${topic.title}`
      });
    }

    return resources;
  }
}

// Controller functions
export const processPDF = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const { subjectName } = req.body;
    if (!subjectName) {
      return res.status(400).json({ error: 'Subject name is required' });
    }

    const processor = new PDFProcessor();
    
    // Extract text from PDF
    const text = await processor.extractText(req.file.buffer);
    
    if (!text || text.trim().length < 100) {
      return res.status(400).json({ error: 'PDF appears to be empty or contains insufficient text' });
    }

    // Process text and extract topics
    const cleanText = processor.preprocessText(text);
    const topics = processor.extractTopics(cleanText);
    
    if (topics.length === 0) {
      return res.status(400).json({ error: 'No topics could be extracted from the PDF' });
    }

    // Generate mind map
    const mindMapNodes = processor.generateMindMap(topics, subjectName);

    // Return processed data
    res.json({
      success: true,
      data: {
        extractedText: cleanText.substring(0, 1000) + '...', // First 1000 chars for preview
        topics: topics.map(topic => ({
          title: topic.title,
          summary: topic.summary,
          keywords: topic.keywords,
          importance: topic.importance
        })),
        mindMapNodes,
        statistics: {
          totalCharacters: text.length,
          totalTopics: topics.length,
          processingTime: Date.now()
        }
      }
    });

  } catch (error: any) {
    console.error('PDF processing error:', error);
    res.status(500).json({ 
      error: 'Failed to process PDF', 
      details: error.message 
    });
  }
};

export const getProcessingStatus = async (req: Request, res: Response) => {
  // This could be used for real-time progress updates in a production system
  res.json({ status: 'completed', progress: 100 });
};
