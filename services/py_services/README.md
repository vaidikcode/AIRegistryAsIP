This folder contains FastAPI microservices that forward client requests to Hugging Face models for image and video generation.

⸻

Overview

These services act as secure backend proxies that take structured JSON requests and forward them to Hugging Face (or other AI providers), returning generated images/videos to the client.

⸻

Available Endpoints

1. /huggingface/image
	•	Method: POST
	•	Purpose: Generate an image from a prompt
	•	Supports: Hugging Face standard inference API & Nebius v1 image API

Request Body:

{
  "prompt": "A cyberpunk samurai in the rain",
  "model": "black-forest-labs/FLUX.1-dev",
  "token": "hf_your_token"
}

Example curl:

``` bash
curl -X POST http://localhost:3001/huggingface/image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A neon tiger in the jungle",
    "model": "black-forest-labs/FLUX.1-dev",
    "token": "hf_your_token"
  }' --output output.png
```


⸻

2. /huggingface/video
	•	Method: POST
	•	Purpose: Generate a video from a prompt
	•	Supports: Hugging Face standard inference API

Request Body:

{
  "prompt": "Astronaut breakdancing on Mars",
  "model": "Lightricks/LTX-Video",
  "token": "hf_your_token"
}

Example curl:

``` bash
curl -X POST http://localhost:3000/huggingface/video \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A futuristic robot chef cooking in zero gravity",
    "model": "Lightricks/LTX-Video",
    "token": "hf_your_token"
  }' --output result.mp4
```


⸻

Running Locally

Requirements
	•	Python 3.10+
	•	fastapi, uvicorn, requests

Install with:

```bash
pip install -r requirements.txt
```

Run servers

# Image Service
uvicorn huggingface_image:app --reload --port 3001

# Video Service
uvicorn huggingface_video:app --reload --port 3000


⸻

📁 Folder Structure

py_services/services/
├── huggingface_image.py
├── huggingface_video.py
├── requirements.txt
└── README.md
