# Generated by Django 3.2.3 on 2021-06-01 11:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('providers', '0012_alter_carrier_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='TNTSettings',
            fields=[
                ('carrier_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='providers.carrier')),
                ('username', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('account_number', models.CharField(max_length=100)),
                ('account_country_code', models.CharField(max_length=3)),
            ],
            options={
                'verbose_name': 'TNT Settings',
                'verbose_name_plural': 'TNT Settings',
                'db_table': 'tnt-settings',
            },
            bases=('providers.carrier',),
        ),
    ]