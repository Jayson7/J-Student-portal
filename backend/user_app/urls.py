from django.urls import path
from .views import (
    StudentViewSet,
    TeacherViewSet,
    AdminViewSet,
    ClassRoomViewSet,
)

# Map ViewSet actions to HTTP methods manually
student_list = StudentViewSet.as_view({"get": "list", "post": "create"})
student_detail = StudentViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"})

teacher_list = TeacherViewSet.as_view({"get": "list", "post": "create"})
teacher_detail = TeacherViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"})

admin_list = AdminViewSet.as_view({"get": "list", "post": "create"})
admin_detail = AdminViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"})

classroom_list = ClassRoomViewSet.as_view({"get": "list", "post": "create"})
classroom_detail = ClassRoomViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"})


urlpatterns = [
    # Students
    path("students/", student_list, name="student-list"),
    path("students/<int:pk>/", student_detail, name="student-detail"),

    # Teachers
    path("teachers/", teacher_list, name="teacher-list"),
    path("teachers/<int:pk>/", teacher_detail, name="teacher-detail"),

    # Admins
    path("admins/", admin_list, name="admin-list"),
    path("admins/<int:pk>/", admin_detail, name="admin-detail"),

    # Classrooms
    path("classrooms/", classroom_list, name="classroom-list"),
    path("classrooms/<int:pk>/", classroom_detail, name="classroom-detail"),
]
