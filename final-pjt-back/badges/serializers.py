from rest_framework import serializers
from .models import BadgeList, Badge

class TmpBadgeListCreate(serializers.ModelSerializer):

    class Meta:
        model = BadgeList
        fields = '__all__'


class InitialBadgeCreate(serializers.ModelSerializer):

    class Meta:
        model = Badge
        fields = '__all__'
        read_only_fields = ('user', 'badgelist',)


