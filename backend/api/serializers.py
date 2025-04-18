from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Todo, Category, Priority


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')

    def create(self, validated_data):
        user = User(username=validated_data['username'], email=validated_data['email'])

        user.set_password(validated_data['password'])
        user.save()
        return user


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = ['id', 'name']


class TodoSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    priority = PrioritySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), write_only=True, source='category'
    )
    priority_id = serializers.PrimaryKeyRelatedField(
        queryset=Priority.objects.all(), write_only=True, source='priority'
    )

    class Meta:
        model = Todo
        fields = [
            'id', 'title', 'description',
            'priority', 'priority_id',
            'category', 'category_id',
            'created_at', 'updated_at'
        ]

    def create(self, validated_data):
        try:
            user = self.context['request'].user
            todo = Todo.objects.create(user=user, **validated_data)
            return todo
        except Category.DoesNotExist:
            raise serializers.ValidationError("Category does not exist.")
        except Priority.DoesNotExist:
            raise serializers.ValidationError("Priority does not exist.")
        except Exception as e:
            raise serializers.ValidationError(f"An error occurred: {str(e)}")

    def validate_priority(self, value):
        if value.user != self.context['request'].user:
            raise serializers.ValidationError("Invalid priority.")
        return value

    def validate_category(self, value):
        if value.user != self.context['request'].user:
            raise serializers.ValidationError("Invalid category.")
        return value


class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
