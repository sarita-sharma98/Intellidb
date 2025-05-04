from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.db import connection
import traceback
import pandas as pd


class DatabaseStructureView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM employee")
                columns = [col[0] for col in cursor.description]
                rows = cursor.fetchall()

                if rows:
                    report_data = [dict(zip(columns, row)) for row in rows]
                    df = pd.DataFrame(report_data).fillna("")

                    table_data = [
                        DataUIModel(row).to_dict() for _, row in df.iterrows()
                    ]
                else:
                    table_data = []

            return Response(
                {
                   
                    "data": table_data,
                    "message": "Employee data fetched successfully.",
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            print(traceback.format_exc())
            return Response(
                {
                   
                    "error": str(e),
                    "message": "Error fetching employee data.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class DataUIModel:
    def __init__(self, data):
        self.emp_name = data.get("emp_name")
        self.department = data.get("department")

    def to_dict(self):
        return {
            "emp_name": self.emp_name,
            "department": self.department,
        }
