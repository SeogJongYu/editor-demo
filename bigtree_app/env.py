"""dotenv 로딩 관련 모듈"""
import logging

logger = logging.getLogger(__name__)


def load_env():
    """.env 파일 로드 함수

    파일은 다음 순서대로 로드된다.

    1. `.env`
    2. `.env.development`
    3. `.env.production`

    주의: Docker build 시 .env.development는 제외하고 빌드된다.

    """
    try:
        from dotenv import load_dotenv

        load_dotenv(".env")
        load_dotenv(".env.development")
        load_dotenv(".env.production")

    except ImportError:
        logger.warning("python-dotenv is not installed, unable to load dotenv")
