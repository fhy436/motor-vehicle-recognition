const projectId = "438542637054";
const location = 'us-central1';
const modelId = 'ICN8134624627914702848';
const filePath = './BuickRainierSUV2007.jpg';
//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\64211\Desktop\google-api\motor-vehicle-recognition-f67a44a847ce.json"
// Imports the Google Cloud AutoML library
const {PredictionServiceClient} = require('@google-cloud/automl').v1;
const fs = require('fs');

// Instantiates a client
const client = new PredictionServiceClient();

// Read the file content for translation.
const content = fs.readFileSync(filePath);

async function predict() {
  // Construct request
  // params is additional domain-specific parameters.
  // score_threshold is used to filter the result
  const request = {
    name: client.modelPath(projectId, location, modelId),
    payload: {
      image: {
        imageBytes: content,
      },
    },
  };

  const [response] = await client.predict(request);

  for (const annotationPayload of response.payload) {
    console.log(`Predicted class name: ${annotationPayload.displayName}`);
    console.log(
      `Predicted class score: ${annotationPayload.classification.score}`
    );
  }
}

predict();