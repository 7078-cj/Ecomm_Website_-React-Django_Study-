# Generated by Django 5.0.8 on 2024-09-19 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Ecomm', '0002_alter_product_productpic_alter_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='Avatar',
            field=models.ImageField(default='null.jpg', null=True, upload_to='static/images'),
        ),
    ]
