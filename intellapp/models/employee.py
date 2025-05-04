from django.db import models


class Employee(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    emp_name = models.CharField(blank=True, null=True)
    department = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'employee'
