from django.shortcuts import render, HttpResponse

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_hostels(request):
    return HttpResponse('Hello, World!')