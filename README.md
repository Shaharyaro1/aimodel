# Question Generator - AI-Powered Blog Website

A modern Angular-based web application that generates educational questions from text content or uploaded files using OpenAI's GPT API.

## Features

- **Text Input**: Generate questions from pasted text content
- **File Upload**: Upload .txt files and generate questions from file content
- **Multiple Question Types**: 
  - Multiple Choice (with 4 options)
  - Short Answer
  - True/False
- **Customizable**: Choose number of questions (5, 10, 15, or 20)
- **Modern UI**: Clean, responsive design with tabbed interface
- **Real-time Processing**: Instant question generation with loading states

## Tech Stack

- **Frontend**: Angular 17+ with standalone components
- **Backend**: Express.js with API routes
- **AI**: OpenAI GPT-3.5-turbo for question generation
- **File Handling**: Multer for file uploads
- **Styling**: Custom CSS with responsive design

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Shaharyaro1/aimodel.git
cd aimodel
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=4200
```

4. Build the Angular application:
```bash
npm run build
```

5. Start the server:
```bash
npm run server
```

The application will be available at `http://localhost:4200`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/generate-questions` - Generate questions from text
- `POST /api/generate-questions-from-file` - Generate questions from uploaded file

## Usage

1. **Text Input Method**:
   - Select "Text Input" tab
   - Paste your content in the textarea
   - Choose number of questions
   - Click "Generate Questions"

2. **File Upload Method**:
   - Select "File Upload" tab
   - Choose a .txt file
   - Select number of questions
   - Click "Generate Questions from File"

## File Support

Currently supports:
- `.txt` files (plain text)

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `PORT`: Server port (default: 4200)

## Development

For development with hot reload:
```bash
npm start
```

## Scripts

- `npm start` - Start Angular development server
- `npm run build` - Build the application
- `npm run server` - Start the Express server
- `npm run build:prod` - Build and start production server
- `npm test` - Run tests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.