# Generated by Django 3.1.5 on 2021-01-25 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0003_auto_20201230_0820'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='paid_by',
            field=models.CharField(blank=True, choices=[('sender', 'sender'), ('recipient', 'recipient'), ('third_party', 'third_party')], max_length=20, null=True),
        ),
    ]
