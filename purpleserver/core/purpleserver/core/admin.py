from django.contrib import admin

from purpleserver.core.models import Carrier, CanadaPostSettings, FedexSettings

admin.site.register(Carrier)
admin.site.register(FedexSettings)
admin.site.register(CanadaPostSettings)
