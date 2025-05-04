from django.urls import path, re_path
from intellapp.views import *

urlpatterns = [
    re_path(
        r"^register/$",
        RegisterView.as_view(),
        name="register",
    ),
    re_path(
        r"^login/$",
        LoginView.as_view(),
        name="login",
    ),
    re_path(
        r"^database-structure/$",
        DatabaseStructureView.as_view(),
        name="database_structure",
    ),
    re_path(
        r"^employees/$",
        EmployeeView.as_view(),
        name="employees",
    ),
]
