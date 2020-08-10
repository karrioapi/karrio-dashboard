import purpleserver.tenants.models as models
from django.contrib.admin import AdminSite
from django.contrib.auth.models import User, Group


class TenantsAdmin(AdminSite):
    site_header = 'Tenants Admin'


site = TenantsAdmin(name='system')
site.register(User)
site.register(Group)
site.register(models.Client)