import pandas as pd
from matplotlib import pyplot as plt
import numpy as np
from scipy.spatial.distance import pdist
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn import metrics
from sklearn.metrics import silhouette_score
from sklearn.metrics import calinski_harabaz_score

data = pd.read_csv("data.csv")

sns.pairplot(data,plot_kws={'alpha':0.5})
plt.show()


inertia = []
for k in range(1,20):
    Z = KMeans(n_clusters=k, 
               init = 'random',
               n_init = 100,
               max_iter = 1000).fit(data)
    inertia.append(Z.inertia_)

plt.plot(range(1, 20), inertia, 'bo-', marker='s')
plt.xlabel('$k$')
plt.ylabel('Objective function value')
plt.show()