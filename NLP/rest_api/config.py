import os
from pathlib import Path

FILE_UPLOAD_PATH = os.getenv("FILE_UPLOAD_PATH", "./file_upload")

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
ROOT_PATH = os.getenv("ROOT_PATH", "/")
KOBARTSUM_MODEL_PATH = os.getenv("KOBARTSUM_MODEL_PATH", "/home/user/models/kobart_summary")
SENTIMENT_MODEL_PATH = os.getenv("SENTIMENT_MODEL_PATH", "/home/user/models/distilkobert_sentiment")

# MODEL_PATH = os.getenv("MODEL_PATH", Path("/workspaces/ai_web_RISKOUT_BTS/NLP/models/kobart_summary"))

CONCURRENT_REQUEST_PER_WORKER = int(os.getenv("CONCURRENT_REQUEST_PER_WORKER", 4))
