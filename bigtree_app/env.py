"""dotenv 로딩 관련 모듈"""
import logging

logger = logging.getLogger(__name__)


def load_dotenv():
    """.env 파일 로드 함수

    환경 변수 우선순위는 다음과 같다.

    1. 시스템 환경 변수 (.env 파일이 환경변수를 덮어쓰지 않음)
    2. `.env.development`
    3. `.env.production`
    4. `.env`

    주의: Docker build 시 .env.production만 복사된다.
    """
    try:
        from dotenv import load_dotenv

        load_dotenv(".env.development")
        load_dotenv(".env.production")
        load_dotenv(".env")

    except ImportError:
        logger.warning("python-dotenv is not installed, unable to load dotenv")
