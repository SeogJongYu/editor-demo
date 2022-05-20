"""dotenv 로딩 관련 모듈"""
import logging

logger = logging.getLogger(__name__)


def load_dotenv():
    """.env 파일 로드 함수

    환경 변수 우선순위는 다음과 같다.

    1. 시스템 환경 변수
    2. `.env`

    * Docker build시 .env 파일은 복사되지 않는다.
    """
    try:
        from dotenv import load_dotenv

        load_dotenv(".env")

    except ImportError:
        logger.warning("python-dotenv is not installed, unable to load dotenv")
