from django.contrib import admin

from purpleserver.core import models

admin.site.register(models.FedexSettings)
admin.site.register(models.DHLSettings)
admin.site.register(models.PurolatorSettings)
admin.site.register(models.UPSSettings)
admin.site.register(models.CanadaPostSettings)
