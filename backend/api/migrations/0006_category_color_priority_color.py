# Generated by Django 5.1.6 on 2025-04-18 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_category_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='color',
            field=models.CharField(default='#FF9999', max_length=7),
        ),
        migrations.AddField(
            model_name='priority',
            name='color',
            field=models.CharField(default='#FF9999', max_length=7),
        ),
    ]
