from django.db import models
from django.conf import settings  # ✅ use custom user model if defined


# Predefined list of countries (simplified for now)
COUNTRY_CHOICES = [
    ("NG", "Nigeria"),
    ("US", "United States"),
    ("UK", "United Kingdom"),
    ("CA", "Canada"),
    ("GH", "Ghana"),
    ("KE", "Kenya"),
]


class ClassRoom(models.Model):
    """Represents a school class (e.g., JSS1, SS2, 100 Level, etc.)."""
    name = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Student(models.Model):
    """Student profile, linked to User model."""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="student_profile")
    student_id = models.CharField(max_length=20, unique=True)
    age = models.PositiveIntegerField()
    phone_number = models.CharField(max_length=15, unique=True)
    country = models.CharField(max_length=50, choices=COUNTRY_CHOICES, default="NG")
    date_of_birth = models.DateField(null=True, blank=True)
    classroom = models.ForeignKey(ClassRoom, on_delete=models.SET_NULL, null=True, blank=True, related_name="students")
    enrolled_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["user__username"]

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.student_id})"


class Teacher(models.Model):
    """Teacher profile, linked to User model."""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="teacher_profile")
    teacher_id = models.CharField(max_length=20, unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    country = models.CharField(max_length=50, choices=COUNTRY_CHOICES, default="NG")
    specialization = models.CharField(max_length=100)
    hire_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_hod = models.BooleanField(default=False)  # Promotion/Demotion to HOD

    class Meta:
        ordering = ["user__username"]

    def __str__(self):
        role = "HOD" if self.is_hod else "Teacher"
        return f"{self.user.get_full_name()} - {role}"


class AdminProfile(models.Model):
    """Separate Admin profile for managing Teachers & HOD promotions."""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="admin_profile")
    phone_number = models.CharField(max_length=15, unique=True)
    country = models.CharField(max_length=50, choices=COUNTRY_CHOICES, default="NG")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Admin - {self.user.get_full_name()}"
