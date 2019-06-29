import csv
import numpy as np
print('a')
import pandas as pd
print('a')
import random
print('a')
import tensorrec
print('a')
from sklearn.preprocessing import MultiLabelBinarizer
from collections import defaultdict
from scipy import sparse

print('a')

class HybridRecommender:
    def __init__(self):
        self.hybrid_model = None
        self.user_features = None
        self.user_rankings = None
        self.movielens_to_internal_item_ids = None
        self.movielens_to_internal_user_ids = None
        self.n_users = None
        self.n_items = None
        self.full_item_features = None
        self.user_indicator_features = None
        self.sparse_ratings_4plus = None

    def interactions_list_to_sparse_matrix(self, interactions):
        users_column, items_column, ratings_column, _ = zip(*interactions)

        return sparse.coo_matrix((ratings_column, (users_column, items_column)),
                                 shape=(self.n_users, self.n_items))

    def train(self, raw_ratings, raw_movie_metadata):

        self.movielens_to_internal_user_ids = defaultdict(lambda: len(self.movielens_to_internal_user_ids))
        self.movielens_to_internal_item_ids = defaultdict(lambda: len(self.movielens_to_internal_item_ids))

        for row in raw_ratings:
            row[0] = self.movielens_to_internal_user_ids[int(row[0])]
            row[1] = self.movielens_to_internal_item_ids[int(row[1])]
            row[2] = float(row[2])

        self.n_users = len(self.movielens_to_internal_user_ids)
        self.n_items = len(self.movielens_to_internal_item_ids)

        sparse_ratings = self.interactions_list_to_sparse_matrix(raw_ratings)

        self.user_indicator_features = sparse.identity(self.n_users)
        item_indicator_features = sparse.identity(self.n_items)

        self.sparse_ratings_4plus = sparse_ratings.multiply(sparse_ratings >= 4.0)

        movie_genres_by_internal_id = {}
        movie_titles_by_internal_id = {}
        for row in raw_movie_metadata:
            row[0] = self.movielens_to_internal_item_ids[int(row[0])]
            row[2] = row[2].split('|')
            movie_genres_by_internal_id[row[0]] = row[2]
            movie_titles_by_internal_id[row[0]] = row[1]

        movie_genres = [movie_genres_by_internal_id[internal_id]
                        for internal_id in range(self.n_items)]

        movie_genre_features = MultiLabelBinarizer().fit_transform(movie_genres)
        n_genres = movie_genre_features.shape[1]

        movie_genre_features = sparse.coo_matrix(movie_genre_features)

        self.full_item_features = sparse.hstack([item_indicator_features, movie_genre_features])

        self.hybrid_model = tensorrec.TensorRec(
            n_components=5,
            loss_graph=tensorrec.loss_graphs.WMRBLossGraph()
        )
        self.hybrid_model.fit(interactions=self.sparse_ratings_4plus,
                              user_features=self.user_indicator_features,
                              item_features=self.full_item_features,
                              n_sampled_items=int(self.n_items * .01))

    def predict(self, user_id):
        self.user_features = sparse.csr_matrix(self.user_indicator_features)[
            self.movielens_to_internal_user_ids[user_id]]
        self.user_rankings = self.hybrid_model.predict_rank(user_features=self.user_features,
                                                            item_features=self.full_item_features)[0]

    def check_result(self):
        predicted_ranks = self.hybrid_model.predict_rank(user_features=self.user_indicator_features,
                                                         item_features=self.full_item_features)

        recall_at_10 = tensorrec.eval.recall_at_k(
            test_interactions=self.sparse_ratings_4plus,
            predicted_ranks=predicted_ranks,
            k=10
        ).mean()
        print("Recall at 10: {:.4f} ".format(recall_at_10))

    def get_seen_movies(self, user_id):
        movies = []
        for i in self.sparse_ratings_4plus[self.movielens_to_internal_user_ids[user_id]].indices:
            #             print(movie_titles_by_internal_id[i])
            movies.append(list(self.movielens_to_internal_item_ids.keys())[
                              list(self.movielens_to_internal_item_ids.values()).index(i)])
        return movies

    def get_movies(self, number):
        internal_movies = np.where(self.user_rankings <= number)[0]
        movies = []
        for int_movie in internal_movies:
            #             print(movie_titles_by_internal_id[int_movie])
            movies.append(list(self.movielens_to_internal_item_ids.keys())[
                              list(self.movielens_to_internal_item_ids.values()).index(int_movie)])
        return movies

    def predict_and_get(self, user_id, number):
        self.predict(user_id)
        return self.get_movies(number)


if __name__ == 'main':
    print('hehe')