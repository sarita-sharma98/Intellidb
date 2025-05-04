from django.db import models
from django.contrib.auth.models import AbstractUser


# class UserDetail(AbstractUser):
#     # id = models.BigAutoField()
#     created_at = models.DateTimeField()
#     password = models.CharField()
#     last_login = models.DateTimeField(blank=True, null=True)
#     is_superuser = models.BooleanField(blank=True, null=True)
#     username_name = models.CharField(blank=True, null=True)
#     first_name = models.CharField(blank=True, null=True)


#     class Meta:
#         managed = False
#         db_table = "user_detail"
class UserDetail(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    username = models.CharField(unique=True)
    password = models.CharField(blank=True, null=True)
    email = models.CharField(blank=True, null=True)
    first_name = models.CharField(blank=True, null=True)
    last_name = models.CharField(blank=True, null=True)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField(blank=True, null=True)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "user_detail"

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    class Meta:
        managed = False
        db_table = "user_detail"

    # def __str__(self):
    #     return self.username
