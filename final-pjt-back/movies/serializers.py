from rest_framework import serializers
from .models import Movie, Review

class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'


class TmpMovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'

class TmpReviewSerializer(serializers.ModelSerializer):
    like_users = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('movie', 'user', 'username',)


# class ReviewSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Review
#         fields = '__all__'




