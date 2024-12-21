require.config({
    paths: {
        vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs'
    }
});

require(['vs/editor/editor.main'], function () {
    var editor = monaco.editor.create(document.getElementById('monaco-editor'), {
        value: '',
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: true },
        fontSize: 14,
        scrollBeyondLastLine: false,
        roundedSelection: false,
        scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false
        }
    });

    // Make editor instance available globally
    window.monacoEditor = editor;
});

let explanation = document.getElementById('explanation');

// Prompt for AI to generate explanation
let aiPrompt = `Please provide an explanation in the following format:
{
  "title": "Name of the algorithm (or 'Here is the explanation' if no specific algorithm)",
  "aboutAlgo": "Brief description of what this algorithm/code does",
  "steps": ["Step 1", "Step 2", "Step 3", ...],
  "timeSpace": {
    "time": "Time complexity (e.g. O(n))",
    "space": "Space complexity (e.g. O(1))"
  },
  "code": "// Code implementation or starter code",
  "improvement": "Suggestions for code improvement (if any)"
}`;

let analyzeButton = document.getElementById('options');
analyzeButton.onclick = async () => {
    const code = window.monacoEditor.getValue();
    if (!code) {
        alert('Please write some code first');
        return;
    }

    // Use a secure backend endpoint for API_KEY retrieval
    const API_KEY = 'AIzaSyDbnLUU80hULpv1LYhtyVD_DEkS23SQoP4';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

    const requestBody = {
        contents: [{
          parts: [{
            text: aiPrompt+code
        }]
        }]
      };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        renderExplanation(data);
    } catch (error) {
        console.error('Error calling Gemini API:', error);
    }
};

function renderExplanation(data) {
    if (!data || !data.candidates || !data.candidates[0]) {
        explanation.innerHTML = 'No explanation data available.';
        return;
    }

    try {
        // Parse the JSON text from the API response
        const text = data.candidates[0].content.parts[0].text;
        const parsedData = JSON.parse(text.replace(/```json|```/g, '').trim());

        // Render the parsed explanation data
        explanation.innerHTML = `
            <div class="title">${parsedData.title || 'No Title'}</div>
            <div class="aboutAlgo">${parsedData.aboutAlgo || 'No description available.'}</div>
            <ol class="steps">${parsedData.steps?.map(step => `<li>${step}</li>`).join('') || '<li>No steps provided.</li>'}</ol>
            <div class="timespace">
                <strong>Time Complexity:</strong> ${parsedData.timeSpace?.time || 'N/A'}<br>
                <strong>Space Complexity:</strong> ${parsedData.timeSpace?.space || 'N/A'}
            </div>
            <pre class="code">${parsedData.code || '// No code provided.'}</pre>
            <div class="improvement">${parsedData.improvement || 'No improvements suggested.'}</div>
        `;
    } catch (error) {
        console.error('Error parsing explanation data:', error);
        explanation.innerHTML = 'Error processing explanation data.';
    }
}
