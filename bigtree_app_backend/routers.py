from rest_framework.routers import DefaultRouter
from . import viewsets

router = DefaultRouter()
router.register('samples', viewsets.SampleAPIViewSet, 'sample')

urlpatterns = router.urls
