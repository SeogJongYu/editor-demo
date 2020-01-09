from rest_framework.viewsets import ViewSet
from rest_framework.response import Response


class SampleAPIViewSet(ViewSet):
    def list(self, request, **kwargs):
        return Response({'message': "Hello World!"})
