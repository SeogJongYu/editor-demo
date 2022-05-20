from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse, HttpResponse


@ensure_csrf_cookie
def csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrftoken': token})


def index(request):
    return HttpResponse('._.')
