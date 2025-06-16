# huggingface_video.py - FastAPI service for handling Hugging Face video generation

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, StreamingResponse, Response
import requests
import logging
import io

app = FastAPI()

@app.post("/huggingface/video")
async def handle_huggingface_video(req: Request):
    try:
        try:
            body = await req.json()
        except Exception:
            return JSONResponse(status_code=400, content={
                "error": "Request body is not valid JSON or is empty",
                "success": False
            })

        prompt = body.get("prompt")
        provider = body.get("provider")
        model = body.get("model")
        content_type = body.get("content_type")
        url = body.get("url")
        token = body.get("token")

        if not prompt:
            return JSONResponse(status_code=400, content={"error": "Missing required parameter: prompt", "success": False})

        if not token:
            return JSONResponse(status_code=400, content={"error": "Missing required parameter: token (API key)", "success": False})

        # Fallback: direct POST to HF API
        data = {"inputs": prompt}

        if url:
            api_url = url
        elif model:
            api_url = f"https://router.huggingface.co/hf-inference/models/{model}"
        else:
            api_url = "https://router.huggingface.co/hf-inference/models/Lightricks/LTX-Video"

        print(f"Making request to: {api_url}")

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

        response = requests.post(api_url, headers=headers, json=data)

        if not response.ok:
            return JSONResponse(status_code=response.status_code, content={
                "error": f"Error from Hugging Face API: {response.reason}",
                "details": response.text,
                "success": False
            })

        content_type = response.headers.get("content-type", "application/octet-stream")

        if "video" in content_type or "mp4" in content_type:
            return StreamingResponse(io.BytesIO(response.content), media_type=content_type)
        elif "json" in content_type:
            try:
                return JSONResponse(content=response.json())
            except Exception:
                return Response(content=response.content, media_type=content_type)
        else:
            return Response(content=response.content, media_type=content_type)

    except Exception as e:
        logging.error("General error in video generation", exc_info=True)
        return JSONResponse(status_code=500, content={
            "error": "Failed to process video generation request",
            "message": str(e),
            "success": False
        })