import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionGeneratorService, GeneratedQuestion } from '../services/question-generator.service';

@Component({
  selector: 'app-question-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-generator.component.html',
  styleUrls: ['./question-generator.component.css'],
})
export class QuestionGeneratorComponent implements OnInit {
  activeTab: 'text' | 'file' = 'text';
  textInput: string = '';
  selectedFile: File | null = null;
  numberOfQuestions: number = 5;
  generatedQuestions: GeneratedQuestion[] = [];
  loading: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(private questionService: QuestionGeneratorService) {}

  ngOnInit() {
    this.questionService.checkApiHealth().subscribe({
      next: (response) => {
        console.log('API Health:', response);
      },
      error: (err) => {
        console.error('API Health Check Failed:', err);
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.error = null;
    }
  }

  generateFromText() {
    if (!this.textInput.trim()) {
      this.error = 'Please enter some text';
      return;
    }

    this.loading = true;
    this.error = null;
    this.successMessage = null;

    this.questionService
      .generateQuestionsFromText(this.textInput, this.numberOfQuestions)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.generatedQuestions = response.questions;
            // No success message shown
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.error || 'Failed to generate questions. Please try again.';
          this.loading = false;
        },
      });
  }

  generateFromFile() {
    if (!this.selectedFile) {
      this.error = 'Please select a file';
      return;
    }

    this.loading = true;
    this.error = null;
    this.successMessage = null;

    this.questionService
      .generateQuestionsFromFile(this.selectedFile, this.numberOfQuestions)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.generatedQuestions = response.questions;
            // No success message shown
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.error || 'Failed to process file';
          this.loading = false;
        },
      });
  }

  clearAll() {
    this.textInput = '';
    this.selectedFile = null;
    this.generatedQuestions = [];
    this.error = null;
    this.successMessage = null;
  }
}
