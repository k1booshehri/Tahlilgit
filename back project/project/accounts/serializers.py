from rest_framework import serializers
from .models import User, office, Rates
from django.contrib.auth import authenticate

# user serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'birth', 'gender', 'f_name', 'l_name',
                  'phone', 'insurance', 'city','pp')


class UserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'birth', 'gender', 'f_name', 'l_name',
                  'phone', 'edu', 'code', 'activetime', 'field', 'insurance','pp')

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


class UserSerializer3(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'gender', 'f_name',
                  'l_name', 'edu', 'activetime', 'field','pp')


#update serializer
class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'f_name', 'l_name', 'birth',
                  'gender', 'phone', 'edu', 'code', 'activetime', 'field', 'insurance', 'city', 'pp')
        extra_kwargs = {'paswword': {'write_only': True}}

    def update(self, instance, validated_data):
        pas = validated_data.get('password', None)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.f_name = validated_data.get('f_name', instance.f_name)
        instance.l_name = validated_data.get('l_name', instance.l_name)
        instance.birth = validated_data.get('birth', instance.birth)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.edu = validated_data.get('edu', instance.edu)
        instance.code = validated_data.get('code', instance.code)
        instance.activetime = validated_data.get(
            'activetime', instance.activetime)
        instance.field = validated_data.get('field', instance.field)
        instance.city = validated_data.get('city', instance.city)
        # instance.set_password()
        if pas is not None:
            instance.set_password(validated_data['password'])
        instance.pp = validated_data.get('pp', instance.pp)
        instance.save()

        return instance



class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rates
        fields = ('Value', 'doctorusername')

    def create(self, validated_data):
        p = self.context['request'].user
        off, created = Rates.objects.update_or_create(
            patient=p, doctor=User.objects.get(username=validated_data['doctorusername']), doctorusername=validated_data['doctorusername'], defaults={'Value': validated_data['Value']},)

        return off


class RateUpdateSerializer(serializers.Serializer):
    doctorusername = serializers.CharField(
        required=False, allow_blank=True, max_length=100)
    Value = serializers.CharField(
        required=False, allow_blank=True, max_length=100)

    def create(self, validated_data):
        rate = Rates.objects.filter(
            doctor=User.objects.get(username=validated_data['doctorusername'])).aggregate(Avg('Value'))['Value__avg']
        off, created = User.objects.update_or_create(
            username=validated_data['doctorusername'], defaults={'rate': rate},)

        return off
