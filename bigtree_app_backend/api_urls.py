from django.urls import path

from . import api

urlpatterns = [
    path('v1/sample_api/', api.sample),
]
