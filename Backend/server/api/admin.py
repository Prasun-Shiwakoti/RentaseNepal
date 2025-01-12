from django.contrib import admin
from .models import Hostel, Blog, CustomUsers, HostelImage
# Register your models here.
# admin credentials: rentaseNepal, rentaseNepal


admin.site.register(Hostel)
admin.site.register(HostelImage)
admin.site.register(Blog)
admin.site.register(CustomUsers)

