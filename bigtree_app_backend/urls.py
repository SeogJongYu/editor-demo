from django.urls import path

from . import views
from . import api


urlpatterns = [
    path('views/', views.index),
    path('api/v1/sample_api/', api.sample),
]
