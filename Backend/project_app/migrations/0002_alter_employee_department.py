# Generated by Django 5.1.2 on 2024-10-20 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='department',
            field=models.CharField(blank=True, choices=[('General Management', 'General Management'), ('Marketing Department', 'Marketing Department'), ('Operations Department', 'Operations Department'), ('Human Resource', 'Human Resource'), ('Finance Department', 'Finance Department'), ('Sales Department', 'Sales Department')], max_length=70, null=True),
        ),
    ]