# Generated by Django 5.1.2 on 2024-10-21 04:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project_app', '0003_alter_employee_department'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employee',
            old_name='name',
            new_name='email',
        ),
    ]
