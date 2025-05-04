from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.core.exceptions import ObjectDoesNotExist
from intellapp.models import *
from io import BytesIO
import pandas as pd
import base64
import traceback
from datetime import datetime


class EmployeeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:

            object = Employee.objects.all().order_by("id")

            table_data = [
                {"id": emp.id, "emp_name": emp.emp_name, "department": emp.department}
                for emp in object
            ]
            return Response(
                {
                    "data": table_data,
                    "message": "Employee data fetched.",
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            traceback.print_exc()
            return Response(
                {
                    "message": "An error occurred while fetching employee data.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request):
        try:
            emp_name = request.data.get("emp_name")
            department = request.data.get("department")
            if not emp_name or not department:
                return Response(
                    {
                        "message": "Missing required fields: emp_name, department.",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            emp = Employee.objects.create(
                emp_name=emp_name, department=department, created_at=datetime.now()
            )
            return Response(
                {
                    "data": {"id": emp.id},
                    "message": "Employee created successfully.",
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception:
            traceback.print_exc()
            return Response(
                {"message": "Failed to create employee."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def put(self, request):
        try:
            emp_id = request.data.get("id")
            if not emp_id:
                return Response(
                    {"message": "Missing employee ID."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            emp = Employee.objects.get(id=emp_id)
            emp.emp_name = request.data.get("emp_name", emp.emp_name)
            emp.department = request.data.get("department", emp.department)
            emp.save()

            return Response(
                {
                    "data": {"id": emp.id},
                    "message": "Employee updated successfully.",
                },
                status=status.HTTP_200_OK,
            )

        except ObjectDoesNotExist:
            return Response(
                {"message": "Employee not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:
            traceback.print_exc()
            return Response(
                {"message": "Failed to update employee."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def delete(self, request):
        try:
            emp_id = request.query_params.get("id")
            print(emp_id, "emp_id")
            if not emp_id:
                return Response(
                    {"message": "Missing employee ID."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            emp = Employee.objects.get(id=emp_id)
            emp.delete()

            return Response(
                {"message": "Employee deleted successfully."},
                status=status.HTTP_200_OK,
            )

        except ObjectDoesNotExist:
            return Response(
                {"message": "Employee not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:
            traceback.print_exc()
            return Response(
                {"message": "Failed to delete employee."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
