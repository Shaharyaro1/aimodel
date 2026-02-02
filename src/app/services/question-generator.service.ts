import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface GeneratedQuestion {
  question: string;
  type: 'multiple-choice' | 'short-answer' | 'true-false';
  options?: string[];
}

export interface ApiResponse {
  success: boolean;
  questions: GeneratedQuestion[];
  source?: string;
  note?: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionGeneratorService {

  constructor() {}

  generateQuestionsFromText(
    text: string,
    numberOfQuestions: number = 5
  ): Observable<ApiResponse> {
    console.log('Question generation disabled');
    return of({
      success: true,
      questions: [],
      source: "Disabled",
      note: "Question generation has been disabled"
    });
  }

  generateQuestionsFromFile(
    file: File,
    numberOfQuestions: number = 5
  ): Observable<ApiResponse> {
    return of({
      success: true,
      questions: [],
      source: "Disabled",
      note: "Question generation has been disabled"
    });
  }

  checkApiHealth(): Observable<any> {
    return of({ status: 'OK', message: 'Question Generator is running locally' });
  }

  private generateIntelligentQuestions(text: string, numberOfQuestions: number = 5): ApiResponse {
    console.log('Starting intelligent question generation for text:', text.substring(0, 100) + '...');
    try {
      // Simple text analysis to create relevant questions
      const words = text.toLowerCase().split(/\s+/);
      const sentences = text.split('.');
      
      console.log('Text analysis - Words count:', words.length, 'Sentences count:', sentences.length);
      
      // Extract key topics and concepts
      const keyConcepts: string[] = [];
      const technicalTerms: string[] = [];
      
      // Look for technical terms (words with capital letters or specific patterns)
      text.split(/\s+/).forEach(word => {
        const cleanWord = word.replace(/[^\w]/g, '');
        if (cleanWord.length > 3 && /^[A-Z]/.test(word)) {
          keyConcepts.push(cleanWord);
        }
        if (['tech', 'system', 'process', 'method', 'algorithm', 'data', 'intelligence', 'machine', 'learning', 'computer', 'software', 'program'].some(term => 
          cleanWord.toLowerCase().includes(term))) {
          technicalTerms.push(cleanWord);
        }
      });
      
      console.log('Extracted concepts:', keyConcepts);
      console.log('Extracted technical terms:', technicalTerms);
      
      // Generate different types of questions
      const questionTemplates: GeneratedQuestion[] = [
        {
          question: `What is the main concept discussed regarding ${keyConcepts[0] || 'the topic'} in the text?`,
          type: "short-answer" as const
        },
        {
          question: `Which of the following best describes ${technicalTerms[0] || 'the subject'}?`,
          type: "multiple-choice" as const,
          options: [
            "A basic concept",
            "An advanced technology", 
            "A simple process",
            "A complex system"
          ]
        },
        {
          question: `The text mentions important information about ${keyConcepts[0] || 'the topic'}.`,
          type: "true-false" as const
        },
        {
          question: `What role does ${technicalTerms[0] || 'technology'} play according to the text?`,
          type: "short-answer" as const
        },
        {
          question: `Based on the text, ${keyConcepts[0] || 'the main topic'} can be characterized as:`,
          type: "multiple-choice" as const,
          options: [
            "Highly complex",
            "Moderately useful", 
            "Completely automated",
            "User-friendly"
          ]
        }
      ];
      
      // Select questions based on requested number
      const selectedQuestions = questionTemplates.slice(0, numberOfQuestions);
      
      return {
        success: true,
        questions: selectedQuestions,
        source: "Angular Text Analysis",
        note: "Questions generated using intelligent text analysis"
      };
      
    } catch (error) {
      // Final fallback with generic questions
      return {
        success: true,
        questions: [
          {
            question: "What is the main topic discussed in the provided text?",
            type: "short-answer" as const
          },
          {
            question: "Which aspect of the content is most important?",
            type: "multiple-choice" as const,
            options: [
              "Technical details",
              "Practical applications",
              "Theoretical concepts", 
              "Historical context"
            ]
          }
        ].slice(0, numberOfQuestions),
        source: "Angular Fallback",
        note: "Basic questions due to processing limitations"
      };
    }
  }
}
