from rest_framework import serializers
from .models import User, office
from django.contrib.auth import authenticate

# user serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'birth', 'gender', 'f_name', 'l_name',
                  'phone', 'insurance', 'city')


class UserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'birth', 'gender', 'f_name', 'l_name',
                  'phone', 'edu', 'code', 'activetime', 'field', 'insurance')

# office creation serializer


class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = office
        fields = ('id', 'address', 'city', 'phone',
                  'park', 'transport', 'info')

    def create(self, validated_data):
        #p = User.objects.get(pk=validated_data['doctorid'])
        p = self.context['request'].user
        off = office.objects.create(
            address=validated_data['address'], city=validated_data['city'], phone=validated_data['phone'], park=validated_data['park'], transport=validated_data['transport'], info=validated_data['info'], doctor=p)

        return off


# register serialzier


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'f_name', 'l_name', 'birth',
                  'gender', 'phone', 'insurance', 'city')
        extra_kwargs = {'paswword': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)

        return user


class RegisterSerializer2(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'f_name', 'l_name', 'birth',
                  'gender', 'phone', 'edu', 'code', 'activetime', 'field', 'insurance')
        extra_kwargs = {'paswword': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)

        return user

# login serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
