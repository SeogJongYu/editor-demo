from django.http.response import JsonResponse

# Django View가 필요한 경우 여기에 추가


def sample(request):
    return JsonResponse({"message": "Hello World!"})
