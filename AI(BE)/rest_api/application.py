import logging
import uvicorn
from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware

from rest_api.controller.errors.http_error import http_error_handler
from rest_api.config import ROOT_PATH


logging.basicConfig(format="%(asctime)s %(message)s", datefmt="%m/%d/%Y %I:%M:%S %p")
logger = logging.getLogger(__name__)


from rest_api.controller.router import router as api_router


def get_application() -> FastAPI:
    application = FastAPI(title="Riskout-API", debug=True, version="0.1", root_path=ROOT_PATH)

    #TODO 프로덕션 배포 전에 CORS 수정해야합니다.
    application.add_middleware(
        CORSMiddleware, allow_origins=["*"], allow_credentials=True,
        allow_methods=["*"], allow_headers=["*"]
    )
    application.add_exception_handler(HTTPException, http_error_handler)
    
    application.include_router(api_router)

    return application


app = get_application()


logger.info("Open http://127.0.0.1:8000/docs to see Swagger API Documentation.")
logger.info(
    """
    Or just try it out directly
    curl --request POST \
        --url 'http://127.0.0.1:8000/summarize/extractive' \
        -H "Content-Type: application/json"  \
        --data '{"document": "방탄수병단 파이팅!"}'
    """
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)