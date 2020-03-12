from rest_framework.viewsets import ViewSet
from rest_framework.response import Response


class SampleAPIViewSet(ViewSet):
    """샘플 API 뷰셋"""

    def list(self, request, **kwargs):
        """샘플 API로 Hello World! 메세지를 반환함

        :return: JSON Response
        """
        return Response({'message': "Hello World!"})
